import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import { COLORS } from "../../constants";
import { Stack } from "expo-router";
import { FONT, SIZES } from "../../constants";
import { FromClient, ToClient } from "../../components";
import ToServiceCenterModal from "./toServiceCenterModal.js";
import ToUserModal from "./toUserModal.js";

const ConfirmDelivery = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container}>
        <ToServiceCenterModal />
        <ToUserModal />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ConfirmDelivery;
