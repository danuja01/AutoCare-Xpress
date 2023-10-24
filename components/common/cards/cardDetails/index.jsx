import React, { useRef, useState } from "react";
import {Text, View, TouchableOpacity, StyleSheet } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../../../../constants";

const CardDetailsCard = ({ holdersName, cardNo, cardType}) => {

    // Function to mask card number
    const maskCardNumber = (cardNumber) => {
        const maskedPart = '*'.repeat(cardNumber.length - 4); // Replace all but the last 4 characters with stars
        const lastFour = cardNumber.slice(-4); // Get the last 4 characters
        return maskedPart + lastFour;
    };

    const maskedCardNo = maskCardNumber(cardNo);

    return(
        <TouchableOpacity style={[styles.cardContainer]}>
                <View style={[styles.card]}>
                    <View style={[styles.cardView]}>
                        <Text style={[styles.holderNameSize, styles.cardText]}>{holdersName}</Text>
                        <Text style={[styles.cardNoSize, styles.cardText]}>{maskedCardNo}</Text>
                    </View>
                    <View style={[styles.cardView]}>
                        <Text style={[styles.cardTypeSize, styles.cardText]}>{cardType}</Text>
                    </View>
                </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        margin: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        backgroundColor: COLORS.primary
    },
    cardView: {
        margin: 10,
    },
    cardText: {
        color: COLORS.white
    },
    holderNameSize: {
        fontSize: 16,
    },
    cardNoSize: {
        fontSize: 16
    },
    cardTypeSize: {
        fontSize: 16
    }
})

export default CardDetailsCard;