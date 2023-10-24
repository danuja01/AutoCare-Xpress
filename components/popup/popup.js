import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const DeletePopup = ({ onDelete, onCancel }) => {
  return (
    <Modal transparent={true} visible={true}>
      <View style={styles.popup}>
        <View style={styles.popupContent}>
          <Text style={styles.popupText}>Are you sure you want to delete this review?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popup: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  popupText: {
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  deleteButton: {
    backgroundColor: "#023572",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#023572",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DeletePopup;
