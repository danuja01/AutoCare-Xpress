import { StyleSheet } from "react-native";
import { SIZES, COLORS, FONT, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.xLarge,
    borderRadius: SIZES.large,
  },
  logo: {
    width: SIZES.xxxLarge,
    height: SIZES.xxxLarge,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: SIZES.large,
  },
  description: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkGray,
    marginBottom: SIZES.large,
    textAlign: "justify",
  },
  locationsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.large,
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: SIZES.small,
    resizeMode: "contain",
  },
  locations: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: SIZES.small,
  },
  bulletContent: {
    flex: 1,
  },
  bulletPoint: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.black,
    marginRight: SIZES.small,
  },
  bulletName: {
    fontFamily: FONT.semiBold,
    fontSize: SIZES.small,
    color: COLORS.darkGray,
  },
  bulletDesc: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    color: COLORS.darkGray + "80",
  },
});

export default styles;
