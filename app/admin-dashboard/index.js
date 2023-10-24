import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import styles from "./admin-dashboard.style";
import { COLORS } from "../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "expo-router";

const AdminDashboard = () => {

  const navigation = useNavigation()
  const handleButtonPress = () => {
    console.log("Button Pressed");
  };
  
  const handleButtonPressAddDriver = () => {
    navigation.navigate("/AddDriverMain");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      {/* <View style={styles.frameChildPosition}>
        <LinearGradient
          style={[styles.frameChild, styles.frameChildPosition]}
          locations={[0, 1]}
          colors={["#023572", "#012550"]}
        />
      </View> */}
      <View>
        <Text style={styles.dashboard}>Admin Dashboard</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Image
              style={styles.image}
              source={require("../../assets/images/rectangle-30.png")}
            />
            <Text style={styles.text}>ONGOING JOBS</Text>
          </TouchableOpacity>

          <View style={styles.spacing} />

          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Image
              style={styles.image}
              source={require("../../assets/images/rectangle-30.png")}
            />
            <Text style={styles.text}>PENDING</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Image
              style={styles.image}
              source={require("../../assets/images/rectangle-30.png")}
            />
            <Text style={styles.text}>ADD SERVICE CENTER</Text>
          </TouchableOpacity>

          <View style={styles.spacing} />

          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Image
              style={styles.image}
              source={require("../../assets/images/rectangle-30.png")}
            />
            <Text style={styles.text}>HISTORY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleButtonPressAddDriver}>
            <Image
              style={styles.image}
              source={require("../../assets/images/rectangle-30.png")}
            />
            <Text style={styles.text}>ADD DRIVER</Text>
          </TouchableOpacity>

          <View style={styles.spacing} />

          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Image
              style={styles.image}
              source={require("../../assets/images/rectangle-30.png")}
            />
            <Text style={styles.text}>REPORTS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboard;
