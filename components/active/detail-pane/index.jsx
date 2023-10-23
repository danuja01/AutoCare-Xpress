import { Text } from "react-native";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../../../constants";
import styles from "./details.style";
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

const DetailsPane = ({ driver, service, location, vehicleModel }, ...props) => {
  return (
    props && (
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.container}
      >
        <DetailsField value={driver} label="Driver" icon="account-circle" />
        <DetailsField
          value={`${service} - ${location}`}
          label="Service Center"
          icon="garage"
        />
        <DetailsField
          label="Vehicle Model"
          value={vehicleModel}
          icon="car"
          border={0}
        />
      </LinearGradient>
    )
  );
};

export default DetailsPane;
