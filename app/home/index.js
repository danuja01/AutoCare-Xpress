import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Stack } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import styles from "./home.style";
import {
  HomeHeader,
  Search,
  OfficialDealers,
  ServiceCenters,
} from "../../components";

export default Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader
          iconUrl={require("../../assets/images/user.png")}
          dimension={SIZES.xxxLarge * 1.15}
          handlePressUser={() => alert("Profile")}
          handlePressLocation={() => alert("Location")}
        />
        <Search />
        <OfficialDealers />
        <ServiceCenters />
      </ScrollView>
    </SafeAreaView>
  );
};
