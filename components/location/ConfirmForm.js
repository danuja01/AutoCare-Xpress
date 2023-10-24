import React, { useState } from "react";
import { View, StyleSheet, Text , TouchableOpacity , TextInput , KeyboardAvoidingView} from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Border, Color } from "../../assets/GlobalStyles";

const ConfirmForm = () => {
  const [searchLocation, setSearchLocation] = useState("");
  
  return (
    <View style={[styles.frame, styles.iconPosition]}>
        <TouchableOpacity
          style={styles.buttonframeParent}
          onPress={() => {
          }}
        >
          <Image
            style={styles.buttonframeIcon}
            contentFit="cover"
            source={require("../../assets/images/locationrating/buttonframe.png")}
          />
          <Text style={styles.confirm}>Confirm</Text>
        </TouchableOpacity>
      <View style={styles.placePosition}>
        <Image
          style={[styles.backgroundIcon, styles.placePosition]}
          contentFit="cover"
          source={require("../../assets/images/locationrating/background.png")}
        />
        <Image
          style={[styles.locationmarkerIcon, styles.iconPosition]}
          contentFit="cover"
          source={require("../../assets/images/locationrating/locationmarker.png")}
        />
        <View style={styles.placeChild} />
        <Image
          style={styles.placeItem}
          contentFit="cover"
          source={require("../../assets/images/locationrating/group-16.png")}
        />
        <View style={styles.placeInner} />
        <Image
          style={[styles.lockclosedIcon, styles.iconPosition]}
          contentFit="cover"
          source={require("../../assets/images/locationrating/lockclosed.png")}
        />
        <Text style={[styles.peradeniyaKandy, styles.peradeniyaKandyTypo]}>
          Your Location
        </Text>
        <TextInput
          style={[styles.inputField, styles.automirajAthurugiriya, styles.peradeniyaKandyTypo]}
          value={searchLocation}
          onChangeText={setSearchLocation}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconPosition: {
    overflow: "hidden",
    position: "absolute",
  },
  placePosition: {
    height: 119,
    left: 0,
    top: 0,
    width: 365,
    position: "absolute",
  },
  peradeniyaKandyTypo: {
    textAlign: "left",
    lineHeight: 14,
    fontSize: FontSize.bodySmallBold_size,
    left: 71,
    fontFamily: FontFamily.bodySmallBold,
    fontWeight: "700",
    position: "absolute",
  },
  buttonframeIcon: {
    borderRadius: Border.br_mini,
    left: 0,
    top: 0,
    height: 55,
    width: 363,
    position: "absolute",
  },
  confirm: {
    top: 20,
    left: 152,
    fontSize: FontSize.bodyNormalBold_size,
    lineHeight: 15,
    color: Color.absoluteStaticWhiteS,
    textAlign: "center",
    fontFamily: FontFamily.bodySmallBold,
    fontWeight: "700",
    position: "absolute",
  },
  buttonframeParent: {
    top: 140,
    left: 1,
    height: 55,
    width: 363,
    position: "absolute",
  },
  backgroundIcon: {
    borderRadius: Border.br_xl,
  },
  locationmarkerIcon: {
    top: 76,
    left: 26,
    width: 24,
    height: 24,
  },
  placeChild: {
    top: 58,
    borderStyle: "solid",
    borderColor: Color.colorGainsboro,
    borderTopWidth: 1,
    width: 238,
    height: 1,
    left: 71,
    position: "absolute",
  },
  placeItem: {
    top: 11,
    left: 25,
    width: 28,
    height: 28,
    position: "absolute",
  },
  placeInner: {
    top: 48,
    left: 38,
    borderStyle: "dashed",
    borderColor: Color.colorSlategray,
    borderRadius: 0.001,
    borderRightWidth: 1,
    width: 1,
    height: 27,
    position: "absolute",
  },
  peradeniyaKandy: {
    top: 25,
    color: Color.greyTrolley,
  },
  automirajAthurugiriya: {
    top: 81,
    color: Color.greyChristmas,
  },
  lockclosedIcon: {
    top: 25,
    left: 242,
    width: 18,
    height: 18,
  },
  frame: {
    top: 572,
    left: 15,
    height: 195,
    width: 365,
    overflow: "hidden",
  },
});

export default ConfirmForm;
