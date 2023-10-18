import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONT, SHADOWS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginVertical: SIZES.xLarge,
    paddingVertical: SIZES.xxLarge,
    paddingHorizontal: SIZES.xLarge / 1.25,
    borderRadius: SIZES.large,
    ...SHADOWS.medium,
    shadowOpacity: 0.05,
    marginHorizontal: SIZES.large,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchHeadding: {
    fontFamily: FONT.bold,
    fontSize: SIZES.large / 1.2,
    color: COLORS.black,
    textAlign: "center",
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.gray + "7A",
    borderColor: COLORS.black + "06",
    borderWidth: 1,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    ...SHADOWS.small,
    shadowOpacity: 0.15,
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
});

export default styles;
