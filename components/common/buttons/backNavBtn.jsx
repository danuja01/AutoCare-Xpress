import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import { SIZES, COLORS, SHADOWS } from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";

const BackNavBtn = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.backBtn}
      onPress={() => {
        router.back();
      }}
    >
      <MaterialCommunityIcons
        name="arrow-left"
        size={SIZES.large}
        color={COLORS.black}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
    shadowOpacity: 0.05,
  },
});

export default BackNavBtn;
