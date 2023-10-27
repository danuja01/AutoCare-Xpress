import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { DriverCard, ActiveHeader } from "../../components";
import { db } from "../../firebase/config";
import { ref, get, push, update, remove } from "firebase/database";
import { useRouter } from "expo-router";

const DriverPage = () => {
  const [driverData, setDriverData] = useState([]);

  const fetchData = async () => {
    try {
      const driverDataRef = ref(db, `drivers`);
      const driverDataSnapshot = await get(driverDataRef);

      if (driverDataSnapshot.exists()) {
        const data = driverDataSnapshot.val();
        const driverArray = Object.values(data);
        setDriverData(driverArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteDriver = async (driverId) => {
    try {
      const driverDataRef = ref(db, `drivers/${driverId}`);
      await remove(driverDataRef);
      fetchData();
    } catch (error) {
      console.error("Error deleting driver:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ADMIN PANEL</Text>
          <View style={styles.activeHeaderContainer}>
            <ActiveHeader />
          </View>
        </View>
        <View style={[styles.sbmtBtn, styles.sbmtBtnView]}>
          <View style={[styles.sbmtBtnView]}>
            <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>
              REGISTERED DRIVERS LIST
            </Text>
          </View>
        </View>
        {driverData.map((driver) => (
          <View key={driver._id} style={styles.driverCardContainer}>
            <DriverCard
              _id={driver._id}
              name={driver.firstName}
              email={driver.email}
            />
            <View style={styles.buttonContainerStyle}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => handleUpdateDriver(driver._id)}
              >
                <Text style={styles.buttonTextStyle}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => handleDeleteDriver(driver._id)}
              >
                <Text style={styles.buttonTextStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: SIZES.large,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: SIZES.xLarge,
    fontFamily: FONT.semiBold,
  },
  activeHeaderContainer: {
    position: "absolute",
    right: 0,
  },
  trackingContainer: {
    marginHorizontal: SIZES.large,
    marginVertical: SIZES.small * 0.5,
  },
  trackingTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.semiBold,
    marginBottom: SIZES.medium,
  },
  sbmtBtn: {
    flexDirection: "row",
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  sbmtBtnView: {
    paddingVertical: 17,
  },
  sbmtBtnText: {
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
  },
  buttonContainerStyle: {
    flexDirection: "row",
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 1,
    alignItems: "center",
    width: "40%",
    left: "25%",
    marginLeft: 18,
    marginBottom: 30,
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold",
  },
  driverCardContainer: {
    backgroundColor: COLORS.white, // Set a background color
    borderRadius: 10,
    margin: 10,
    padding: 10,
    elevation: 2,
  },
});

export default DriverPage;
