import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import ConfirmForm from "../../components/location/ConfirmForm";
import { Border, FontSize, FontFamily, Color } from "../../assets/GlobalStyles";
import { Device } from 'expo-device';
import { Stack } from "expo-router";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, Accuracy } from "expo-location";
import RawBottomSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../../constants";
import { db } from "../../firebase/config";
import { ref, get, push, update } from "firebase/database";
import { remove } from "firebase/database";

const BookingPlacePageClosedPo = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [markerLocation, setMarkerLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [holdersName, setholdersName] = useState('');
  const [cardNumber, setcardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCVV] = useState('');
  const [save, setSave] = useState('');
  const [checked, setChecked] = useState(false);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const refRBSheet = useRef();

  const mapViewRef = useRef(null);

  const handleSaveCard = async () => {
    try {
      const paymentData = {
        holdersName,
        cardNumber,
        month,
        year,
        cvv,
      };
  
      const paymentRef = ref(db, "payment"); // Assuming "payment" is the collection name
  
      await push(paymentRef, paymentData).then((docRef) => {
        console.log("Document written with ID: ", docRef.key);
        alert("Card data saved successfully!");
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error occurred while saving card data.");
    }
  };

  const handleConfirmClick = () => {
    setIsBottomSheetVisible(false);
    refRBSheet.current.open();
  };


  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await getCurrentPositionAsync({});
        const coords = location.coords;
        setCurrentLocation(coords);
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);

        const subscription = await watchPositionAsync(
          {
            accuracy: Accuracy.High,
            timeInterval: 5000, // Update every 5 seconds
          },
          (location) => {
            setCurrentLocation(location.coords);
          }
        );

        mapViewRef.current.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        return () => subscription.remove(); // Clean up subscription on component unmount
      } else {
        alert("Permission to access location was denied");
      }
    })();
  }, []);

  useEffect(() => {
    if (currentLocation && markerLocation) {
      const distanceInMeters = getDistance(currentLocation, markerLocation);
      setDistance(distanceInMeters);
    }
  }, [currentLocation, markerLocation]);

  const getDistance = (coords1, markerLocation ) => {
    const lat1 = coords1.latitude;
    const lon1 = coords1.longitude;
    const lat2 = markerLocation.lat;
    const lon2 = markerLocation.lng;

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchLocation)}&key=AIzaSyAIW-Z6tN_sRnWWYludFvL2I1Dq3r3cQyk`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const { location } = data.results[0].geometry;
        setMarkerLocation(location);

        setLatitude(location.lat);
        setLongitude(location.lng);

        mapViewRef.current.animateToRegion({
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while searching for the location");
    }
  };

  return (
    <View style={styles.bookingPlacePageClosedPo}>
    <Stack.Screen options={{ header: () => null }} />
      <View style={styles.frameParent}>
        <Image
          style={styles.frameChild}
          contentFit="cover"
          source={require("../../assets/images/locationrating/frame-27.png")}
        />
      <View>
      </View>
        <Text style={styles.autoMiraj}>Auto Miraj - Athurugiriya</Text>
      </View>
      <View style={styles.frameLayout}>
        <View style={styles.frame}>
          <MapView
            ref={mapViewRef}
            style={styles.mapsicleMapIcon}
            initialRegion={{
              latitude: currentLocation ? currentLocation.latitude : 7.8731,
              longitude: currentLocation ? currentLocation.longitude : 80.7718,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            apiKey= {process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
          >
            {currentLocation && (
              <Marker
                coordinate={{
                  latitude: currentLocation.latitude,
                  longitude: currentLocation.longitude,
                }}
                title="Your Location"
                pinColor="blue"
              />
            )}
             {
                distance !== null && (
                  <MapViewDirections
                    origin={{latitude: currentLocation.latitude, longitude: currentLocation.longitude}}
                    destination={{latitude: markerLocation.lat, longitude: markerLocation.lng}}
                    apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor="blue" // Set the color to blue
                    waypoints={[]} 
                  />
                )
             }
            {markerLocation && (
              <Marker
                coordinate={{latitude:markerLocation.lat,longitude: markerLocation.lng}}
                title="Searched Location"
                pinColor="red"
                style={{ zIndex: 1 }}
              />
            )}
          </MapView>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchLocation}
          onChangeText={setSearchLocation}
          placeholder="Enter a location"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <ConfirmForm onConfirmClick={handleConfirmClick} />
      <RawBottomSheet ref={refRBSheet} height={400} closeOnDragDown={true}>
        

      <View style={{
                    flex: 1
                }}>
                    <View>
                    <View>
                      <Text style={styles.headingText}>Card Holder Name</Text>
                      <TextInput
                        placeholder="John Doe"
                        value={holdersName}
                        onChangeText={(text) => setholdersName(text)} // Update the state on change
                        style={[styles.formCommon]}
                        placeholderTextColor="#A4A5AA"
                      />
                      <Text style={styles.headingText}>Card Number</Text>
                      <TextInput
                        placeholder="Visa / Master"
                        value={cardNumber}
                        onChangeText={(text) => setcardNumber(text)}
                        style={[styles.formCommon, styles.btn]}
                        placeholderTextColor="#A4A5AA"
                      />
                    </View>
                    <View style={[styles.rows]}>
                      <View style={[styles.inputs]}>
                        <Text style={[styles.headingText]}>Month</Text>
                        <TextInput
                          placeholder="MM"
                          value={month}
                          onChangeText={(text) => setMonth(text)}
                          style={[styles.formCommon, styles.btn]}
                          placeholderTextColor="#A4A5AA"
                        />
                      </View>
                      <View style={[styles.inputs]}>
                        <Text style={styles.headingText}>Year</Text>
                        <TextInput
                          placeholder="YY"
                          value={year}
                          onChangeText={(text) => setYear(text)}
                          style={[styles.formCommon, styles.btn]}
                          placeholderTextColor="#A4A5AA"
                        />
                      </View>
                      <View style={[styles.inputs]}>
                        <Text style={styles.headingText}>CVV</Text>
                        <TextInput
                          placeholder="CVV"
                          value={cvv}
                          onChangeText={(text) => setCVV(text)}
                          style={[styles.formCommon, styles.btn]}
                          placeholderTextColor="#A4A5AA"
                        />
                      </View>
                    </View>
                    <TouchableOpacity onPress={handleSaveCard}>
                      <View style={[styles.sbmtBtn]}>
                        <View style={[styles.sbmtBtnView]}>
                          <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>ADD CARD</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    </View>
                </View>

      </RawBottomSheet>
      {isBottomSheetVisible && refRBSheet.current.open()}
      <View style={styles.distanceContainer}>
      {distance !== null && (
        <Text style={styles.distanceText}>
          Distance: {(getDistance(currentLocation, markerLocation) / 1000).toFixed(2)} kilometers
        </Text>
      )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
},
formCommon: {
    height: 40,
    borderColor: '#A4A5AA',
    borderWidth: 1,
    borderRadius: 10,
    color: '#000000',
    paddingLeft: 10,
    margin: 10
},
rows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
},
overview: {
    fontWeight: 600
},
headingText: {
    color: "#000000",
    marginLeft: 12,
},
btnText: {
    color: "#666666"
},
btn: {
    justifyContent: "center",
    alignItems: "center",
},
sbmtBtn: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary
},
sbmtBtnView: {
    margin: 10,
},
sbmtBtnText: {
    color: COLORS.white
},
checkBox:{
    borderRadius: 10,
},
  distanceText: {
    color: 'black', // Change the color of the text if needed
    fontSize: FontSize.size_base,
    fontWeight: '600',
    fontFamily: FontFamily.interSemiBold,
    textAlign: 'left',
  },
  distanceContainer: {
    left: 40, // Adjust the left position as needed
    bottom: 320, // Adjust the bottom position as needed
    borderRadius: 10, // Adjust border radius as needed
    paddingHorizontal: 10, // Adjust padding as needed
    paddingVertical: 5, // Adjust padding as needed
    width: 231, // Adjust width as needed
  },
  bookingPlacePageClosedPo: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: "100%",
  },
  frameLayout: {
    overflow: "hidden",
    height: 852,
  },
  mapsicleMapIcon: {
    top: 120,
    height: 732,
  },
  frameChild: {
    top: -8,
    left: -8,
    borderRadius: Border.br_mini,
    width: 57,
    height: 57,
    position: "absolute",
  },
  autoMiraj: {
    top: 10,
    left: 95,
    fontSize: FontSize.size_base,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorBlack,
    textAlign: "left",
    position: "absolute",
  },
  frameParent: {
    top: 58,
    left: 20,
    width: 272,
    height: 41,
    position: "absolute",
  },
  frame: {
    top: 0,
    left: 0,
    overflow: "hidden",
    height: 852,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 2,
  },
  searchInput: {
    width: 200,
    height: 40,
    borderColor: Color.colorGainsboro,
    borderRadius: Border.br_mini,
    paddingLeft: 10,
    marginRight: 10,
    bottom:198,
    left: 60,
  },
  searchButton: {
    backgroundColor: "#023572",
    borderRadius: Border.br_mini,
    paddingHorizontal: 15,
    paddingVertical: 8,
    bottom:308,
    left: 50,
  },
  searchButtonText: {
    color: Color.absoluteStaticWhiteS,

  },
});

export default BookingPlacePageClosedPo;
