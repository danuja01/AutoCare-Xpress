import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import styles from "./officialDealers.style";
import OfficialDealersCard from "../../common/cards/official";
import { SIZES } from "../../../constants";

const OfficialDealers = () => {
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
        {Array(5)
          .fill()
          .map((item, index) => (
            <>
              <OfficialDealersCard
                key={index + 1 + "a"}
                iconUrl={require("../../../assets/images/merc.png")}
                name={"Mercedes Benz"}
              />
              <OfficialDealersCard
                key={index + 1 + "b"}
                iconUrl={require("../../../assets/images/bmw.png")}
                name={"BMW"}
              />
            </>
          ))}
      </ScrollView>
    </View>
  );
};

export default OfficialDealers;
