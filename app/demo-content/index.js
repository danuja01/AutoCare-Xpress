import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db } from "../../firebase/config";
import { ref, set } from "firebase/database";
import DialogBox from "../../components/common/dialog";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const DemoComp = () => {
  const router = useRouter();

  const sampleOrder = {
    vehicleModel: "Toyota Axio Hybrid",
    vehicleType: "Sedan",
    vehicleNumber: "WP CAK 1234",
    date: "2021-09-20",
    time: "09:00",
    serviceStation: "Toyota Lanka",
    location: "Kandy",
    driver: "Sachintha Dissanayake",
    status: [
      {
        title: "Waiting for confirmation",
        description:
          "Waiting for confirmation from the service station, this will take some time",
      },
    ],
    completionStatus: "ongoing",
  };

  const writeOrder = () => {
    const userId = "-Nh7wegVm0idVUitqXN2";

    set(ref(db, `active-orders/${userId}`), sampleOrder).then(() => {
      console.log("Order added successfully");
    });
  };

  const [visible, setVisible] = useState(false);

  const mockData = [
    {
      label: "Vehicle Model",
      desc: "Toyota Axio Hybrid",
    },
    {
      label: "Vehicle Type",
      desc: "Sedan",
    },
    {
      label: "Vehicle Number",
      desc: "WP CAK 1234",
    },
    {
      label: "Date",
      desc: "2021-09-20",
    },
    {
      label: "Time",
      desc: "09:00",
    },
  ];

  const handleAccept = () => {
    const userId = "-Nh7wegVm0idVUitqXN2";
    const updatedOrder = { ...sampleOrder };
    updatedOrder.status.push({
      title: "Order Confirmed",
      description: "Your order has been confirmed",
    });
    set(ref(db, `active-orders/${userId}`), updatedOrder).then(() => {
      console.log("Order status updated");
    });
    setVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <View>
        <TouchableOpacity onPress={writeOrder} style={styles.button}>
          <Text>Make Order</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={styles.button}
        >
          <Text>Open Dialog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/admin-services")}
          style={styles.button}
        >
          <Text>Manage Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/adminJobs")}
          style={styles.button}
        >
          <Text>Admin Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/admin-dashboard")}
          style={styles.button}
        >
          <Text>Admin Dash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/driver-review")}
          style={styles.button}
        >
          <Text>Driver Review page</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/damage-assessment")}
          style={styles.button}
        >
          <Text>Add Damage Assessment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/add-driver")}
          style={styles.button}
        >
          <Text>Add Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/admin-viewDriver")}
          style={styles.button}
        >
          <Text>View Drivers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/confirm-delivery")}
          style={styles.button}
        >
          <Text>Confirm Delievry</Text>
        </TouchableOpacity>
        <DialogBox
          visible={visible}
          setVisible={setVisible}
          data={mockData}
          onPressAccept={handleAccept}
          onPressDecline={() => setVisible(false)}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    padding: 20,
    width: 150,
    alignSelf: "center",
    marginTop: 50,
  },
});

export default DemoComp;
