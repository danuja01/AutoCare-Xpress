import React, { useCallback } from "react";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Image } from "expo-image";
//import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../../GlobalStyles.js";
import { COLORS } from "../../constants";

const DamageAssessment = () => {
  //const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const onDoneClick = useCallback(() => {
    Alert.alert("Are you sure?", "Are you sure?", [
      {
        text: "Confirm",
        onPress: () => console.log("Confirm pressed"),
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView style={styles.container}>
        <View style={styles.damageAssessment}>
          <TouchableOpacity
            style={styles.wrapper}
            activeOpacity={0.2}
            onPress={() => {}}
          >
            <Image
              style={styles.icon}
              contentFit="cover"
              source={require("../../assets/images/ellipse-24.png")}
            />
          </TouchableOpacity>
          <View style={[styles.damageAssessmentChild, styles.damageLayout]} />
          <View style={[styles.damageAssessmentItem, styles.damageLayout]} />
          <View style={[styles.damageAssessmentInner, styles.damageLayout]} />
          <Pressable
            style={[styles.rectangleParent, styles.frameChildLayout]}
            //onPress={() => navigation.goBack()}
          >
            <View style={[styles.frameChild, styles.frameChildLayout]} />
            <Image
              style={styles.arrowleftIcon}
              contentFit="cover"
              source={require("../../assets/images/arrowleft.png")}
            />
          </Pressable>
          <TouchableOpacity
            style={styles.done}
            activeOpacity={0.2}
            onPress={onDoneClick}
          >
            <Text style={styles.done1Typo}>Done</Text>
          </TouchableOpacity>
          <Text style={[styles.performedBy, styles.done1Typo]}>
            Performed by:
          </Text>
          <TextInput
            style={[styles.clickHereTo1, styles.clickTypo]}
            placeholder="Click here to type . . ."
            placeholderTextColor="#a4a5aa"
          />
          <Text style={styles.damageAssessment1}>Damage Assessment</Text>
          <Text style={[styles.vehicleNo, styles.cbh7532Typo]}>
            Vehicle No:
          </Text>
          <Text style={[styles.cbh7532, styles.cbh7532Typo]}>CBH 7532</Text>
          <TextInput
            style={[styles.clickHereTo, styles.clickTypo]}
            placeholder="Click here to type . . ."
            multiline={true}
            placeholderTextColor="#a4a5aa"
          />
          <View style={[styles.lineView, styles.damageLayout]} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  damageLayout: {
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
  frameChildLayout: {
    height: 41,
    width: 41,
    position: "absolute",
  },
  done1Typo: {
    textAlign: "left",
    color: Color.iOS000000,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    fontSize: FontSize.iOSMediumBody_size,
  },
  cbh7532Typo: {
    top: "18%",
    fontSize: FontSize.size_lgi,
    textAlign: "left",
    color: Color.iOS000000,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  clickTypo: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.iOSMediumBody_size,
    position: "absolute",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  wrapper: {
    left: "70%",
    top: "4.5%",
    width: 45,
    height: 45,
    position: "absolute",
  },
  damageAssessmentChild: {
    top: "6.5%",
    width: 24,
    borderColor: Color.iOS000000,
    left: "73%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  damageAssessmentItem: {
    top: "7.6%",
    width: 24,
    borderColor: Color.iOS000000,
    left: "73%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  damageAssessmentInner: {
    top: "7.1%",
    width: 24,
    borderColor: Color.iOS000000,
    left: "73%",
    height: 1,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  frameChild: {
    top: 0,
    left: 0,
    borderRadius: Border.br_mini,
    backgroundColor: Color.iOSFFFFFF,
    shadowColor: "rgba(0, 0, 0, 0.11)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 11,
    elevation: 11,
    shadowOpacity: 1,
  },
  arrowleftIcon: {
    top: "25%",
    left: "25%",
    width: 20,
    height: 20,
    position: "absolute",
    overflow: "hidden",
  },
  rectangleParent: {
    top: "4.5%",
    left: "5%",
  },
  done: {
    left: "85%",
    top: "5.8%",
    position: "absolute",
  },
  performedBy: {
    left: "9%",
    top: "22.5%",
    position: "absolute",
  },
  damageAssessment1: {
    top: "14%",
    fontSize: FontSize.size_lgi,
    left: "9%",
    textAlign: "left",
    color: Color.iOS000000,
    fontFamily: FontFamily.robotoBold,
    fontWeight: "700",
    position: "absolute",
  },
  vehicleNo: {
    left: "9%",
  },
  cbh7532: {
    left: "40%",
  },
  clickHereTo: {
    top: "30%",
    left: "9%",
  },
  clickHereTo1: {
    left: "40%",
    top: "22.2%",
  },
  lineView: {
    top: "26%",
    borderColor: "#bbbcbc",
    width: "90%",
    left: "5%",
    right: "5%",
    height: 2,
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  damageAssessment: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    height: 852,
    overflow: "hidden",
    width: "100%",
  },
});

export default DamageAssessment;