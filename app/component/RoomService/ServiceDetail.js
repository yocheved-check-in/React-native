import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";

import colors from "../../config/colors";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import CartCounter from "./CartCounter";

function ServiceDetail(props) {
  return (
    <Card containerStyle={styles.orderNameCard}>
      <Image style={styles.cardImage} source={props.foodImage} />
      <View style={styles.orderPriceView}>
        <Text style={styles.deliveryText}>
          ${props.price}| 24 min |{props.heart}
        </Text>
        <Image
          style={styles.ratingIcon}
          source={require("../../assets/roomServiceDetail/Rating-icon.png")}
        />
      </View>
      <View style={styles.pizzaView}>
        <View style={{ width: moderateScale(145) }}>
          <Text style={styles.pizzaText}>
            {props.foodName}
            <Text style={{ color: colors.primary }}>
              <Text style={{ color: colors.primary }}>
                {" "}
                {props.showQuantity}{" "}
              </Text>
              {props.quantity}
              {"\n"}

              <Text numberOfLines={1} style={styles.descriptionText}>
                {props.description}
              </Text>
            </Text>
          </Text>
        </View>

        <View style={styles.containerCard}>
          <CartCounter
            incrementCart={props.incrementProductQuantity}
            cartDecrement={props.decrementProductQuantity}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  descriptionText: {
    color: "grey",
    fontSize: 13,
  },

  orderPriceView: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  orderNameCard: {
    elevation: 6,
    borderRadius: 3,
    paddingTop: moderateScale(20),
    width: moderateScale(330),
    alignSelf: "center",
  },
  buttonCard: {
    elevation: 6,
    borderRadius: 3,
    width: moderateScale(330),
    alignSelf: "center",
  },
  containerCard: {
    elevation: 6,
    width: moderateScale(120),
    alignSelf: "flex-end",
    padding: 7,
    left: moderateScale(8),
    top: moderateScale(20),
  },
  pizzaText: {
    textAlign: "left",
    fontSize: 14,
    marginTop: moderateScale(20),
    top: moderateScale(12),
    fontWeight: "bold",
    color: colors.black,
  },
  ratingIcon: {
    height: moderateScale(14),
    width: moderateScale(14),
    alignSelf: "center",
    top: moderateScale(23),
    left: moderateScale(-10),
  },
  deliveryText: {
    textAlign: "right",
    fontSize: 14,
    color: colors.black,
    top: moderateScale(24),
    right: moderateScale(9),
  },
  pizzaView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: moderateScale(290),
    marginTop: moderateScale(9),
    alignSelf: "center",
  },
  thickButton: {
    width: moderateScale(90),
    alignItems: "center",
    padding: 7,
  },
  thinButton: {
    borderRadius: 5,
    width: moderateScale(90),
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    padding: 7,
  },
  textThick: {
    color: colors.black,
  },
  textThin: {
    color: colors.primary,
  },
  cardImage: {
    height: moderateScale(220),
    width: moderateScale(220),
    marginRight: moderateScale(10),
    borderRadius: moderateScale(110),
    alignSelf: "center",
    resizeMode: "cover",
  },
});
export default ServiceDetail;
