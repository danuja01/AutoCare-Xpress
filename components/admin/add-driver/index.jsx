import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
//import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { db } from "../../../firebase/config";
import { ref, set, push } from "firebase/database";
//import { getDownloadURL, uploadBytes, ref as imgRef } from "firebase/storage";

const AddDriver = () => {
  const params = useLocalSearchParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [loading, setLoading] = useState(false);

  const driverid = params.id;

  const handleContinue = async () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !homeAddress ||
      !nicNumber ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    if (phoneNumber.length !== 10) {
      Alert.alert("Error", "Please check the phone number");
      return;
    }
    if (nicNumber.length !== 10 && nicNumber.length !== 12) {
      Alert.alert("Error", "Please check the NIC number");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Please check the password");
      return;
    }

    if (
      firstName &&
      lastName &&
      phoneNumber &&
      homeAddress &&
      nicNumber &&
      email &&
      password &&
      confirmPassword &&
      password === confirmPassword
    ) {
      try {
        //const id = push(ref(db, `drivers/${driverid}`));
        const driverRef = ref(db, `drivers/`);
        const newDriverRef = push(driverRef);

        const dataObject = {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          homeAddress: homeAddress,
          nicNumber: nicNumber,
          email: email,
          password: password,
        };

        await set(newDriverRef, dataObject);

        Alert.alert("Success", "Data added successfully");

        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setHomeAddress("");
        setNicNumber("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        console.error("Error:", error);
      }
    }

    console.log("Form Data:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Phone Number:", phoneNumber);
    console.log("Home Address:", homeAddress);
    console.log("NIC Number:", nicNumber);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Driver's Information</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          onChangeText={(text) => setFirstName(text)}
          //required
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          onChangeText={(text) => setLastName(text)}
          //required
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Home Address:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Home Address"
          onChangeText={(text) => setHomeAddress(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>NIC Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter NIC Number"
          onChangeText={(text) => setNicNumber(text)}
          //keyboardType="phone-pad"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
          textContentType="password"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={true}
          textContentType="password"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "left",
    alignItems: "left",
    padding: 20,
  },
  heading: {
    fontSize: SIZES.xLarge,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: FONT.extraBold,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: FONT.bold,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: SIZES.large,
    fontFamily: FONT.bold,
  },
});

export default AddDriver;
