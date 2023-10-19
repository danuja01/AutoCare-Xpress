import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { SIZES, COLORS, SHADOWS } from "../../../constants";
import { StyleSheet } from "react-native";

const ActiveHeader = ({ handlePressShare }) => {
  return (
    <TouchableOpacity
      style={styles.shareBtnContainer}
      onPress={handlePressShare}
    >
      <MaterialCommunityIcons
        name="share-variant"
        size={SIZES.xLarge}
        color={COLORS.black}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareBtnContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
    shadowOpacity: 0.05,
    marginHorizontal: SIZES.large,
  },
});

export default ActiveHeader;
