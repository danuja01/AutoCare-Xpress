// ReviewPage Component
import React, { useRef, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import RawBottomSheet from "react-native-raw-bottom-sheet";
import StarRating from "react-native-star-rating";
import SectionCard from "../../components/rating/SectionCard";
import AutoMirajCard from "../../components/rating/AutoMirajCard";
import { FontFamily, Color, Border, FontSize } from "../../assets/GlobalStyles";
import { Stack, useLocalSearchParams } from "expo-router";
import { db } from "../../firebase/config";
import { ref, get, push, update } from "firebase/database";
import { remove } from "firebase/database";
import { RefreshControl } from "react-native-gesture-handler";

const ReviewPage = () => {
  const refRBSheet = useRef();
  const params = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const sid = params.id;

  const curId = "mzFjcH3K4AbrfeASY2sCkclMc4r1";

  const fetchReviews = async () => {
    try {
      const snapshot = await get(ref(db, `reviews/${sid}`));
      if (snapshot.exists()) {
        const reviewsData = snapshot.val();
        const reviewsArray = Object.entries(reviewsData).map(
          ([key, value]) => ({ ...value, id: key })
        );
        setReviews(reviewsArray);
        setTotalReviews(reviewsArray.length);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [sid]);

  const handleConfirm = async () => {
    if (sid && rating && review) {
      try {
        const reviewRef = ref(db, `reviews/${sid}`);
        const newReviewRef = push(reviewRef);

        setRating(0);
        setReview("");

        const userId = "mzFjcH3K4AbrfeASY2sCkclMc4r1";

        const date = new Date();
        const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
        const currentdate = `${month}/${day}/${year}`;
        console.log(currentdate);

        await update(newReviewRef, {
          rating: rating,
          review: review,
          addedDate: currentdate,
          userId: userId,
        }).then(() => {
          fetchReviews();
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const calculateAverageRating = () => {
    let total = 0;
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }
    return (total / reviews.length).toFixed(1);
  };

  const avgRating = calculateAverageRating();

  const deleteReview = async (reviewId) => {
    try {
      await remove(ref(db, `reviews/${sid}/${reviewId}`));

      console.log(`Review with ID ${reviewId} deleted successfully.`);
      console.log("Review ID:", reviewId);
      console.log(sid);
    } catch (error) {
      console.error(`Error deleting review with ID ${reviewId}:`, error);
    }
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    setTotalReviews(totalReviews - 1);
  };

  const handleUpdateReview = async (updatedRating, updatedReview, reviewId) => {
    try {
      await update(ref(db, `reviews/${sid}/${reviewId}`), {
        rating: updatedRating,
        review: updatedReview,
      }).then(() => {
        fetchReviews();
      });
      console.log(`Review with ID ${reviewId} updated successfully.`);
      console.log(rating);
      console.log(review);
    } catch (error) {
      console.error(`Error updating review with ID ${reviewId}:`, error);
    }
  };

  return (
    <View style={styles.reviewPage}>
      <Stack.Screen options={{ header: () => null }} />
      <TouchableOpacity
        style={styles.buttonframeParent}
        onPress={() => refRBSheet.current.open()}
      >
        <Text style={styles.confirm}>Add Review</Text>
      </TouchableOpacity>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              fetchReviews();
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 1000);
            }}
          />
        }
        style={styles.groupParent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.frameScrollViewContent}
      >
        <View style={styles.frameScrollViewContent}>
          {reviews.map((reviewData, index) => (
            <SectionCard
              key={index}
              reviewData={reviewData}
              onDelete={handleDeleteReview}
              deleteReview={deleteReview}
              onUpdate={handleUpdateReview}
            />
          ))}
        </View>
      </ScrollView>

      <RawBottomSheet ref={refRBSheet} height={400} closeOnDragDown={true}>
        <View style={styles.sheetContent}>
          <Text style={{ marginTop: 10, marginBottom: 5, fontWeight: "bold" }}>
            Rate your experience:
          </Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            selectedStar={(newRating) => {
              setRating(newRating);
            }}
            fullStarColor={"#FFD700"}
            containerStyle={styles.starRating}
          />
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Write your review:
          </Text>
          <TextInput
            style={styles.textInput}
            multiline={true}
            value={review}
            onChangeText={(text) => setReview(text)}
          />
          <TouchableOpacity
            style={styles.buttonframeParent1}
            onPress={handleConfirm}
          >
            <Text style={styles.confirm}>confirm</Text>
          </TouchableOpacity>
        </View>
      </RawBottomSheet>

      <View style={[styles.reviewPageChild, styles.groupParentPosition]} />
      <AutoMirajCard totalReviews={totalReviews} avgRating={avgRating} />
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonframeParent: {
    backgroundColor: "#023572",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    top: 225,
    width: 150,
    height: 40,
    left: 240,
  },
  buttonframeParent1: {
    backgroundColor: "#023572",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    top: 30,
    width: 150,
    height: 40,
    left: 3,
  },
  confirm: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  frameScrollViewContent: {
    flexDirection: "column",
    paddingBottom: 24,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  groupParentPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  sheetContent: {
    backgroundColor: "white",
    padding: 16,
    alignItems: "center",
  },
  starRating: {
    marginTop: 10,
    marginBottom: 15,
  },
  textInput: {
    width: "100%",
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    padding: 8,
    borderRadius: 15,
  },
  reviewPageChild: {
    marginTop: -426,
    marginLeft: -195.5,
    width: 392,
    height: 194,
    backgroundColor: Color.colorWhitesmoke_200,
  },
  reviewPage: {
    width: "100%",
    height: 852,
    overflow: "hidden",
    flex: 1,
    backgroundColor: Color.colorWhitesmoke_200,
  },
  buttonframeParent: {
    backgroundColor: "#023572",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: "center",
    top: 225,
    width: 150,
    height: 40,
    left: 240,
  },
  confirm: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  frameScrollViewContent: {
    flexDirection: "column",
    paddingBottom: 24,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  groupParentPosition: {
    left: "50%",
    top: "50%",
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    position: "absolute",
  },
  groupChild: {
    backgroundColor: Color.absoluteStaticWhiteS,
    borderRadius: Border.br_xl,
    left: 0,
    top: 0,
    height: 218,
    width: 354,
    position: "absolute",
  },
  groupWrapper: {
    left: 0,
    top: 0,
    height: 218,
    width: 354,
    position: "absolute",
  },
  groupItem: {
    top: 172,
    left: 238,
    width: 75,
    height: 15,
    position: "absolute",
  },
  profilepicChild: {
    left: -7,
    height: 44,
    width: 44,
    borderRadius: Border.br_xl,
    top: 0,
    position: "absolute",
  },
  profilepic: {
    width: 47,
    height: 48,
  },
  oshadaThawalampola: {
    fontSize: FontSize.size_xs,
    height: 14,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 0,
    width: 131,
    top: 0,
  },
  text: {
    top: 14,
    left: 2,
    fontSize: FontSize.size_5xs,
    color: Color.colorGray_100,
    height: 10,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    width: 44,
  },
  oshadaThawalampolaParent: {
    height: 24,
    width: 131,
  },
  profilepicParent: {
    left: 7,
    flexDirection: "row",
    alignItems: "center",
    top: 0,
    position: "absolute",
  },
  loremIpsumDolor: {
    top: 55,
    fontSize: FontSize.size_2xs,
    height: 112,
    color: Color.colorBlack,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    left: 0,
    width: 313,
  },
  groupView: {
    top: 16,
    left: 20,
    height: 187,
    width: 313,
    position: "absolute",
  },
  groupContainer: {
    marginTop: 16,
    height: 218,
    width: 354,
  },
  groupParent: {
    top: 250,
    left: 35,
    marginBottom: 240,
  },
});

export default ReviewPage;
