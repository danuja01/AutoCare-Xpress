import { View, Text, StyleSheet, Alert } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";

const TrackingCard = ({ title, desc, isLast }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc.slice(0, 45) + "..."}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("info", desc);
        }}
      >
        <MaterialCommunityIcons
          name="information-outline"
          size={SIZES.xLarge}
          color={COLORS.mediumGray}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    marginBottom: SIZES.xSmall * 0.5,
  },
  desc: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: COLORS.mediumGray,
  },
});

export default TrackingCard;
