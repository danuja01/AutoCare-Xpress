import React, { useRef, useState } from "react";

import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import RBSheet from "@nonam4/react-native-bottom-sheet";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../../../constants";

 

const Overview = () => {

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectLocation, setLocation] = useState('');
    const [fairAmount, setFairAmount] = useState(1200);// 1200 is a given default value write a function
  
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    const handleDateConfirm = (date) => {
      setSelectedDate(date.toISOString().split('T')[0]);
      console.log(selectedDate);
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

    const refRBSheet = useRef();

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <TouchableOpacity
            title="OPEN BOTTOM SHEET"
            onPress={() => refRBSheet.current?.open()}
        >
            <Text>Button</Text>
        </TouchableOpacity>
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            height={450}
            customStyles={{
            wrapper: {
                backgroundColor: "transparent",
            },
            draggableIcon: {
                backgroundColor: "#A4A5AA",
                width: 100,
            },
            container: {
                backgroundColor: "#F3F4F8",
                borderRadius: 24,
            },
            }}
        >
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
            />
            <Text style={styles.headingText}>Payment</Text>
            <View style={styles.rows}>
                <TouchableOpacity style={[styles.formCommon, styles.btn, styles.inputs]}>
                    <Text style={styles.btnText}>
                        Visa / Master
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.formCommon, styles.btn, styles.inputs]}>
                    <Text style={styles.btnText}>
                        Cash
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
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
        </View>
        </RBSheet>
        </View>
  );
};

const styles = StyleSheet.create({
    inputs: {
        flex: 1,
    },
    formCommon: {
        height: 60,
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
    fair: {
        borderRightWidth: 1,
        borderRightColor: COLORS.white,
        paddingRight: 20
    },
    fairSize: {
        fontSize: 18,
    },
    priceSize: {
        fontSize: 22
    },
    bookNowSize: {
        fontSize: 25
    }
})

export default Overview;