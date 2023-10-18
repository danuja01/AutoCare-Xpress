import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: SIZES.medium,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.large,
    paddingVertical: SIZES.xLarge,
    paddingHorizontal: SIZES.medium,
    width: SIZES.xxxLarge * 2.5,
    height: SIZES.xxxLarge * 3.5,
  },
  officialImg: {
    width: SIZES.ultra,
    height: SIZES.ultra,
    borderRadius: SIZES.xxxLarge / 2,
    backgroundColor: COLORS.white,
  },
  officialName: {
    fontSize: SIZES.regular,
    marginTop: SIZES.small,
    textAlign: "center",
  },
});

export default styles;
