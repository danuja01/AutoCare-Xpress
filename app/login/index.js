import {
  Alert,
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
import { Redirect, Stack, useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { auth, db } from "../../firebase/config";
import { set, ref } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";

const index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [mode, setMode] = useState("login");
  const router = useRouter();

  const handleSignUp = () => {
    setLoading(true);
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(db, "users/" + user.uid), {
          name: name,
          email: email,
          vehicleModel: vehicleModel,
          vehicleNumber: vehicleNumber,
        });

        console.log("User created");
        Alert.alert("Success", "User created successfully");
        setMode("login");
        setName("");
        setEmail("");
        setVehicleModel("");
        setVehicleNumber("");
        setPassword("");
        setConfirmPass("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      })
      .finally(() => setLoading(false));
  };

  useEffect(async () => {
    console.log("useEffect");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/user");
      }
    });

    const username = await AsyncStorage.getItem("user-name");

    console.log(">>>>>>>>>>>>>>>>>>>>>", username);

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await AsyncStorage.setItem("user-id", user.uid);
        await AsyncStorage.setItem("car-model", vehicleModel);
        await AsyncStorage.setItem("car-number", vehicleNumber);
        await AsyncStorage.setItem("user-name", name);
        await AsyncStorage.setItem("user-email", email);

        console.log("User logged in");
        // const getName = await AsyncStorage.getItem("user-name");
        // console.log(getName);
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert("Error", errorMessage);
      })
      .finally(() => setLoading(false));
  };

  const setView = () => {
    switch (mode) {
      case "login":
        return (
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
                  autoCapitalize="none"
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
                <TouchableOpacity
                  style={[styles.btn, styles.btnContainer]}
                  onPress={handleLogin}
                >
                  <Text style={styles.btnText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signupField}>
                  <Text>Don't have an account? </Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.signupBtn}
                      onPress={() => setMode("signup")}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      case "signup":
        return (
          <View style={styles.container}>
            <View style={styles.loginForm}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor={COLORS.mediumGray}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={COLORS.mediumGray}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Model  (e.g. Toyota Camry 2017)"
                  placeholderTextColor={COLORS.mediumGray}
                  value={vehicleModel}
                  onChangeText={(text) => setVehicleModel(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Vehicle Number (e.g. CAZ-1234)"
                  placeholderTextColor={COLORS.mediumGray}
                  value={vehicleNumber}
                  onChangeText={(text) => setVehicleNumber(text)}
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
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.mediumGray}
                  secureTextEntry
                  value={confirmPass}
                  onChangeText={(text) => setConfirmPass(text)}
                />
              </View>
              <View style={styles.btnStack}>
                <TouchableOpacity
                  style={[styles.btn, styles.btnContainer]}
                  onPress={handleSignUp}
                >
                  <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.signupField}>
                  <Text>Already have an account? </Text>
                  <TouchableOpacity>
                    <Text
                      style={styles.signupBtn}
                      onPress={() => setMode("login")}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ header: () => null }} />
      <Spinner
        visible={loading}
        textStyle={{
          color: COLORS.white,
          fontSize: FONT.large,
          fontFamily: FONT.semiBold,
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {setView()}
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
