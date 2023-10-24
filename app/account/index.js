import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";
import { db, storage } from "../../firebase/config";
import { ref, set, push } from "firebase/database";
import { getDownloadURL, uploadBytes, ref as imgRef } from "firebase/storage";
import { COLORS, FONT, SIZES } from "../../constants";
import Spinner from "react-native-loading-spinner-overlay";


const Account = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [packages, setPackages] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [uriPath, setUriPath] = useState("service-stations/");

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    if (isEnabled) {
      setUriPath("official-dealers/");
    } else {
      setUriPath("service-stations/");
    }
  }, [isEnabled]);

  const addData = async () => {
    if (!name || !description || !locations || !packages) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    if (locations.length === 0) {
      Alert.alert("Error", "Please add at least one location");
      return;
    }
    if (packages.length === 0) {
      Alert.alert("Error", "Please add at least one package");
      return;
    }
    if (locations.length > 0 && locations.some((loc) => !loc)) {
      Alert.alert("Error", "Please fill all the locations");
      return;
    }
    if (packages.length > 0 && packages.some((pkg) => !pkg.name || !pkg.desc)) {
      Alert.alert("Error", "Please fill all the packages");
      return;
    }
    if (!image) {
      Alert.alert("Error", "Please select an image");
      return;
    }

    if (
      name &&
      description &&
      locations.length > 0 &&
      packages.length > 0 &&
      image
    ) {
      setLoading(true);
      try {
        const id = push(ref(db, "posts")).key;

        let imageUrl = "";
        if (image) {
          const storageRef = imgRef(storage, "images/" + id + ".png");
          const uploadTask = await Promise.race([
            uploadBytes(storageRef, image),
            new Promise(
              (_, reject) =>
                setTimeout(() => reject(new Error("Upload timed out")), 5000) // Adjust the timeout value as needed
            ),
          ]);
          const snapshot = await uploadTask;

          console.log("Uploaded a blob or file!");
          imageUrl = await getDownloadURL(storageRef);
        }

        const dataObject = {
          name: name,
          description: description,
          locations: locations,
          packages: packages,
        };

        if (imageUrl) {
          dataObject["imageUrl"] = imageUrl;
        }

        await set(ref(db, uriPath + id), dataObject);

        Alert.alert("Success", "Data added successfully");
        setName("");
        setDescription("");
        setLocations([]);
        setPackages([]);
        setImage(null);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setLoading(true);

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setImage(blob);
    } else {
      console.log("Image not selected");
    }

    setLoading(false);
  };

  const addLocation = () => {
    setLocations((prevLocations) => [...prevLocations, ""]);
  };

  const removeLocation = (index) => {
    const updatedLocations = locations.filter((loc, i) => i !== index);
    setLocations(updatedLocations);
  };

  const addPackage = () => {
    setPackages((prevPackages) => [...prevPackages, { name: "", desc: "" }]);
  };

  const removePackage = (index) => {
    const updatedPackages = packages.filter((pkg, i) => i !== index);
    setPackages(updatedPackages);

  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{
            color: COLORS.white,
            fontSize: SIZES.large,
            fontFamily: FONT.semiBold,
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Add New Service Center</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              placeholderTextColor={COLORS.mediumGray}
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <View
              style={[styles.textAreaContainer, { marginBottom: SIZES.medium }]}
            >
              <TextInput
                style={styles.textArea}
                multiline={true}
                placeholder="Description"
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
            </View>

            <View style={styles.dynamicInputContainer}>
              <Text style={styles.dynamicInputTitle}>Locations</Text>
              {locations.map((location, index) => (
                <View
                  style={styles.dynamicInputWrapperLocation}
                  key={`location-${index}`}
                >
                  <TextInput
                    style={styles.dynamicTextInput}
                    placeholder={`Location ${index + 1}`}
                    placeholderTextColor={COLORS.mediumGray}
                    onChangeText={(text) => {
                      const updatedLocations = [...locations];
                      updatedLocations[index] = text;
                      setLocations(updatedLocations);
                    }}
                    value={location}
                  />
                  <TouchableOpacity
                    style={styles.closeButtonWrapper}
                    onPress={() => removeLocation(index)}
                  >
                    <Text style={styles.closeButtonLocation}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity style={styles.addButton} onPress={addLocation}>
                <Text style={styles.addButtonText}>
                  {locations.length === 0
                    ? "Add Location"
                    : "Add Another Location"}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dynamicInputContainer}>
              <Text style={styles.dynamicInputTitle}>Packages</Text>
              {packages.map((pkg, index) => (
                <View
                  style={styles.dynamicInputWrapper}
                  key={`package-${index}`}
                >
                  <TouchableOpacity
                    style={styles.closeButtonWrapperPkg}
                    onPress={() => removePackage(index)}
                  >
                    <Text style={styles.closeButton}>X</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.dynamicTextInput}
                    placeholder={`Package Name ${index + 1}`}
                    placeholderTextColor={COLORS.mediumGray}
                    onChangeText={(text) => {
                      const updatedPackages = [...packages];
                      updatedPackages[index].name = text;
                      setPackages(updatedPackages);
                    }}
                    value={pkg.name}
                  />
                  <View
                    style={[
                      styles.textAreaContainer,
                      { marginTop: SIZES.small },
                    ]}
                  >
                    <TextInput
                      style={styles.textArea}
                      placeholder={`Package Description ${index + 1}`}
                      onChangeText={(text) => {
                        const updatedPackages = [...packages];
                        updatedPackages[index].desc = text;
                        setPackages(updatedPackages);
                      }}
                      value={pkg.desc}
                      multiline={true}
                    />
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.addButton} onPress={addPackage}>
                <Text style={styles.addButtonText}>
                  {packages.length === 0
                    ? "Add Package"
                    : "Add Another Package"}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={[styles.button, styles.imgBtn]}
                onPress={selectImage}
              >
                <Text>Select Image</Text>
                <Text style={styles.imgThumb(image)}>
                  {image ? "Image Selected" : "No Image Selected"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.toggleBtnContainer}>
              <Text>Is Official Dealer?</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? COLORS.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.secondary }]}
              onPress={addData}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: SIZES.large,
                  fontFamily: FONT.semiBold,
                }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SIZES.large,
    paddingTop: SIZES.large,
    paddingBottom: SIZES.medium,
    borderBottomLeftRadius: SIZES.large,
    borderBottomRightRadius: SIZES.large,
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    textAlign: "center",
  },
  formContainer: {
    margin: SIZES.large,
  },
  textInput: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    marginBottom: SIZES.xSmall,
  },
  dynamicInputContainer: {
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.primary + "0F",
    padding: SIZES.large,
    borderRadius: SIZES.medium,
  },
  dynamicInputTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
    marginBottom: SIZES.small,
  },
  dynamicInputWrapper: {
    flexDirection: "column",
    marginVertical: SIZES.small,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    paddingVertical: SIZES.medium,
    borderColor: COLORS.mediumGray,
    paddingTop: 40,
  },
  dynamicInputWrapperLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dynamicTextInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    marginRight: SIZES.small,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    width: "100%",
  },
  closeButtonWrapperPkg: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "flex-end",
    position: "absolute",
    right: 10,
    top: 10,
  },
  closeButton: {
    color: "red",
    borderRadius: 20,
  },
  closeButtonLocation: {
    color: "red",
    borderRadius: SIZES.large,
  },
  closeButtonWrapper: {
    paddingVertical: SIZES.small,
    paddingHorizontal: SIZES.xSmall * 0.4,
    // backgroundColor: COLORS.white,
  },
  addButton: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
  },
  button: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
  textAreaContainer: {
    borderColor: COLORS.mediumGray,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    flex: 1,
  },
  textArea: {
    height: SIZES.large * 5,
    justifyContent: "flex-start",
  },
  imgBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.large,
  },
  imgThumb: (image) => ({
    color: image ? COLORS.primary : COLORS.red,
    fontSize: SIZES.small,
  }),
  toggleBtnContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.medium,
  },
});

export default Account;
