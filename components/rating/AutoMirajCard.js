import React from "react";
import { View, StyleSheet, Pressable, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontSize, Border, FontFamily } from "../../assets/GlobalStyles";

const AutoMirajCard = ({ totalReviews, avgRating }) => {
  const navigation = useNavigation();

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < avgRating; i++) {
      stars.push(
        <Image
          key={i}
          style={styles.starIcon}
          contentFit="cover"
          source={require("../../assets/images/locationrating/star.png")}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.groupParent}>
      <View style={styles.groupContainer}>
        <Pressable
          style={[styles.rectangleParent, styles.groupChildLayout]}
          onPress={() => navigation.goBack()}
        >
          <View style={[styles.groupChild, styles.groupPosition]} />
          <Image
            style={[styles.arrowleftIcon, styles.groupInnerLayout]}
            contentFit="cover"
            source={require("../../assets/images/locationrating/arrowleft.png")}
          />
        </Pressable>
        <Text style={[styles.autoMiraj, styles.autoMirajTypo]}>
          Auto Miraj - Athurugiriya
        </Text>
      </View>
      <View style={[styles.groupView, styles.groupLayout]}>
        <View style={[styles.rectangleWrapper, styles.groupLayout]}>
          <View style={[styles.groupItem, styles.groupLayout]} />
        </View>
        <View style={[styles.totalRatingsParent, styles.groupInnerLayout]}>
          <Text style={[styles.totalRatings, styles.autoMirajTypo]}>
            <Text style={styles.text}>{avgRating}/5</Text>
            <Text style={styles.text1}>{` `}</Text>
            <Text style={styles.text2}>{`| `}</Text>
            <Text style={styles.text1}> {totalReviews} Total Ratings</Text>
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderStars()}
          </View>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  starIcon: {
    width: 20,
    height: 20,
    marginRight: 2,
    left: 210,
  },
  groupChildLayout: {
    width: 41,
    height: 41,
  },
  groupPosition: {
    backgroundColor: Color.absoluteStaticWhiteS,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupInnerLayout: {
    height: 20,
    position: "absolute",
  },
  autoMirajTypo: {
    textAlign: "left",
    fontSize: FontSize.size_base,
    position: "absolute",
  },
  groupLayout: {
    height: 55,
    width: 354,
  },
  groupChild: {
    borderRadius: Border.br_mini,
    shadowColor: "rgba(0, 0, 0, 0.11)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 11,
    elevation: 11,
    shadowOpacity: 1,
    width: 41,
    height: 41,
  },
  arrowleftIcon: {
    left: 11,
    width: 20,
    overflow: "hidden",
    top: 10,
  },
  rectangleParent: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  autoMiraj: {
    left: 81,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    top: 10,
  },
  groupContainer: {
    width: 272,
    height: 41,
  },
  groupItem: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.absoluteStaticWhiteS,
    left: 0,
    top: 0,
    position: "absolute",
  },
  rectangleWrapper: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  text: {
    color: Color.colorOrange,
  },
  text1: {
    color: Color.colorBlack,
  },
  text2: {
    color: Color.colorDarkgray,
  },
  totalRatings: {
    top: 1,
    fontWeight: "500",
    fontFamily: FontFamily.interMedium,
    width: 197,
    height: 20,

    left: 0,
  },
  groupInner: {
    left: 207,
    width: 100,
    top: 0,
  },
  totalRatingsParent: {
    top: 18,
    left: 26,
    width: 320,
  },
  groupView: {
    marginTop: 28,
  },
  groupParent: {
    top: 58,
    left: 35,
    justifyContent: "center",
    position: "absolute",
  },
});

export default AutoMirajCard;
