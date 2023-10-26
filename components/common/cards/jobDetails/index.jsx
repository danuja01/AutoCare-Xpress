import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FONT, SIZES, COLORS } from "../../../../constants";

const JobDetailsCard = ({ job, handleDelete }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => {}}>
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Vehicle No</Text>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.label}>Status</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>: {job.vehicleNumber}</Text>
          <Text style={styles.desc}>: {job.date}</Text>
          <Text style={styles.title}>: {job.time}</Text>
          <Text style={styles.title}>: {job.completionStatus}</Text>
        </View>
        <TouchableOpacity
          style={[{ position: "absolute", right: 5, bottom: 5, padding: 10 }]}
          onPress={() => {
            handleDelete();
          }}
        >
          <Text
            style={{
              color: COLORS.red,
            }}
          >
            delete
          </Text>
        </TouchableOpacity>
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
    flex: 2,
  },
  label: {
    fontSize: SIZES.medium,
    fontFamily: FONT.extraBold,
    marginBottom: SIZES.xSmall * 0.5,
    marginTop: SIZES.xSmall * 0.3,
  },
  textContainer: {
    flex: 3,
    marginBottom: 3,
  },
  title: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginBottom: SIZES.xSmall * 0.5,
    marginTop: SIZES.xSmall * 0.3,
  },
  desc: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    marginTop: 1,
  },
  card: {
    margin: 10,
  },
});

export default JobDetailsCard;
