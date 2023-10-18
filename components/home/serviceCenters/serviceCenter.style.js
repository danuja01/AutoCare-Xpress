import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: SIZES.xxxLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: SIZES.large,
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    color: COLORS.darkGray,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.darkGray + "80",
  },
});

export default styles;
