import { React, useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Stack } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { JobDetailsCard } from "../../components";
import { BackNavBtn } from "../../components";
import { db } from "../../firebase/config";
import { ref, onValue, set } from "firebase/database";
import DialogBox from "../../components/common/dialog";
import Spinner from "react-native-loading-spinner-overlay";

const JobList = () => {
  //get the service station from database
  const [serviceStation, setServiceStation] = useState(
    "Auto Miraj - Athurugiriya"
  );

  const [jobs, setJobs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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
    completionStatus: "waiting",
  };

  const writeOrder = () => {
    const userId = "-Nh7wegVm0idVUitqXN2";

    set(ref(db, `active-orders/${userId}`), sampleOrder).then(() => {
      console.log("Order added successfully");
    });
  };

  const handleAccept = () => {
    const userId = "-Nh7wegVm0idVUitqXN2";
    const updatedOrder = { ...sampleOrder };
    updatedOrder.status.push({
      title: "Order Confirmed",
      description: "Your order has been confirmed",
    });
    updatedOrder.completionStatus = "ongoing";
    set(ref(db, `active-orders/${userId}`), updatedOrder).then(() => {
      console.log("Order status updated");
    });
    setVisible(false);
  };
  const fetchActiveJobs = () => {
    setLoading(true);
    const activeJobsRef = ref(db, `active-orders/`);

    onValue(activeJobsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const jobs = Object.keys(data).map((key) => {
          return {
            ...data[key],
          };
        });
        setJobs(jobs);
      } else {
        setJobs([]);
      }

      setLoading(false);
    });
  };

  const handleDelete = () => {
    const id = "-Nh7wegVm0idVUitqXN2";

    setLoading(true);

    const activeJobsRef = ref(db, `active-orders/${id}`);

    set(activeJobsRef, null)
      .then(() => {
        Alert.alert("Success", "Job deleted successfully");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchActiveJobs();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: COLORS.background,
            },
            headerShadowVisible: false,
            headerBackVisible: false,
            headerLeft: () => <BackNavBtn />,
            headerTitle: serviceStation,
          }}
        />
        <Spinner
          visible={loading}
          textStyle={{ color: COLORS.white }}
          color={COLORS.white}
        />
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
            style={[styles.sbmtBtn, styles.sbmtBtnView]}
          >
            <View style={[styles.sbmtBtnView]}>
              <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>
                ACTIVE JOBS
              </Text>
            </View>
          </TouchableOpacity>
          {jobs &&
            jobs.map((job, index) => (
              <JobDetailsCard job={job} handleDelete={handleDelete} />
            ))}
        </ScrollView>

        {jobs && (
          <DialogBox
            visible={visible}
            setVisible={setVisible}
            data={[
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
            ]}
            onPressAccept={handleAccept}
            onPressDecline={() => setVisible(false)}
          />
        )}
      </View>
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
});

export default JobList;
