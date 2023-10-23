import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SIZES.large,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: SIZES.xLarge,
    fontFamily: FONT.semiBold,
  },
  activeHeaderContainer: {
    position: "absolute",
    right: 0,
  },
  trackingContainer: {
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.small * 0.5,
  },
  trackingTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    marginBottom: SIZES.medium,
  },
  noActiveContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noActiveTitle: {
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.semiBold,
  },
  noActiveBtnContainer: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: SIZES.medium,
  },
  noActiveBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.semiBold,
    color: COLORS.white,
  },
});

export default styles;
