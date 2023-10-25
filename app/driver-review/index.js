import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";
import { COLORS } from "../../constants";
import { Stack } from "expo-router";
import { FONT, SIZES } from "../../constants";
import { ActiveHeader, DriverDetailsPane } from "../../components";

const DriverReviewPage = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Assigned Jobs</Text>
          <View style={styles.activeHeaderContainer}>
            <ActiveHeader />
          </View>
        </View>

        <DriverDetailsPane />

        <View style={styles.driverReviewPage}>
          <View style={styles.driverReviewPageChild} />
          <Text style={[styles.deliverTo, styles.deliverToTypo]}>
            Deliver to
          </Text>
          <Text style={[styles.deliveryAddressNo, styles.deliverToTypo]}>
            Delivery Address: No. 24 , Peradeniya road, Kandy
          </Text>
          <Text style={[styles.vehicleTypeContainer, styles.containerPosition]}>
            <Text style={styles.vehicleTypo}>{`Vehicle type       `}</Text>
            <Text style={styles.textTypo}>{`: `}</Text>
            <Text style={styles.suv}>SUV</Text>
          </Text>
          <Text
            style={[styles.vehicleModelContainer, styles.containerPosition]}
          >
            <Text style={styles.vehicleTypo}>{`Vehicle Model   `}</Text>
            <Text style={styles.textTypo}>{`: `}</Text>
            <Text style={styles.suv}>Suzuki Wagon R</Text>
          </Text>
          <Text
            style={[styles.date20231012Container, styles.containerPosition]}
          >
            <Text style={styles.vehicleTypo}>Date</Text>
            <Text style={styles.textTypo}>{`                      : `}</Text>
            <Text style={styles.suv}>2023-10-12</Text>
          </Text>
          <Text style={[styles.time1000Container, styles.containerPosition]}>
            <Text style={styles.vehicleTypo}>Time</Text>
            <Text style={styles.textTypo}>{`                     : `}</Text>
            <Text style={styles.suv}>10:00 am</Text>
          </Text>
          <TouchableOpacity
            style={[styles.buttonframeParent, styles.buttonframeLayout]}
            activeOpacity={0.2}
            onPress={() => {}}
          >
            <View style={[styles.buttonframe, styles.buttonframeLayout]}>
              <LinearGradient
                style={[styles.buttonframeChild, styles.frameInnerPosition]}
                locations={[0, 1]}
                colors={["#023572", "#012550"]}
              />
              <Image
                style={styles.arrownarrowrightoutlineIcon}
                contentFit="cover"
                source={require("../../assets/images/arrownarrowrightoutline.png")}
              />
            </View>
            <Text style={[styles.goToMap, styles.goToMapTypo]}>Go to map</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.rectangleGroup, styles.frameInnerLayout]}
            activeOpacity={0.2}
            onPress={() => {}}
          >
            <LinearGradient
              style={[styles.frameInner, styles.frameInnerLayout]}
              locations={[0, 1]}
              colors={["#023572", "#012550"]}
            />
            <Text style={[styles.addDamageAssessment, styles.goToMapTypo]}>
              Add Damage Assessment
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  vehicleTypo: {
    fontFamily: FontFamily.interBold,
    fontWeight: "700",
  },
  deliverToTypo: {
    color: Color.iOS000000,
    fontSize: FontSize.iOSMediumBody_size,
    textAlign: "left",
  },
  containerPosition: {
    left: "18%",
    flex: 1,
    color: Color.iOS000000,
    fontSize: FontSize.iOSMediumBody_size,
    textAlign: "left",
    //textAlignVertical: "left",
    position: "absolute",
  },
  buttonframeLayout: {
    height: 38,
    width: 291,
    position: "absolute",
  },
  frameInnerPosition: {
    borderRadius: Border.br_mini,
    backgroundColor: "transparent",
    left: 0,
    top: 0,
  },
  goToMapTypo: {
    height: 20,
    display: "flex",
    textAlign: "center",
    lineHeight: 15,
    fontSize: FontSize.bodyNormalBold_size,
    top: "35%",
    fontFamily: FontFamily.bodyNormalBold,
    fontWeight: "700",
    color: Color.iOSFFFFFF,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
  frameInnerLayout: {
    width: 280,
    height: 38,
    position: "absolute",
  },
  frameChild: {
    backgroundColor: "transparent",
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    height: 216,
    width: 354,
    position: "absolute",
  },
  driverReviewPageChild: {
    backgroundColor: "rgba(217, 217, 217, 0.6)",
    width: 348,
    height: 165,
    borderRadius: Border.br_xl,
    position: "absolute",
    top: "18%", 
    left: "50%", 
    transform: [
      { translateX: -174.5 }, // Adjust based on half of the width
      { translateY: -82.5 }, // Adjust based on half of the height
    ],
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryAddressNo: {
    top: "12%", 
    left: "12%",
    width: 295,
    fontFamily: FontFamily.bodyNormalBold,
    color: Color.iOS000000,
    fontWeight: "700",
    position: "absolute",
  },
  deliverTo: {
    top: "6%", 
    left: "40%",
    fontFamily: FontFamily.bodyNormalBold,
    color: Color.iOS000000,
    fontWeight: "700",
    position: "absolute",
  },
  textTypo: {
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
  },
  suv: {
    fontFamily: FontFamily.interRegular,
  },
  vehicleModelContainer: {
    top: "40%",
  },
  vehicleTypeContainer: {
    top: "45%",
  },
  date20231012Container: {
    top: "50%",
  },
  time1000Container: {
    top: "55%",
    width: 222,
  },
  buttonframeChild: {
    height: 38,
    width: 291,
    position: "absolute",
  },
  arrownarrowrightoutlineIcon: {
    top: "30%",
    left: "85%",
    width: 19,
    height: 17,
    position: "absolute",
    overflow: "hidden",
  },
  buttonframe: {
    left: 0,
    top: 0,
  },
  goToMap: {
    left: "35%",
  },
  buttonframeParent: {
    top: "22%", 
    left: "12%",
  },
  frameInner: {
    borderRadius: Border.br_mini,
    backgroundColor: "transparent",
    left: 0,
    top: 0,
  },
  addDamageAssessment: {
    width: 201,
    left: "14%",
  },
  rectangleGroup: {
    top: "60%",
    left: "14%",
  },
  driverReviewPage: {
    backgroundColor:Color.colorWhitesmoke_100,
    flex: 1,
    width: "100%",
    height: 600,
    overflow: "hidden",
  },
  //from active.styles
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
});

export default DriverReviewPage;
