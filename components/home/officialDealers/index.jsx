import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import styles from "./officialDealers.style";
import OfficialDealersCard from "../../common/cards/official";
import { SIZES } from "../../../constants";
import { useRouter } from "expo-router";

const OfficialDealers = ({ data }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Official Dealers</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: SIZES.medium,
          paddingHorizontal: SIZES.large,
        }}
      >
        {data &&
          data.map((item, index) => (
            <OfficialDealersCard
              key={item.id}
              iconUrl={item.imageUrl}
              name={item.name}
              handlePress={() => router.push(`/service-description/${item.id}`)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default OfficialDealers;
