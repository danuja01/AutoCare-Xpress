import { StyleSheet } from "react-native";
import { FONT, SIZES, COLORS, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: SIZES.medium,
    marginTop: SIZES.medium,
  },
  optionContainer: {
    flexDirection: "column",
    gap: SIZES.medium,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.large,
    marginTop: SIZES.ultra,
  },
  confirmBtnContainer: {
    width: "100%",
  },
  confirmBtn: {
    borderRadius: SIZES.large,
    paddingVertical: SIZES.large,
    paddingHorizontal: SIZES.large,
    alignItems: "center",
  },
  btnText: {
    color: COLORS.white,
    fontFamily: FONT.semiBold,
    fontSize: SIZES.large,
  },
});

export default styles;
