import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../../firebase/config";
import { ref, get } from "firebase/database";
import Spinner from "react-native-loading-spinner-overlay";

import styles from "./serviceDesc.style";
import { COLORS } from "../../constants";
import {
  BackNavBtn,
  PackageCard,
  RatingPanel,
  Dropdown,
} from "../../components";
import { Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";

const ServiceDesc = () => {
  const router = useRouter();

  const params = useLocalSearchParams();
  const [serviceDetails, setServiceDetails] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [islLoading, setIsLoading] = useState(false);

  const sid = params.id;
  const id = params.id;

  const fetchDetails = async () => {
    setIsLoading(true);
    const serviceStaionsRef = ref(db, `service-stations/${params.id}`);

    const snapshot = await get(serviceStaionsRef);

    if (snapshot.exists()) {
      setServiceDetails(snapshot.val());
    } else {
      const officialDealersRef = ref(db, `official-dealers/${params.id}`);

      const snapshot = await get(officialDealersRef);

      if (snapshot.exists()) {
        setServiceDetails(snapshot.val());
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    }
    setIsLoading(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackNavBtn />,
          headerTitle: serviceDetails.name,
        }}
      />
      <Spinner visible={islLoading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {serviceDetails && (
          <PackageCard
            name={serviceDetails.name}
            description={serviceDetails.description}
            locations={serviceDetails.locations}
            packages={serviceDetails.packages}
            imageUrl={serviceDetails.imageUrl}
          />
        )}
        <RatingPanel rating={4.5} totalRatings={143} serviceid = {sid}/>
        <View style={styles.optionContainer}>
          {serviceDetails && (
            <Dropdown
              data={serviceDetails.locations}
              title={"Select the Branch"}
            />
          )}
          <Dropdown
            data={["Saloon", "Sedan", "Suv", "Van", "Lorry"]}
            title={"Vehicle Type"}
          />
          <TouchableOpacity
            style={styles.confirmBtnContainer}
            onPress={() => {
              router.push(`/location/${id}`);
            }}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.confirmBtn}
            >
              <Text style={styles.btnText}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceDesc;
