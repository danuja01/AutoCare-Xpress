import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Stack } from "expo-router";

export default Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Stack.Screen options={{ header: () => null }} />
      <View>
        <Text>web</Text>
      </View>
    </SafeAreaView>
  );
};
