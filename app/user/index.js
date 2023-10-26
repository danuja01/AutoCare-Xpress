import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Home from "../home";
import Active from "../active-job";
import Account from "../account";
import { Stack } from "expo-router";

const index = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ header: () => null }} />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#ffffff",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            height: 80,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Active"
          component={Active}
          options={{
            tabBarLabel: "Active",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="view-sequential"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "Account",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
