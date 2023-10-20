import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Border } from "../../GlobalStyles.js";
import { COLORS } from "../../constants";
import { Stack } from "expo-router";
import { FONT, SIZES } from "../../constants";
import { AddDriver, BackNavBtn } from "../../components";

const ConfirmDelivery = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container}>
        {/* <BackNavBtn /> */}
        <AddDriver />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ConfirmDelivery;
