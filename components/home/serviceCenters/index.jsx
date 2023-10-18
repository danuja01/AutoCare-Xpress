import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import styles from "./serviceCenter.style";
import ServiceCenterCard from "../../common/cards/serviceCenter";
import { SIZES } from "../../../constants";

const ServiceCenters = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Service Centers</Text>
      </View>
      {Array(5)
        .fill()
        .map((item, index) => (
          <ServiceCenterCard
            name={"Auto Miraj"}
            locations={["Kandy", "Nittabuwa", "Kiribathgoda"]}
            iconUrl={require("../../../assets/images/autoMiraj.png")}
          />
        ))}
    </View>
  );
};

export default ServiceCenters;
