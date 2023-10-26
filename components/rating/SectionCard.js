import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { FontFamily, Color, Border, FontSize } from "../../assets/GlobalStyles";
import DeletePopup from "../popup/popup";
import UpdatePopup from "../UpdatePopup/UpdatePopup";
import Modal from 'react-native-modal';

const SectionCard = ({ reviewData, onDelete, deleteReview, onUpdate }) => {
  const stars = Array.from({ length: reviewData.rating }, (_, index) => index);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(reviewData.rating);
  const [updatedReview, setUpdatedReview] = useState(reviewData.review);

  const curId = "mzFjcH3K4AbrfeASY2sCkclMc4r1";

  const handleDelete = async () => {
    try {
      await deleteReview(reviewData.id);
      onDelete(reviewData.id);
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await onUpdate(updatedRating, updatedReview, reviewData.id);
      setShowUpdatePopup(false);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <View style={styles.groupParent}>
      <View style={styles.groupWrapper}>
        <View style={styles.groupChild} />
      </View>
      <View style={styles.groupContainer}>
        <View style={styles.profilepicParent}>
          <View style={styles.profilepic}>
            <Image
              style={styles.profilepicChild}
              source={require("../../assets/images/locationrating/rectangle-2.png")}
            />
          </View>
          <View style={styles.oshadaThawalampolaParent}>
            <Text style={[styles.oshadaThawalampola, styles.textTypo]}>
              Oshada Thawalampola
            </Text>
            {curId === reviewData.userId && (
                <>
                  <TouchableOpacity onPress={() => setShowDeletePopup(true)} style={[styles.deletebtn]}>
                    <Text style={[styles.deletetext]}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowUpdatePopup(true)} style={[styles.updatebtn]}>
                    <Text style={[styles.updatetext]}>Update</Text>
                  </TouchableOpacity>
                </>
              )}
            <Text style={[styles.text, styles.textTypo]}>{reviewData.addedDate}</Text>
          </View>
        </View>
        <Text style={[styles.loremIpsumDolor, styles.textTypo]}>
          {reviewData.review}
        </Text>
        <View style={styles.ratingStars}>
          {stars.map((_, index) => (
            <Image
              key={index}
              style={styles.starIcon}
              source={require("../../assets/images/locationrating/star.png")}
            />
          ))}
        </View>
      </View>

      {showDeletePopup && (
        <DeletePopup
          onDelete={async () => {
            await handleDelete();
            setShowDeletePopup(false);
          }}
          onCancel={() => setShowDeletePopup(false)}
        />
      )}

      <Modal isVisible={showUpdatePopup}>
      <View style={styles.modalContainer}>
        <UpdatePopup
          onUpdate={handleUpdate}
          onCancel={() => setShowUpdatePopup(false)}
          currentRating={updatedRating}
          currentReview={updatedReview}
          setUpdatedRating={setUpdatedRating}
          setUpdatedReview={setUpdatedReview}
        />
      </View>
    </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updatebtn:{
    top: 120,
    left: 20,
    backgroundColor: "#023572",
    borderRadius: 15,
    alignItems: "center",
    width: 70,
    height: 30,
  },
  updatetext:{
    fontSize: 12,
    color: Color.colorWhitesmoke_100,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "700",
    top: 8,
  },
  deletebtn:{
    top: 150,
    left: -60,
    backgroundColor: "#023572",
    borderRadius: 15,
    alignItems: "center",
    width: 70,
    height: 30,
  },
  deletetext:{
    fontSize: 12,
    color: Color.colorWhitesmoke_100,
    textAlign: "left",
    fontFamily: FontFamily.interMedium,
    fontWeight: "700",
    top: 8,
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
    position: "absolute",
    height: 218,
    width: 354,
  },
  groupWrapper: {
    left: 0,
    top: 0,
    position: "absolute",
    height: 218,
    width: 354,
  },
  groupItem: {
    top: 155,
    left: 238,
    width: 35,
    height: 35,
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
    width: 46,
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
  groupContainer: {
    top: 16,
    left: 20,
    height: 187,
    width: 313,
    position: "absolute",
  },
  groupParent: {
    height: 218,
    width: 354,
    marginTop: 16,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingStars: {
    flexDirection: 'row',
    marginTop: 10,
    left:220,
    top: 155,
  },
});

export default SectionCard;
