  import React, { useRef, useState , useEffect} from "react";
  import { ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput, Button } from "react-native";
  import RawBottomSheet from "react-native-raw-bottom-sheet";
  import StarRating from "react-native-star-rating";
  import SectionCard from "../../components/rating/SectionCard";
  import AutoMirajCard from "../../components/rating/AutoMirajCard";
  import { FontFamily, Color, Border, FontSize } from "../../assets/GlobalStyles";
  import { Stack, useLocalSearchParams } from "expo-router";
  import { db } from "../../firebase/config";
  import { ref, get ,push , update} from "firebase/database";


  const ReviewPage = () => {
    const refRBSheet = useRef();
    const params = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);

    const sid = params.id;
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const snapshot = await get(ref(db, `reviews/${sid}`));
          if (snapshot.exists()) {
            const reviewsData = snapshot.val();
            const reviewsArray = Object.values(reviewsData);
            setReviews(reviewsArray);
            console.log("Fetched Reviews:", reviewsArray);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      fetchReviews();
    }, [sid]);

    const handleConfirm = () => {
      if (sid && rating && review) {
        try {
          const reviewRef = ref(db, `reviews/${sid}`);
          const newReviewRef = push(reviewRef);

          setRating(0);
          setReview("");

          update(newReviewRef, {
            rating: rating,
            review: review,
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    return (
      <View style={styles.reviewPage}>
        <TouchableOpacity style={styles.buttonframeParent} onPress={() => refRBSheet.current.open()}>
          <Text style={styles.confirm}>Add Review</Text>
        </TouchableOpacity>

        <ScrollView style={[styles.groupParent]} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.frameScrollViewContent}>
        <View style={styles.frameScrollViewContent}>
          {reviews.map((reviewData, index) => (
            <SectionCard key={index} reviewData={reviewData} />
          ))}
        </View>
        </ScrollView>

        <RawBottomSheet ref={refRBSheet} height={400} closeOnDragDown={true}>
          <View style={styles.sheetContent}>
            <Text style={{marginTop: 10, marginBottom: 5, fontWeight: 'bold'}}>Rate your experience:</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={rating}
              selectedStar={(newRating) => {
                setRating(newRating);
              }}
              fullStarColor={'#FFD700'}
              containerStyle={styles.starRating}
            />
            <Text style={{ marginTop: 10, fontWeight: 'bold'}}>Write your review:</Text>
            <TextInput
              style={styles.textInput}
              multiline={true}
              value={review}
              onChangeText={(text) => setReview(text)}
            />
            <TouchableOpacity style={styles.buttonframeParent1} onPress={handleConfirm}>
              <Text style={styles.confirm}>confirm</Text>
            </TouchableOpacity>
          </View>
        </RawBottomSheet>

        <View style={[styles.reviewPageChild, styles.groupParentPosition]} />
        <AutoMirajCard />
        <View></View>
      </View>
    );
  }


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
      width: '100%',
      height: 100,
      borderColor: 'gray',
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
    sheetContent: {
      backgroundColor: "white",
      padding: 16,
      alignItems: "center",
    },
    buttonframeParent: {
      backgroundColor: "#023572", // Example background color (change to your desired color)
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 15,
      alignItems: "center",
      top: 225,
      width: 150, // Adjust the width
      height: 40, // Adjust the height
      left: 240,
    },
    confirm: {
      color: "#FFFFFF", // Example text color (change to your desired color)
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
      top:250,
      left: 35,
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
  });

  export default ReviewPage;
