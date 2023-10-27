import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import ConfirmForm from "../../components/location/ConfirmForm";
import { Border, FontSize, FontFamily, Color } from "../../assets/GlobalStyles";
import { Device } from 'expo-device';
import { Stack, useLocalSearchParams } from "expo-router";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, Accuracy } from "expo-location";
import RawBottomSheet from "react-native-raw-bottom-sheet";
import { COLORS , SIZES } from "../../constants";
import { db } from "../../firebase/config";
import { ref, get, push, update } from "firebase/database";
import { remove } from "firebase/database";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CardDetailsCard from "../../components/common/cards/cardDetails";
import { ScrollView } from "react-native-gesture-handler";

const BookingPlacePageClosedPo = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [markerLocation, setMarkerLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const sampleData1 = {
    holdersName: 'John Doe',
    cardNo: '1234 5678 9012 3456',
    cardType: 'Visa',
};
  
const sampleData2 = {
    holdersName: 'Jane Smith',
    cardNo: '9876 5432 1098 7654',
    cardType: 'Mastercard',
};
  
const sampleData3 = {
    holdersName: 'Alice Johnson',
    cardNo: '4567 8901 2345 6789',
    cardType: 'American Express',
};

  const params = useLocalSearchParams();

  const [holdersName, setholdersName] = useState('');
  const [cardNumber, setcardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvv, setCVV] = useState('');
  const [save, setSave] = useState('');
  const [checked, setChecked] = useState(false);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectLocation, setLocation] = useState('');
  const [fairAmount, setFairAmount] = useState(1200);// 1200 is a given default value write a function
  const [vehicleNo, setvehicleNo] = useState('');

  const serviceid = params.id;

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
      const date = new Date(time); // Convert to Date object
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
    
      // Convert hours to 12-hour format
      const formattedHours = hours % 12 || 12;
    
      // Zero-pad minutes
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    
      const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
      setSelectedTime(formattedTime);
      hideTimePicker();
    };

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isBottomSheetVisible1, setIsBottomSheetVisible1] = useState(false);
  const [isBottomSheetVisible3, setIsBottomSheetVisible3] = useState(false);

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet3 = useRef();

  const mapViewRef = useRef(null);

  const handleConfirmClick = () => {
    setIsBottomSheetVisible(false);
    refRBSheet.current.open();
  };

  const handleadd = () => {
    setIsBottomSheetVisible3(false);
    refRBSheet3.current.open();
  };

  const handleBookNowClick = async () => {
    setIsBottomSheetVisible1(false);
    refRBSheet1.current.open(); // Open the RawBottomSheet
  
    try {
      const paymentData = {
        holdersName,
        cardNumber,
        month,
        year,
        cvv,
        selectedDate,
        selectedTime,
        selectLocation, // Replace with the actual variable holding pickup location
        vehicleNo, // Replace with the actual variable holding vehicle number
        selectedOption,
        fairAmount
      };
  
      const paymentRef = ref(db, `booking/${serviceid}`); // Assuming "payments" is the collection name
  
      const docRef = await push(paymentRef, paymentData);
      console.log("Document written with ID: ", docRef.key);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error occurred while saving payment data.");
    }
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

  const userId = "z3tPuQJiyMUgeUwGaZthiabA4Z43";

  const handleSaveCard = async () => {
    try {
      const paymentData = {
        holdersName,
        cardNumber,
        month,
        year,
        cvv,
      };
  
      const paymentRef = ref(db, `payment/${userId}`); // Assuming "payment" is the collection name
  
      await push(paymentRef, paymentData).then((docRef) => {
        console.log("Document written with ID: ", docRef.key);
        alert("Card data saved successfully!");
      });
  
      // Fetch payment data after saving
      await fetchPaymentData();
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error occurred while saving card data.");
    }
  };
  


  const [paymentData, setPaymentData] = useState(null);

  // Function to fetch payment data
  const fetchPaymentData = async () => {
    try {
      const snapshot = await get(ref(db, `payment/${userId}`));
      if (snapshot.exists()) {
        const paymentData = snapshot.val();
        setPaymentData(paymentData)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  useEffect(() => {
    fetchPaymentData(); // Call the function to fetch payment data
  }, []); // This effect will run only once when the component mounts

  

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
      <RawBottomSheet ref={refRBSheet} height={450} closeOnDragDown={true}>


      <View style={{
            flex: 1
        }}>
            <Text style={[styles.headingText, styles.overview]}>Overview</Text>
            <View style={styles.rows}>
                <TextInput
                    placeholder="Date"
                    value={selectedDate}
                    editable={false}
                    onTouchStart={showDatePicker}
                    style={[styles.formCommon, styles.inputs]}
                    placeholderTextColor="#A4A5AA"
                />
                <TextInput
                    placeholder="Time"
                    value={selectedTime}
                    editable={false}
                    onTouchStart={showTimePicker}
                    style={[styles.formCommon, styles.btn, styles.inputs]}
                    placeholderTextColor="#A4A5AA"
                />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={hideDatePicker}
                />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleTimeConfirm}
                    onCancel={hideTimePicker}
                />
            </View>
            <Text style={styles.headingText}>Pick-up location</Text>
            <TextInput style={styles.formCommon}
                placeholder="Pickup Location"
                placeholderTextColor="#A4A5AA"
                onChangeText={setLocation}
            />
            <Text style={styles.headingText}>Vehicle No</Text>
            <TextInput style={styles.formCommon}
                placeholder="Pickup Location"
                placeholderTextColor="#A4A5AA"
                onChangeText={setvehicleNo}
            />
            <Text style={styles.headingText}>Payment</Text>
            <View style={styles.rows}>
            <TouchableOpacity
              style={[
                styles.formCommon,
                styles.btn,
                styles.inputs,
                selectedOption === 'VisaMaster' ? styles.selected : null,
              ]}
              onPress={() => handleOptionSelect('VisaMaster')}
            >
              <Text style={styles.btnText}>Visa / Master</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.formCommon,
                styles.btn,
                styles.inputs,
                selectedOption === 'Cash' ? styles.selected : null,
              ]}
              onPress={() => handleOptionSelect('Cash')}
            >
              <Text style={styles.btnText}>Cash</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleBookNowClick}>
              <View style={[styles.sbmtBtn]}>
                <View style={[styles.sbmtBtnView, styles.fair]}>
                  <Text style={[styles.fairSize, styles.sbmtBtnText]}>Fair</Text>
                  <Text style={[styles.priceSize, styles.sbmtBtnText]}>{'LKR' + fairAmount.toFixed(2)}</Text>
                </View>
                <View style={[styles.sbmtBtnView]}>
                  <Text style={[styles.bookNowSize, styles.sbmtBtnText]}>Book Now</Text>
                </View>
              </View>
            </TouchableOpacity>
            <RawBottomSheet ref={refRBSheet1} height={450} closeOnDragDown={true}>
                <View style={styles.textBoxHeight}>
                    <Text style={[styles.headingText, styles.overview]}>Saved Cards</Text>
                </View>
                  <View style={styles.cardContainer}>
                    <ScrollView>
                      {paymentData &&
                        Object.entries(paymentData).map(([key, value]) => (
                          <CardDetailsCard key={key} cardData={value} />
                      ))}
                    </ScrollView>
                  </View>
                  <TouchableOpacity onPress={handleadd}>
                    <View style={[styles.createCard]}>
                      <Text>+ Add new card</Text>
                    </View>
                  </TouchableOpacity>
                  

                  <RawBottomSheet ref={refRBSheet3} height={450} closeOnDragDown={true}>
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
            {isBottomSheetVisible3 && refRBSheet.current && refRBSheet3.current.open()}


            </RawBottomSheet>
            {isBottomSheetVisible1 && refRBSheet.current && refRBSheet1.current.open()}
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
  overview: {
    fontWeight: 600
},
headingText: {
    color: "#000000",
    marginLeft: 12,
},
textBoxHeight: {
  maxHeight: 20,
  flex: 1
},
cardContainer: {
    flexDirection: "column",
    marginVertical: 40,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A4A5AA",
    borderRadius: 20,
},
createCard: {
    borderWidth: 1,           // Border width
    borderRadius: 2,         // Border radius (for rounded corners)
    borderColor: 'black',    // Border color
    borderStyle: 'dotted',   // Set the border style to dotted
    padding: 10,
    marginHorizontal: SIZES.large,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    bottom : 30,
},
selected: {
  backgroundColor: COLORS.primary,
},
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
