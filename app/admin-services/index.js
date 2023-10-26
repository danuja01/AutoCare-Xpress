import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import { BackNavBtn } from "../../components";
import { db } from "../../firebase/config";
import { ref, onValue, set } from "firebase/database";
import Spinner from "react-native-loading-spinner-overlay";

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleDeleteAlert = (id) => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to delete this service station?",
      [
        {
          text: "Yes",
          onPress: () => handleDelete(id),
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleDelete = (id) => {
    setLoading(true);
    const serviceStaionsRef = ref(db, "service-stations/" + id);

    console.log("Sasa");
    set(serviceStaionsRef, null)
      .then(() => {
        Alert.alert("Success", "Service station deleted successfully");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getServiceStations = () => {
    setLoading(true);
    const serviceStaionsRef = ref(db, "service-stations/");

    onValue(serviceStaionsRef, (snapshot) => {
      const data = snapshot.val();

      const serviceStaions = Object.keys(data).map((key) => {
        return { id: key, ...data[key] };
      });

      setServices(serviceStaions);
    });

    setLoading(false);
  };

  useEffect(() => {
    getServiceStations();
  }, []);

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
          headerTitle: "Manage Services",
        }}
      />
      <Spinner visible={loading} textStyle={{ color: COLORS.white }} />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, marginTop: SIZES.small }}
        >
          {services &&
            services.map((service, index) => (
              <View key={service.id} style={styles.card}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>name</Text>
                  <Text style={styles.value}>{service.name}</Text>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>description</Text>
                  <Text style={styles.value}>
                    {service.description.slice(0, 80) + "..."}
                  </Text>
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.label}>locations</Text>
                  <Text style={styles.value}>
                    {service.locations.map((location) => location).join(", ")}
                  </Text>
                </View>
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: COLORS.yellow }]}
                    onPress={() =>
                      router.push(`/admin-update-services/${service.id}`)
                    }
                  >
                    <Text style={styles.btnText}>update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: COLORS.red }]}
                    onPress={() => handleDeleteAlert(service.id)}
                  >
                    <Text style={styles.btnText}>delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AdminServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.large,
  },
  titleContainer: {
    marginBottom: SIZES.large,
    backgroundColor: COLORS.primary,
    padding: SIZES.large,
    borderRadius: SIZES.medium,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    textAlign: "center",
    color: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.large,
    marginBottom: SIZES.large,
  },
  fieldContainer: {
    marginBottom: SIZES.large,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
    width: "48%",
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
