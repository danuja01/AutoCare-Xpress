import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";

export default Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack.Screen options={{ header: () => null }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text>web</Text>
      </ScrollView>
    </SafeAreaView>
  );
};
