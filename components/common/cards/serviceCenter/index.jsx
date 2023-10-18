import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./service.style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../../../constants";

const ServiceCenterCard = ({ name, locations, iconUrl, onPressHanlde }) => {
  return (
    <TouchableOpacity
      style={styles.serviceContainer}
      onPress={onPressHanlde}
      activeOpacity={0.8}
    >
      <View>
        <Text style={styles.serviceName}>{name}</Text>
        <View style={styles.locationsContainer}>
          <MaterialCommunityIcons
            name="map-marker"
            size={16}
            color={COLORS.mediumGray}
            style={styles.locationIcon}
          />
          <Text style={styles.locations}>
            {locations.length > 1
              ? `${locations[0]} | ${locations[1]} | ${locations[2]} ${
                  locations.length - 3 > 0 ? `+ ${locations.length - 3}` : ""
                }`
              : locations[0]}
          </Text>
        </View>
      </View>
      <Image
        source={require("../../../../assets/images/autoMiraj.png")}
        style={styles.serviceLogo}
      />
    </TouchableOpacity>
  );
};

export default ServiceCenterCard;
