import { React, useState } from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { 
  JobDetailsCard,
} from "../../components";
import {
    BackNavBtn,
} from "../../components";

const JobList = () => {

    //get the service station from database
    const [serviceStation, setServiceStation] = useState('Auto Miraj - Athurugiriya');
    //

    const sampleData = {
        _id: '',
        vehicleNo: 'John Doe',
        date: '2023-10-12',
        time: '10.00 AM',
        status: 'Pending'
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <View style={styles.container}>
            <Stack.Screen options={{           
                headerStyle: {
                backgroundColor: COLORS.background,
                },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => <BackNavBtn />,
                headerTitle: serviceStation }}
            />
            <ScrollView>
                <View style={[styles.sbmtBtn, styles.sbmtBtnView]}>
                <View style={[styles.sbmtBtnView]}>
                    <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>ACTIVE JOBS</Text>
                </View>
                </View>
                <JobDetailsCard job={sampleData}/>
                <JobDetailsCard job={sampleData}/>
                <JobDetailsCard job={sampleData}/>
            </ScrollView>
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
    flexDirection: 'row',
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary
  },
  sbmtBtnView: {
    paddingVertical: 17,
  },
  sbmtBtnText: {
    color: COLORS.white,
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold
  }
});

export default JobList;