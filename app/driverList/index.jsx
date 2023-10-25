import React from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import { COLORS, FONT, SIZES } from "../../constants";
import { 
  DriverCard,
  ActiveHeader,
} from "../../components";

const DriverList = () => {

  const sampleData1 = {
    _id: '',
    name: 'John Doe',
    email: 'john123@gmail.com'
};
  
const sampleData2 = {
    _id: '',
    name: 'Jane Smith',
    email: 'jane123@gmail.com',
};
  
const sampleData3 = {
    _id: '',
    name: 'Alice Johnson',
    email: 'alice123@gmail.com',
};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}> 
          <Text style={styles.headerTitle}>
            ADMIN PANEL 
          </Text>
          <View style={styles.activeHeaderContainer}>
            <ActiveHeader />
          </View>
        </View>
        <View style={[styles.sbmtBtn, styles.sbmtBtnView]}>
          <View style={[styles.sbmtBtnView]}>
            <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>REGISTERED DRIVERS LIST</Text>
          </View>
        </View>
        <DriverCard _id={sampleData1._id} name={sampleData1.name} email={sampleData1.email}/>
        <DriverCard _id={sampleData2._id} name={sampleData2.name} email={sampleData2.email}/>
        <DriverCard _id={sampleData3._id} name={sampleData3.name} email={sampleData3.email}/>
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

export default DriverList;