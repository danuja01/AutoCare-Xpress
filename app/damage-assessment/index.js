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
//import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import { COLORS, FONT, SIZES } from "../../constants";
import { Stack, useLocalSearchParams } from "expo-router";
import { db, storage } from "../../firebase/config";
import { ref, set, push } from "firebase/database";
import { getDownloadURL, uploadBytes, ref as imgRef } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import {
  BackNavBtn,
} from "../../components";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* <Stack.Screen options={{ header: () => null }} /> */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackNavBtn />,
          headerTitle: " Damage Assessment",
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.damageAssessment}>
          <TouchableOpacity
            style={styles.wrapper}
            activeOpacity={0.2}
            onPress={() => {}}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../../assets/images/ellipse-24.png")}
            />
          </TouchableOpacity>
          <View style={[styles.damageAssessmentChild, styles.damageLayout]} />
          <View style={[styles.damageAssessmentItem, styles.damageLayout]} />
          <View style={[styles.damageAssessmentInner, styles.damageLayout]} />
          {/* <Pressable
            style={[styles.rectangleParent, styles.frameChildLayout]}
            //onPress={() => navigation.goBack()}
            onPress={() => navigation.navigate('DriverReviewPage')}
          >
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Image
              style={styles.arrowleftIcon}
              contentFit="cover"
              source={require("../../assets/images/arrowleft.png")}
            />
          </Pressable> */}
          <TouchableOpacity
            style={styles.done}
            activeOpacity={0.2}
            onPress={handleDoneClick}
          >
            <Text style={styles.done1Typo}>Done</Text>
          </TouchableOpacity>
          <Text style={[styles.performedBy, styles.done1Typo]}>
            Performed by:
          </Text>
          <TextInput
            style={[styles.clickHereTo1, styles.clickTypo]}
            placeholder="Click here to type . . ."
            placeholderTextColor="#a4a5aa"
            onChangeText={(text) => setPerformedBy(text)}
          />
          <Text style={styles.damageAssessment1}>Damage Assessment</Text>
          <Text style={[styles.vehicleNo, styles.cbh7532Typo]}>
            Vehicle No:
          </Text>
          <Text style={[styles.cbh7532, styles.cbh7532Typo]}>CBH 7532</Text>
          <TextInput
            style={[styles.clickHereTo, styles.clickTypo]}
            placeholder="Click here to type . . ."
            multiline={true}
            placeholderTextColor="#a4a5aa"
            onChangeText={(text) => setDescription(text)}
          />
          <View>
            <TouchableOpacity
              style={[styles.button, styles.imgBtn]}
              onPress={handleImageSelection}
            >
              <Text>Select Image</Text>
              <Text style={styles.imgThumb(image)}>
                {image ? "Image Selected" : "No Image Selected"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.lineView, styles.damageLayout]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  damageLayout: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  frameChildLayout: {
    height: 41,
    width: 41,
    position: "absolute",
  },
  done1Typo: {
    textAlign: "left",
    color: Color.iOS000000,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.iOSMediumBody_size,
  },
  cbh7532Typo: {
    top: "18%",
    fontSize: FontSize.size_lgi,
    textAlign: "left",
    color: Color.iOS000000,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  clickTypo: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.iOSMediumBody_size,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: "70%",
    top: "4.5%",
    width: 45,
    height: 45,
    position: "absolute",
  },
  damageAssessmentChild: {
    top: "6.5%",
    width: 24,
    borderColor: Color.iOS000000,
    left: "73%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  damageAssessmentItem: {
    top: "7.6%",
    width: 24,
    borderColor: Color.iOS000000,
    left: "73%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  damageAssessmentInner: {
    top: "7.1%",
    width: 24,
    borderColor: Color.iOS000000,
    left: "73%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  frameChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_mini,
    backgroundColor: Color.iOSFFFFFF,
    shadowColor: "rgba(0, 0, 0, 0.11)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 11,
    elevation: 11,
    shadowOpacity: 1,
  },
  arrowleftIcon: {
    top: "25%",
    left: "25%",
    width: 20,
    height: 20,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    top: "4.5%",
    left: "5%",
  },
  done: {
    left: "85%",
    top: "5.8%",
    position: "absolute",
  },
  performedBy: {
    left: "9%",
    top: "22.5%",
    position: "absolute",
  },
  damageAssessment1: {
    top: "14%",
    fontSize: FontSize.size_lgi,
    left: "9%",
    textAlign: "left",
    color: Color.iOS000000,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  vehicleNo: {
    left: "9%",
  },
  cbh7532: {
    left: "40%",
  },
  clickHereTo: {
    top: "30%",
    left: "9%",
  },
  clickHereTo1: {
    left: "40%",
    top: "22.2%",
  },
  lineView: {
    top: "26%",
    borderColor: "#bbbcbc",
    width: "90%",
    left: "5%",
    right: "5%",
    height: 2,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  damageAssessment: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    height: 852,
    overflow: "hidden",
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    alignItems: "center",
    marginBottom: SIZES.medium,
    top:"170%",
    width: "85%",
    left: "40%",
    //right: "5%",
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
});

export default DamageAssessment;
