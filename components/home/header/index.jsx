import React from "react";
import { TouchableOpacity, Image, View, Text } from "react-native";

import styles from "./header.style";
import { SIZES } from "../../../constants";
import { useRouter } from "expo-router";

const HomeHeader = ({
  iconUrl,
  dimension,
  handlePressUser,
  handlePressLocation,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <TouchableOpacity
          style={styles.locationBtnContainer}
          onPress={handlePressLocation}
        >
          <View style={styles.locationBtn}>
            <Image
              source={require("../../../assets/images/LocationMarker.png")}
              resizeMode="contain"
              style={styles.locationBtnImg(SIZES.xLarge)}
            />
          </View>
          <View>
            <Text style={styles.locationLabel}>Your Location</Text>
            <Text style={styles.location}>Colombo, Sri Lanka</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnContainer} onPress={handlePressUser}>
        <Image
          source={iconUrl}
          resizeMode="cover"
          style={styles.btnImg(dimension)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
