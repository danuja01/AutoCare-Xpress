import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./officialCard.style";

const OfficialDealersCard = ({ iconUrl, name }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => alert("Official Card Button")}
      activeOpacity={0.8}
    >
      <Image source={iconUrl} style={styles.officialImg} />
      <Text style={styles.officialName}>{name}</Text>
    </TouchableOpacity>
  );
};

export default OfficialDealersCard;
