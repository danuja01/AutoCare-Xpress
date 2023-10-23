import React, { useEffect, useRef, useState } from "react";
import * as Device from "expo-device";

import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";

import styles from "./active.style";
import {
  ActiveHeader,
  CurrentStatus,
  DetailsPane,
  TrackingCard,
} from "../../components";
import { COLORS } from "../../constants";
import Spinner from "react-native-loading-spinner-overlay";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Active = () => {
  const userId = "-Nh7wegVm0idVUitqXN2";

  const router = useRouter();

  const [activeOrder, setActiveOrder] = useState({});
  const [lastStatusIndex, setLastStatusIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const fetchActiveOrder = () => {
    const activeOrderRef = ref(db, `active-orders/${userId}`);

    onValue(activeOrderRef, (snapshot) => {
      setIsLoading(true);

      const data = snapshot.val();

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      if (data) {
        setActiveOrder(data);
        if (data.status && data.status.length > 0) {
          setLastStatusIndex(data.status.length - 1);
        }
      } else {
        setActiveOrder({});
      }
    });
  };

  // Function to send a local notification
  const sendLocalNotification = (status) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: status.title,
        body: status.description,
      },
      trigger: null,
    });
    console.log("Sending notification");
  };

  const handleStatusChange = (status) => {
    // Call the notification function whenever lastStatusIndex is updated
    console.log("Status changed");
    sendLocalNotification(status);
  };

  async function grantPermissionForNotifications() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      await Notifications.requestPermissionsAsync();
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: COLORS.primary,
      });
    }

    return status;
  }

  useEffect(() => {
    grantPermissionForNotifications();
  }, []);

  useEffect(() => {
    // Replace 'statusValue' with the appropriate value from your activeOrder or other state
    if (activeOrder.status && activeOrder.status.length > 0) {
      handleStatusChange(activeOrder.status[lastStatusIndex]);
    }
  }, [lastStatusIndex]);

  useEffect(() => {
    fetchActiveOrder();
  }, []);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const renderComponent = () => {
    if (activeOrder && Object.keys(activeOrder).length > 0) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Ongoing Job</Text>
            <View style={styles.activeHeaderContainer}>
              <ActiveHeader />
            </View>
          </View>
          <DetailsPane
            driver={activeOrder.driver}
            service={activeOrder.serviceStation}
            location={activeOrder.location}
            vehicleModel={activeOrder.vehicleModel}
          />
          <CurrentStatus
            status={
              activeOrder.status[lastStatusIndex].title ||
              "Status not available"
            }
          />
          <View style={styles.trackingContainer}>
            <Text style={styles.trackingTitle}>Tracking</Text>
            <View>
              {activeOrder.status &&
                activeOrder.status.map((status, index) => {
                  return (
                    <TrackingCard
                      key={index}
                      title={status.title}
                      desc={status.description}
                      isLast={index === activeOrder.status.length - 1}
                    />
                  );
                })}
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.noActiveContainer}>
          <Text style={styles.noActiveTitle}>No Active Jobs</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.noActiveBtnContainer}
          >
            <Text style={styles.noActiveBtn}>Make Order</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ headerShown: false }} />
      {isLoading ? <Spinner visible={isLoading} /> : renderComponent()}
    </SafeAreaView>
  );
};

export default Active;
