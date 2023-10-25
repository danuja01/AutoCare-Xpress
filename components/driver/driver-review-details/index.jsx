import { Text } from "react-native";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DetailsField = ({ label, value, icon, border = 1 }) => (
  <View style={styles.detailsContainer(border)}>
    <MaterialCommunityIcons
      name={icon}
      size={SIZES.xxxLarge}
      color={COLORS.white}
    />
    <View>
      <Text style={styles.detailsTitle}>{value}</Text>
      <Text style={styles.detailsSubtitle}>{label}</Text>
    </View>
  </View>
);

const DriverDetailsPane = () => {
  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      style={styles.container}
    >
      <DetailsField
        value="Disira Thihan"
        label="Vehicle Owner"
        icon="account-circle"
      />
      <DetailsField
        value="Auto Miraj - Athurugiriya"
        label="Service Center"
        icon="garage"
      />
      <DetailsField
        label="CBH-7532"
        value="Reg No"
        icon="car"
        border={0}
      />
    </LinearGradient>
  );
};

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

export default DriverDetailsPane;
