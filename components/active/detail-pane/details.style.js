import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.large,
    borderRadius: SIZES.large,
    padding: SIZES.medium,
  },
  detailsContainer: (border) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.large,
    marginBottom: border === 0 ? 0 : SIZES.large,
    borderBottomWidth: border,
    borderBottomColor: COLORS.mediumGray + "50",
    paddingBottom: border === 0 ? SIZES.xSmall : SIZES.large,
  }),
  detailsTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONT.semiBold,
    color: COLORS.white,
  },
  detailsSubtitle: {
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
  },
});

export default styles;
