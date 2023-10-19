import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";
import { db, storage } from "../../firebase/config";
import { ref, set } from "firebase/database";
import { getDownloadURL, uploadBytes, ref as imgRef } from "firebase/storage";
import { COLORS } from "../../constants";

const Account = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(0);

  const addData = async () => {
    try {
      setId((prev) => prev + 100);

      const storageRef = imgRef(storage, "images/" + id + ".jpg");
      await uploadBytes(storageRef, image).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });

      const imageUrl = await getDownloadURL(storageRef);

      set(ref(db, "posts/" + id), {
        title: title,
        description: description,
        imageUrl: imageUrl,
      });

      console.log("Data set");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log("Result:", result);

    if (!result.canceled) {
      console.log(">>>>>>>>>>>>>>>>>>>", result.assets[0].uri);
      const response = await fetch(result.uri);
      const blob = await response.blob();
      setImage(blob);
    } else {
      console.log("Image not selected");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <View>
        {/* textInput */}
        <TextInput
          style={styles.textInput}
          placeholder="title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        {/* image */}
        <TouchableOpacity style={styles.button} onPress={selectImage}>
          <Text>Select Image</Text>
        </TouchableOpacity>

        {/* button */}
        <TouchableOpacity style={styles.button} onPress={addData}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});

export default Account;
