import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const AddDriver = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [nicNumber, setNicNumber] = useState("");

  const handleContinue = () => {
    console.log("Form Data:");
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
    console.log("Home Address:", homeAddress);
    console.log("NIC Number:", nicNumber);
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
          required
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          onChangeText={(text) => setLastName(text)}
          required
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
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
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
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
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
    fontFamily:FONT.extraBold,
  },  
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily:FONT.bold,
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
    fontFamily:FONT.bold,
  },
});

export default AddDriver;
