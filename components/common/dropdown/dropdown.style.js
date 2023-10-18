import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    paddingHorizontal: SIZES.large,
    width: "100%",
    height: SIZES.xxLarge * 2,
  },
  dropdownContent: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    shadowOpacity: 0.05,
    shadowRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});

export default styles;
