import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({
  serviceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.large,
    marginTop: SIZES.medium,
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.xLarge,
    borderRadius: SIZES.medium,
    backgroundColor: "#fff",
    ...SHADOWS.medium,
    shadowOpacity: 0.03,
  },
  serviceName: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    color: COLORS.darkGray,
  },
  locationsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  locationIcon: {
    width: 15,
    height: 15,
    marginRight: SIZES.small,
    objectFit: "contain",
  },
  locations: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.mediumGray,
  },
  serviceLogo: {
    width: 30,
    height: 30,
    objectFit: "contain",
  },
});

export default styles;
