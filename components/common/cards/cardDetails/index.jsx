    import React from "react";
    import { Text, View, TouchableOpacity, StyleSheet , Alert } from "react-native";
    import { COLORS } from "../../../../constants";

    const CardDetailsCard = ({ cardData }) => {

            // Function to mask card number
            const maskCardNumber = (cardNumber) => {
                const maskedPart = '*'.repeat(cardNumber.length - 4); // Replace all but the last 4 characters with stars
                const lastFour = cardNumber.slice(-4); // Get the last 4 characters
                return maskedPart + lastFour;
            };
        
            const maskedCardNo = maskCardNumber(cardData.cardNumber);

            const handleCardClick = () => {
                Alert.alert('Payment Successful', 'Your payment has been successfully done.');
              };

        return (
            <TouchableOpacity style={styles.cardContainer} onPress={handleCardClick}>
                <View style={styles.card}>
                    <View style={styles.cardView}>
                        <Text style={[styles.holderNameSize, styles.cardText]}>{cardData.holdersName}</Text>
                        <Text style={[styles.cardNoSize, styles.cardText]}>{maskedCardNo}</Text>
                    </View>
                    <View style={styles.cardView}>
                        <Text style={[styles.cardTypeSize, styles.cardText]}>VISA</Text>
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
    });

    export default CardDetailsCard;
