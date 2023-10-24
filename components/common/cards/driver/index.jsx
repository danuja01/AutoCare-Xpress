import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONT, SIZES, COLORS } from "../../../../constants";

const DriverCard = ({ _id, name, email}) => {

    return(
      <TouchableOpacity style={styles.card} onPress={() => {}}>
        <View style={styles.container}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.label}>Email</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>: {name}</Text>
            <Text style={styles.desc}>: {email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: SIZES.medium,
    fontFamily: FONT.extraBold,
    marginBottom: SIZES.xSmall * 0.5,
    marginTop: SIZES.xSmall * 0.3,
  },
  textContainer: {
    flex: 3,
    marginBottom:3
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginBottom: SIZES.xSmall * 0.5,
  },
  desc: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginTop: 1
  },
  card: {
    margin: 10
  }
});

export default DriverCard;