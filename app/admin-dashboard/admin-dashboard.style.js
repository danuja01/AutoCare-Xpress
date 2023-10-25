import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  spacing: {
    marginRight: 15,
  },
  button: {
    position: "relative",
  },
  image: {
    //width: 200,
    //height: 200,
  },
  text: {
    position: "absolute",
    top: 45,
    left: 15,
    right: 15,
    fontSize: 18,
    color: "white",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  frameChildPosition: {
    left: 0,
    top: 15,
    right: 0,
    height: 65,
    //width: 380,
    position: "absolute",
  },
  frameChild: {
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  dashboard: {
    fontSize: 28,
    fontFamily: FONT.bold,
    textAlign: "center",
    color: COLORS.primary,
    top: 45,
    marginBottom:20,
  },
});

export default styles;
