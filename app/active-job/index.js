import React from "react";
import { SafeAreaView, Text, View, ScrollView } from "react-native";
import { Stack } from "expo-router";

import styles from "./active.style";
import {
  ActiveHeader,
  CurrentStatus,
  DetailsPane,
  TrackingCard,
} from "../../components";
import { COLORS } from "../../constants";

const Active = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen options={{ header: () => null }} />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Ongoing Job</Text>
          <View style={styles.activeHeaderContainer}>
            <ActiveHeader />
          </View>
        </View>
        <DetailsPane />
        <CurrentStatus />
        <View style={styles.trackingContainer}>
          <Text style={styles.trackingTitle}>Tracking</Text>
          <View>
            <TrackingCard
              title="Driver En Route"
              desc="Arriving to, Daulagala Road, Angunawala, Kandy"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Active;
