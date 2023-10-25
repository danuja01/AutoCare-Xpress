import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { COLORS, SIZES } from "../../constants";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => console.log(email), [email]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ header: () => null }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.loginForm}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={COLORS.mediumGray}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={COLORS.mediumGray}
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
            <View style={styles.btnStack}>
              <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signupField}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity>
                  <Text style={styles.signupBtn}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  loginForm: {
    flex: 1,
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.large,
    marginBottom: SIZES.large,
  },
  input: {
    fontSize: 16,
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.medium,
    padding: SIZES.medium * 1.2,
    alignItems: "center",
  },
  btn: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  signupField: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.large,
  },
  signupBtn: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
});
