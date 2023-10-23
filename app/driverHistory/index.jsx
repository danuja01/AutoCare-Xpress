import React from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { 
    HistoryCard,
    ActiveHeader,
} from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";

const DriverHistory = () => {

    const sampleData1 = {
        _id : '',
        vehicleNo: 'CBH 7532',
        date: '2023-10-12',
        serviceCentre: 'AutoMirage',
        driverId: 'MK67854'
    };
  
    const sampleData2 = {
        _id : '',
        vehicleNo: 'CBH 7532',
        date: '2023-10-12',
        serviceCentre: 'AutoMirage',
        driverId: 'MK67854'
    };
  
    const sampleData3 = {
        _id : '',
        vehicleNo: 'CBH 7532',
        date: '2023-10-12',
        serviceCentre: 'AutoMirage',
        driverId: 'MK67854'
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}> 
          <Text style={styles.headerTitle}>
            HISTORY 
          </Text>
          <View style={styles.activeHeaderContainer}>
            <ActiveHeader />
          </View>
        </View>
        <TouchableOpacity style={[styles.sbmtBtn, styles.sbmtBtnView]}>
          <View style={[styles.sbmtBtnView]}>
            <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>OnGoing Jobs</Text>
          </View>
        </TouchableOpacity>
        <HistoryCard job={sampleData1}/>
        <HistoryCard job={sampleData2}/>
        <HistoryCard job={sampleData3}/>
        <HistoryCard job={sampleData1}/>
        <HistoryCard job={sampleData2}/>
        <HistoryCard job={sampleData3}/>
        <HistoryCard job={sampleData1}/>
        <HistoryCard job={sampleData2}/>
        <HistoryCard job={sampleData3}/>
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

export default DriverHistory;