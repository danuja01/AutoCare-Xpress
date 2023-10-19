import { View, Text, Image } from "react-native";
import styles from "./package.style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../../constants";

const BulletItem = ({ name, desc }) => {
  return (
    <View style={styles.bulletItem}>
      <Text style={styles.bulletPoint}>•</Text>
      <View style={styles.bulletContent}>
        <Text style={styles.bulletName}>{name}</Text>
        <Text style={styles.bulletDesc}>{desc}</Text>
      </View>
    </View>
  );
};

const PackageCard = ({ locations, description, packages, imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: imageUrl }} />
      <Text style={styles.description}>{description}</Text>

      <View style={styles.locationsContainer}>
        <MaterialCommunityIcons
          name="map-marker"
          size={16}
          color={COLORS.mediumGray}
          style={styles.locationIcon}
        />
        <Text style={styles.locations}>
          {locations &&
            (locations.length > 1
              ? `${locations[0]} | ${locations[1]} | ${locations[2]} ${
                  locations.length - 3 > 0 ? `+ ${locations.length - 3}` : ""
                }`
              : locations[0])}
        </Text>
      </View>
      {packages &&
        packages.map((item, index) => (
          <BulletItem key={index} name={item.name} desc={item.desc} />
        ))}
    </View>
  );
};

export default PackageCard;
