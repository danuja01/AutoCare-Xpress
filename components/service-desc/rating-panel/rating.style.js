import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
    marginVertical: SIZES.small,
    borderRadius: SIZES.large,
    alignContent: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: SIZES.body4,
    fontWeight: "bold",
    color: COLORS.yellow,
  },
  totalRatings: {
    fontSize: SIZES.body4,
    fontWeight: "bold",
    color: COLORS.darkGray,
  },
});

export default styles;
