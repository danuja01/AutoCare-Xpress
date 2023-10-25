import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";
import Home from "./home";
import Active from "./active-job";
import Account from "./account";
import { Redirect, Stack } from "expo-router";
import Location from "./location";
import { LogBox } from "react-native";
import PickupLocation from "./pickuplocation";
import Serviceinfo from "./serviceinfo";
import DriverLocation from "./driverlcoation";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Tab = createBottomTabNavigator();

export default function Page() {
  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack.Screen options={{ header: () => null }} />

      <Redirect href="/login" />
    </View>
  );
}
