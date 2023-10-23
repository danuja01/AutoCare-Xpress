import { StyleSheet } from "react-native";
import { View, Text, Animated } from "react-native";
import { COLORS, SIZES, FONT, SHADOWS } from "../../../constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useRef } from "react";

const CurrentStatus = ({ status }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  const animateDot = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  };

  useEffect(() => {
    animateDot();
  }, []);

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="clipboard-list"
        size={SIZES.xxLarge}
        color={COLORS.black}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.status}>{status ? status : "Undefined"}</Text>
        <Text style={styles.label}>Current Status</Text>
      </View>
      <Animated.View
        style={[
          styles.statusDot,
          {
            opacity: opacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.small,
    justifyContent: "space-between",
    marginBottom: SIZES.large,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.large,
    ...SHADOWS.medium,
    shadowOpacity: 0.09,
    marginHorizontal: SIZES.large,
  },
  status: {
    fontSize: SIZES.medium * 1.2,
    fontFamily: FONT.regular,
    color: COLORS.black,
  },
  label: {
    marginTop: SIZES.xSmall * 0.2,
    fontSize: SIZES.small,
    color: COLORS.mediumGray,
  },
  statusDot: {
    width: SIZES.large,
    height: SIZES.large,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.lightBlue,
  },
});

export default CurrentStatus;
