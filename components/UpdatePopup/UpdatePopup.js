import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Color, FontSize, FontFamily, Border } from "../../assets/GlobalStyles";

const UpdatePopup = ({ onUpdate, onCancel, currentRating, currentReview, setUpdatedRating, setUpdatedReview }) => {
  const handleUpdate = () => {
    onUpdate();
  };

  return (
    <View style={styles.popupContainer}>
      <Text style={styles.popupTitle}>Update Review</Text>

      <Text style={styles.popupLabel}>Rate your experience:</Text>
      <TextInput
        style={styles.popupInput}
        keyboardType="numeric"
        value={currentRating ? String(currentRating) : ''}
        onChangeText={(text) => setUpdatedRating(Number(text))}
      />

      <Text style={styles.popupLabel}>Write your review:</Text>
      <TextInput
        style={styles.popupInput}
        multiline={true}
        value={currentReview}
        onChangeText={(text) => setUpdatedReview(text)}
      />

      <TouchableOpacity style={styles.popupButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.popupButton} onPress={onCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: 300,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  popupLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  popupInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  popupButton: {
    backgroundColor: "#023572",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UpdatePopup;
