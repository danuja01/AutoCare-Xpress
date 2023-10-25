import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import styles from "./home.style";
import {
  HomeHeader,
  Search,
  OfficialDealers,
  ServiceCenters,
  NewCard,
} from "../../components";

import { ref, onValue } from "firebase/database";
import { db } from "../../firebase/config";
import Newpop from "../../components/booking/newCard/index"

export default Home = () => {
  const [serviceStaions, setServiceStaions] = useState([]);
  const [officialDealers, setOfficialDealers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const getServiceStations = () => {
    setIsLoading(true);

    const serviceStaionsRef = ref(db, "service-stations/");

    onValue(serviceStaionsRef, (snapshot) => {
      const data = snapshot.val();
      const serviceStaions = Object.keys(data).map((key) => {
        return { id: key, ...data[key] };
      });
      setServiceStaions(serviceStaions);
    });

    setIsLoading(false);
  };

  const getOfficialDealers = () => {
    setIsLoading(true);

    const officialDealersRef = ref(db, "official-dealers/");

    onValue(officialDealersRef, (snapshot) => {
      const data = snapshot.val();
      const officialDealers = Object.keys(data).map((key) => {
        return { id: key, ...data[key] };
      });
      setOfficialDealers(officialDealers);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    try {
      getServiceStations();
      getOfficialDealers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <Spinner visible={isLoading} textStyle={{ color: COLORS.white }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Newpop />
        <HomeHeader
          iconUrl={require("../../assets/images/user.png")}
          dimension={SIZES.xxxLarge * 1.15}
          handlePressUser={() => router.push("/demo-content")}
          handlePressLocation={() => alert("Location")}
        />
        <Search />
        <OfficialDealers data={officialDealers} />
        <ServiceCenters data={serviceStaions} />
      </ScrollView>
    </SafeAreaView>
  );
};
