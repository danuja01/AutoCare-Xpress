import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { db } from "../../firebase/config";
import { ref, set } from "firebase/database";
import { COLORS } from "../../constants";

const Account = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState(1);

  const addData = () => {
    set(ref(db, "posts/" + id), {
      title: title,
      description: description,
    })
      .then(() => {
        console.log("Data set");
      })
      .catch((error) => {
        console.log("errorrrr>>>>" + error);
      });

    setTitle("");
    setDescription("");
    setId(id + 1);
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
