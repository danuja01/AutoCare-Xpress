import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  locationBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.small / 1.25,
  },
  locationBtn: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    padding: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.small,
    shadowOpacity: 0.06,
  },
  locationBtnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    flexDirection: "row",
    alignItems: "center",
  }),
  locationLabel: {
    color: COLORS.black + "46",
    fontSize: SIZES.small,
  },
  location: {
    color: COLORS.black,
    fontSize: SIZES.medium / 1.25,
    fontFamily: FONT.bold,
  },
  btnContainer: {
    width: SIZES.xxxLarge,
    height: SIZES.xxxLarge,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.large / 1.1,
  }),
});

export default styles;
