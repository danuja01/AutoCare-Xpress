import React, { useCallback, useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import { COLORS, FONT, SIZES } from "../../constants";
import { Stack, useLocalSearchParams } from "expo-router";
import { db, storage } from "../../firebase/config";
import { ref, set, push } from "firebase/database";
import { getDownloadURL, uploadBytes, ref as imgRef } from "firebase/storage";
import { BackNavBtn } from "../../components";
import * as ImagePicker from "expo-image-picker";

const DamageAssessment = () => {
  const params = useLocalSearchParams();
  const [performedBy, setPerformedBy] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();
      setImage(blob);
    } else {
      console.log("Image not selected");
    }
  };

  const handleDoneClick = async () => {
    if (!performedBy || !description) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    if (!image) {
      Alert.alert("Error", "Please add an image");
      return;
    }

    try {
      const assessmentRef = ref(db, `damage-assessments/`);
      const newAssessmentRef = push(assessmentRef);

      const storageRef = imgRef(storage, `images/.png`);
      const uploadTask = await uploadBytes(storageRef, image);
      const snapshot = await uploadTask;
      const imageUrl = await getDownloadURL(storageRef);

      const dataObject = {
        performedBy: performedBy,
        description: description,
        timestamp: new Date().toISOString(),
        imageUrl: imageUrl,
      };

      await set(newAssessmentRef, dataObject);

      Alert.alert("Success", "Damage Assessment data added successfully");
      setPerformedBy("");
      setDescription("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackNavBtn />,
          headerTitle: "Damage Assessment",
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.damageAssessment}>
          {/* <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../../assets/images/ellipse-24.png")}
          /> */}
          <Text style={styles.damageAssessmentTitle}>Damage Assessment</Text>
          <Text style={styles.vehicleNo}>Vehicle No:</Text>
          <Text style={styles.cbh7532}>CBH 7532</Text>
          <Text style={styles.label}>Performed by:</Text>
          <View style={styles.inputContainer}>
            
            <TextInput
              style={styles.input}
              //placeholder="Required"
              placeholder="Perfomed By (Required)"
              multiline={true}
              onChangeText={(text) => setPerformedBy(text)}
            />
          </View>
          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            placeholder="Description (Required)"
            multiline={true}
            onChangeText={(text) => setDescription(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleImageSelection}
          >
            <Text style={styles.imageStatus} >Select Image </Text>
            <Text style={styles.imageStatus}>
              {image ? "Image Selected" : "No Image Selected"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={handleDoneClick}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  damageAssessment: {
    padding: 20,
  },
  icon: {
    width: 45,
    height: 45,
  },
  damageAssessmentTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    marginTop: 20,
    marginBottom: 20,
  },
  vehicleNo: {
    fontSize: FontSize.size_lgi,
  },
  cbh7532: {
    fontSize: FontSize.size_lgi,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: FontSize.iOSMediumBody_size,
    color: COLORS.black,
    marginTop:20,
    marginBottom:18
  },
  input: {
    height: 40,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  imageStatus: {
    color: COLORS.white,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width:"50%",
    left:"25%",
    right:"25%"
  },
  doneButtonText: {
    color: COLORS.white,
  },
});

export default DamageAssessment;
