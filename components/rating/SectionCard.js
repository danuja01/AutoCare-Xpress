import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { FontFamily, Color, Border, FontSize } from "../../assets/GlobalStyles";

const SectionCard = ({ reviewData }) => {
  return (
    <View style={styles.groupParent}>
      <View style={styles.groupWrapper}>
        <View style={styles.groupWrapper}>
          <View style={styles.groupChild} />
        </View>
      </View>
      <View style={styles.groupContainer}>
        <Image
          style={styles.groupItem}
          contentFit="cover"
          source={require("../../assets/images/locationrating/group-45.png")}
        />
        <Image
          style={styles.groupItem}
          contentFit="cover"
          source={require("../../assets/images/locationrating/group-45.png")}
        />
        <View style={styles.profilepicParent}>
          <View style={styles.profilepic}>
            <Image
              style={styles.profilepicChild}
              contentFit="cover"
              source={require("../../assets/images/locationrating/rectangle-2.png")}
            />
          </View>
          <View style={styles.oshadaThawalampolaParent}>
            <Text style={[styles.oshadaThawalampola, styles.textTypo]}>
              Oshada Thawalampola
            </Text>
            <Text style={[styles.text, styles.textTypo]}>2023/10/16</Text>
          </View>
        </View>
        <Text style={[styles.loremIpsumDolor, styles.textTypo]}>
        {reviewData.review}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.absoluteStaticWhiteS,
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    position: "absolute",
    height: 218,
    width: 354,
  },
  groupWrapper: {
    left: 0,
    top: 0,
    position: "absolute",
    height: 218,
    width: 354,
  },
  groupItem: {
    top: 172,
    left: 238,
    width: 75,
    height: 15,
    position: "absolute",
  },
  profilepicChild: {
    left: -7,
    height: 44,
    width: 44,
    borderRadius: Border.br_xl,
    top: 0,
    position: "absolute",
  },
  profilepic: {
    width: 47,
    height: 48,
  },
  oshadaThawalampola: {
    fontSize: FontSize.size_xs,
    height: 14,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 0,
    width: 131,
    top: 0,
  },
  text: {
    top: 14,
    left: 2,
    fontSize: FontSize.size_5xs,
    color: Color.colorGray_100,
    height: 10,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    width: 44,
  },
  oshadaThawalampolaParent: {
    height: 24,
    width: 131,
  },
  profilepicParent: {
    left: 7,
    flexDirection: "row",
    alignItems: "center",
    top: 0,
    position: "absolute",
  },
  loremIpsumDolor: {
    top: 55,
    fontSize: FontSize.size_2xs,
    height: 112,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 0,
    width: 313,
  },
  groupContainer: {
    top: 16,
    left: 20,
    height: 187,
    width: 313,
    position: "absolute",
  },
  groupParent: {
    height: 218,
    width: 354,
    marginTop: 16,
  },
});

export default SectionCard;
