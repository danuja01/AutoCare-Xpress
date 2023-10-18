import { View, Text } from "react-native";
import styles from "./rating.style";
import { Rating } from "react-native-stock-star-rating";
import { COLORS, SIZES } from "../../../constants";
import { TouchableOpacity } from "react-native";

const RatingPanel = ({ rating, totalRatings }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{totalRatings}/5</Text>
        <Text style={styles.totalRatings}> | 143 Total Ratings</Text>
      </View>
      <Rating
        stars={rating}
        maxStars={5}
        size={SIZES.large}
        color={COLORS.black}
      />
    </TouchableOpacity>
  );
};

export default RatingPanel;
