import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./serviceDesc.style";
import { COLORS } from "../../constants";
import {
  BackNavBtn,
  PackageCard,
  RatingPanel,
  Dropdown,
} from "../../components";

const serviceDetails = {
  name: "Auto Miraj",
  description: `Auto Miraj being Sri Lanka’s largest and the best auto service network has the most diverse service portfolio. Auto Miraj is your one stop station for all of your maintenance, repairs, and services. Auto Miraj Family drives to success based on three main pillars which are, Promptness, Respect & Oneness.`,
  locations: ["Kandy", "Nittabuwa", "Kiribathgoda", "Akurana"],
  packages: [
    {
      name: "Econo Plus",
      desc: "Specifically targeted at all entry level vehicle range with affordable yet ensuring the best value.",
    },
    {
      name: "Auto Service Plus",
      desc: "Specifically targeted at Japanese Non-Hybrid vehicle range with electronics &mechanical components inseptions.",
    },
    {
      name: "Euro Total Plus",
      desc: "Bringing European quality to the automotive service segment according to Euro manufacturer specs.",
    },
    {
      name: "Total Care Plus",
      desc: "Mechanical and cosmetic exterior and interior services to give your car a fresh look according to manufacturer standards.",
    },
  ],
};

const ServiceDesc = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => <BackNavBtn />,
          headerTitle: serviceDetails.name,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <PackageCard
          name={serviceDetails.name}
          description={serviceDetails.description}
          locations={serviceDetails.locations}
          packages={serviceDetails.packages}
        />
        <RatingPanel rating={4.5} totalRatings={143} />
        <View style={styles.optionContainer}>
          <Dropdown
            data={serviceDetails.locations}
            title={"Select the Branch"}
          />
          <Dropdown
            data={["Saloon", "Sedan", "Suv", "Van", "Lorry"]}
            title={"Vehicle Type"}
          />
          <TouchableOpacity
            style={styles.confirmBtnContainer}
            onPress={() => {
              alert("Confirm");
            }}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.confirmBtn}
            >
              <Text style={styles.btnText}>Confirm</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceDesc;
