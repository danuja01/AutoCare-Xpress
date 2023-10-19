import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./officialCard.style";

const OfficialDealersCard = ({ iconUrl, name, handlePress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: iconUrl }}
        style={styles.officialImg}
        resizeMode="contain"
      />
      <Text style={styles.officialName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default OfficialDealersCard;
