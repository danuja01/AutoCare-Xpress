import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./service.style";

const ServiceCenterCard = ({ name, locations, iconUrl }) => {
  return (
    <TouchableOpacity
      style={styles.serviceContainer}
      onPress={() => alert("Auto Miraj")}
      activeOpacity={0.8}
    >
      <View>
        <Text style={styles.serviceName}>{name}</Text>
        <View style={styles.locationsContainer}>
          <Image
            source={require("../../../../assets/images/pin.png")}
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
