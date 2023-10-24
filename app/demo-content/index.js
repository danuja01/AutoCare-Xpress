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

const DemoComp = () => {
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
        <DialogBox
          visible={visible}
          setVisible={setVisible}
          data={mockData}
          onPressAccept={handleAccept}
          onPressDecline={() => setVisible(false)}
        />
      </View>
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
