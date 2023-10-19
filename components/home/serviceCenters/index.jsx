import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import styles from "./serviceCenter.style";
import ServiceCenterCard from "../../common/cards/serviceCenter";
import { SIZES } from "../../../constants";
import { useRouter } from "expo-router";

const ServiceCenters = ({ data }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Service Centers</Text>
      </View>
      {data &&
        data.map((item, index) => (
          <ServiceCenterCard
            key={index}
            name={item.name}
            locations={item.locations}
            iconUrl={item.imageUrl}
            onPressHanlde={() => router.push(`/service-description/${item.id}`)}
          />
        ))}
    </View>
  );
};

export default ServiceCenters;
