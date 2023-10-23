import React, { useRef, useState } from "react";
import {Text, View, TouchableOpacity, StyleSheet } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { TextInput } from "react-native-gesture-handler";
import { COLORS, FONT, SIZES } from "../../../constants";
import CardDetailsCard from "../../common/cards/cardDetails";

const SelectCard = () => {

    const refRBSheet = useRef();

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

    return(
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
                    backgroundColor: "#E6E8F0",
                    borderRadius: 24,
                },
                }}
            >
                <View style={{
                    flex: 1
                }}>
                    <Text style={[styles.headingText, styles.overview]}>Saved Cards</Text>
                </View>
                <View style={[styles.cardContainer]}>
                    <CardDetailsCard {...sampleData1}/>
                </View>
                <TouchableOpacity>
                    <View style={[styles.createCard]}>
                        <Text>+ Add new card</Text>
                    </View>
                </TouchableOpacity>
            </RBSheet>
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
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: SIZES.large,
        backgroundColor: "#A4A5AA",
        borderRadius: 20
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
        alignItems: "center"
    }
})

export default SelectCard;

