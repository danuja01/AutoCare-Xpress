import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Dialog } from "@rneui/themed";
import { COLORS, FONT, SIZES } from "../../../constants";

const DialogBox = ({
  visible,
  setVisible,
  data,
  onPressAccept,
  onPressDecline,
}) => {
  return (
    <Dialog
      backdropStyle={styles.backdrop}
      overlayStyle={styles.overlay}
      visible={visible}
      onBackdropPress={() => setVisible(false)}
    >
      <Text style={styles.dialogTitle}>
        {"New Booking Request".toUpperCase()}
      </Text>

      {data.map((item, index) => (
        <View style={styles.dialogRow}>
          <View style={styles.dialogLabelContainer}>
            <Text style={styles.dialogLabel}>{item.label}</Text>
            <Text style={styles.dialogSeparator}>:</Text>
          </View>
          <Text style={styles.dialogText}>{item.desc}</Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={onPressAccept}
        style={[styles.btn, styles.acceptBtn]}
      >
        <Text style={styles.btnText}>Accept</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressDecline}
        style={[styles.btn, styles.rejectBtn]}
      >
        <Text style={styles.btnText}>Reject</Text>
      </TouchableOpacity>
    </Dialog>
  );
};

export default DialogBox;

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  overlay: {
    borderRadius: 20,
    width: "80%",
  },
  dialogTitle: {
    textTransform: "uppercase",
    fontFamily: FONT.semiBold,
    fontSize: SIZES.xLarge,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    paddingVertical: SIZES.small,
  },
  dialogRow: {
    flexDirection: "row",
    paddingHorizontal: SIZES.medium,
    alignItems: "center",
  },
  dialogLabelContainer: {
    flexDirection: "row",
    flex: 1,
  },
  dialogLabel: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: SIZES.small,
  },
  dialogSeparator: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    marginTop: SIZES.small,
  },
  dialogText: {
    fontSize: SIZES.medium,
    marginTop: SIZES.small,
  },
  btn: {
    paddingVertical: SIZES.medium,
    marginHorizontal: SIZES.medium,
    borderRadius: SIZES.medium,
    marginTop: SIZES.medium,
  },
  acceptBtn: {
    backgroundColor: COLORS.primary,
  },
  rejectBtn: {
    backgroundColor: COLORS.red,
  },
  btnText: {
    fontFamily: FONT.bold,
    fontSize: SIZES.medium,
    textAlign: "center",
    color: COLORS.white,
  },
});
