import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontSize, Color, FontFamily, Border } from "../../../assets/GlobalStyles";
import { FONT, SIZES, COLORS } from "../../../constants";

const FromClient = () => {
  const onFrameButtonClick = useCallback(() => {
    Alert.alert("Are you sure?", "", [
      {
        text: "Yes",
        onPress: () => console.log("Yes pressed"),
      },
      {
        text: "No",
        onPress: () => console.log("No pressed"),
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.fromClient}>
      <View style={styles.fromClientChild} />
      <Text style={styles.confirmDeliveryCompletion}>
        Confirm Delivery Completion
      </Text>
      <View style={styles.fromClientItem} />
      <Text style={[styles.regN0, styles.regN0Typo]}>Reg No : </Text>
      <Text style={[styles.cbh7532, styles.regN0Typo]}>CBH-7532</Text>
      <Text style={[styles.vehicleModel, styles.vehicleModelPosition]}>
        Vehicle Model :
      </Text>
      <Text style={[styles.suzukiWagonR, styles.vehicleModelPosition]}>
        Suzuki Wagon R
      </Text>
      <Text style={[styles.date, styles.datePosition]}>
        <Text style={styles.timeTypo}>Date : </Text>
      </Text>
      <Text style={[styles.text1, styles.datePosition]}>
        <Text style={styles.text3}>2023-10-12</Text>
      </Text>
      <Text style={[styles.time, styles.amPosition]}>Time : </Text>
      <Text style={[styles.am, styles.amPosition]}>10:00 am</Text>
      <Text style={[styles.from, styles.fromTypo]}>From : </Text>
      <Text style={[styles.no24, styles.toTypo]}>
        No. 24 , Peradeniya road, Kandy
      </Text>
      <Text style={[styles.to, styles.fromTypo]}>To : </Text>
      <Text style={[styles.autoMiraj, styles.toTypo]}>
        Auto Miraj - Athurugiriya
      </Text>
      <TouchableOpacity
        style={[styles.rectangleParent, styles.frameChildLayout]}
        activeOpacity={0.2}
        onPress={onFrameButtonClick}
      >
        <View style={[styles.frameChild, styles.frameChildLayout]} />
        <Text style={[styles.confirm, styles.confirmTypo]}>CONFIRM</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fromClient: {
    backgroundColor: "#eae9ee",
    flex: 1,
    width: "100%",
    height: 852,
    overflow: "hidden",
  },
  regN0Typo: {
    textAlign: "left",
    fontSize: FontSize.iOSMediumBody_size,
    position: "absolute",
  },
  vehicleModelPosition: {
    top: "34%",
    textAlign: "left",
    fontSize: FontSize.iOSMediumBody_size,
    color: COLORS.black,
    position: "absolute",
  },
  regN0: {
    right: "52%",
    top: "37%",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
    textAlign: "left",
    fontSize: FontSize.iOSMediumBody_size,
    color: COLORS.black,
  },
  datePosition: {
    top: "40%",
    textAlign: "left",
    fontSize: FontSize.iOSMediumBody_size,
    color: Color.iOS000000,
    position: "absolute",
  },
  amPosition: {
    top: "43%",
    textAlign: "left",
    fontSize: FontSize.iOSMediumBody_size,
    color: Color.iOS000000,
    position: "absolute",
  },
  frameChildLayout: {
    top: "65%",
    left: "15%",
    right: "15%",
    height: 45,
    width: "70%",
    position: "absolute",
  },
  confirmTypo: {
    textAlign: "center",
    position: "absolute",
    top: "90%",
    left: "35%",
    right: "35%",
    width: "30%",
  },
  confirm: {
    fontFamily: FONT.bold,
    color: COLORS.white,
    fontWeight: "700",
    textAlign: "center",
    fontSize: SIZES.medium,
  },
  fromTypo: {
    fontFamily: FONT.semiBold,
    fontSize: FontSize.iOSMediumBody_size,
    textAlign: "right",
    color: Color.iOS000000,
    fontWeight: "600",
    position: "absolute",
  },
  toTypo: {
    height: 46,
    fontFamily: FONT.semiBold,
    fontSize: FontSize.iOSMediumBody_size,
    textAlign: "left",
    color: Color.iOS000000,
    fontWeight: "600",
    position: "absolute",
  },
  fromClientChild: {
    top: "16%",
    left: "5%",
    right: "5%",
    borderRadius: Border.br_xl,
    backgroundColor: COLORS.background,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 15,
    elevation: 15,
    shadowOpacity: 1,
    width: "90%",
    height: 513,
    position: "absolute",
  },
  confirmDeliveryCompletion: {
    top: "18%",
    left: "20%",
    right: "20%",
    fontSize: 24,
    width: "60%",
    textAlign: "center",
    color: Color.iOS000000,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  fromClientItem: {
    top: "30%",
    left: "12%",
    right: "12%",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.16)",
    borderTopWidth: 1,
    width: "76%",
    height: 1,
    position: "absolute",
  },
  cbh7532: {
    left: "52.5%",
    fontFamily: FontFamily.interRegular,
    textAlign: "left",
    fontSize: FontSize.iOSMediumBody_size,
    top: "37%",
    color: Color.iOS000000,
  },
  vehicleModel: {
    right: "53%",
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  suzukiWagonR: {
    left: "52.5%",
    fontFamily: FontFamily.interRegular,
  },
  timeTypo: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  text: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  date: {
    right: "52%",
  },
  text3: {
    fontFamily: FontFamily.interRegular,
  },
  text1: {
    left: "52.5%",
  },
  time: {
    right: "52%",
    //width: 60,
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  am: {
    left: "52.5%",
    width: 75,
    fontFamily: FontFamily.interRegular,
  },
  frameChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_mini,
    backgroundColor: Color.colorDarkslateblue_100,
  },
  rectangleParent: {
    top: "68%",
    left: "15%",
  },
  from: {
    top: "52%",
    //left: "15%",
    right: "70%",
    height: 30,
    width: "15%",
  },
  no24: {
    top: "52%",
    left: "31%",
    right: "9%",
    height: 30,
    width: "60%",
  },
  to: {
    top: "60%",
    right: "70%",
    height: 30,
    width: "15%",
  },
  autoMiraj: {
    top: "60%",
    left: "31%",
    right: "9%",
    height: 30,
    width: "60%",
  },
});

export default FromClient;
