import { React, useEffect, useState } from "react";
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
import { JobDetailsCard } from "../../components";
import { BackNavBtn } from "../../components";
import { db } from "../../firebase/config";
import { ref, onValue } from "firebase/database";
import DialogBox from "../../components/common/dialog";

const JobList = () => {
  //get the service station from database
  const [serviceStation, setServiceStation] = useState(
    "Auto Miraj - Athurugiriya"
  );

  const [jobs, setJobs] = useState([]);
  const [visible, setVisible] = useState(false);

  const sampleData = {
    _id: "",
    vehicleNo: "John Doe",
    date: "2023-10-12",
    time: "10.00 AM",
    status: "Pending",
  };

  const fetchActiveJobs = () => {
    const activeJobsRef = ref(db, `active-orders/`);

    onValue(activeJobsRef, (snapshot) => {
      const data = snapshot.val();
      const jobs = Object.keys(data).map((key) => {
        return {
          _id: key,
          ...data[key],
        };
      });
      console.log(jobs);
      setJobs(jobs);
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
        <ScrollView>
          <View style={[styles.sbmtBtn, styles.sbmtBtnView]}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
              }}
              style={[styles.sbmtBtnView]}
            >
              <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>
                ACTIVE JOBS
              </Text>
            </TouchableOpacity>
          </View>
          {jobs && jobs.map((job, index) => <JobDetailsCard job={job} />)}
        </ScrollView>
        {jobs && console.log(jobs[0])}
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
            // onPressAccept={handleAccept}
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
