import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { Card } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
import CartCounter from "./CartCounter";

function RoomServiceCourse(props) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={props.onPressCard}>
      <Card containerStyle={styles.containerCard}>
        <View style={styles.cardView}>
          <Image style={styles.cardImage} source={props.foodImage} />

          <View style={styles.nameContainer}>
            <Text style={styles.foodNameText}>
              {props.foodName}{" "}
              <Text style={styles.quantity}>{props.showQuantity}</Text>{" "}
              <Text style={styles.quantity}>{props.quantity}</Text>
            </Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
              {props.description}
            </Text>
            <TouchableOpacity onPress={props.onArrowPress}>
              <Image
                style={styles.blueArrowImage}
                source={require("../../assets/roomService/arrow.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ratingView}>
          <Text style={styles.priceText}>
            $ {props.foodPrice} | 34-40 min |{" "}
          </Text>
          <View style={styles.viewStyle}>
            <Image
              style={styles.ratingImage}
              source={require("../../assets/roomService/Rating-icon.png")}
            />
          </View>

          <CartCounter
            incrementCart={props.incrementCartQuantity}
            cartDecrement={props.decrementCartQuantity}
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  nameContainer: {
    marginHorizontal: moderateScale(10),
    width: moderateScale(175),
    marginTop: moderateScale(13),
  },
  ratingText: {
    top: moderateScale(27),
    right: moderateScale(10),
  },
  viewStyle: {
    alignItems: "center",
    alignSelf: "center",
    right: moderateScale(12),
  },
  containerCard: {
    shadowColor: "#000",
    elevation: 9,
    height: moderateScale(240),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    alignSelf: "center",
    width: moderateScale(335),
  },
  ratingView: {
    flexDirection: "row",
    top: moderateScale(11),
    width: moderateScale(239),
  },
  quantity: {
    color: colors.primary,
    fontSize: 20,
    fontSize: 17,
    paddingLeft: 10,
  },
  priceText: {
    fontSize: 12,
    width: "60%",
    marginTop: moderateScale(20),
    top: moderateScale(8),
    marginLeft: moderateScale(9),
    fontFamily: "Roboto-Light",
    color: "#3C3C3C",
  },
  cardImage: {
    resizeMode: "contain",
    height: moderateScale(130),
    width: moderateScale(130),
    borderRadius: moderateScale(65),
    margin: 0,
    alignSelf: "flex-start",
    marginTop: moderateScale(14),
    resizeMode: "cover",
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: moderateScale(300),
  },
  foodNameText: {
    fontSize: moderateScale(16),
    color: colors.black,
    paddingRight: 10,
    fontFamily: "Roboto-Regular",
  },
  ratingImage: {
    height: moderateScale(14),
    width: moderateScale(14),
    alignSelf: "center",
    top: 5,

    right: moderateScale(20),
  },
  blueArrowImage: {
    height: moderateScale(25),
    width: moderateScale(25),
    alignSelf: "flex-end",
    right: moderateScale(11),
    marginTop: moderateScale(30),
  },
  descriptionText: {
    color: colors.lightgray,
    fontSize: moderateScale(12.3),
    width: "90%",
    fontFamily: "Roboto-Regular",
  },
});
export default RoomServiceCourse;
