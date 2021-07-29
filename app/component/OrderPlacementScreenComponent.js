import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
import CartCounter from "./RoomService/CartCounter";
import colors from "../config/colors";

function OrderPlacementScreen(props) {
  return (
    <Card containerStyle={styles.QuestionCard}>
      <View style={{ flexDirection: "row" }}>
        <Text numberOfLines={1} style={styles.nameText}>
          {props.ItemName}
        </Text>
        <Text style={styles.quantityText}>
          <Text style={{ color: colors.primary, fontSize: 17 }}> x</Text>
          {props.Quantity}
        </Text>
      </View>
      <Text style={styles.itemPrice}>
        {props.Price == 0 ? (
          "free"
        ) : (
          <Text>${parseFloat(props.Price).toFixed(2)}</Text>
        )}
      </Text>
      <View style={styles.cartContainer}>
        <CartCounter
          incrementCart={props.incrementCartQuantity}
          cartDecrement={props.decrementCartQuantity}
        />
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  QuestionCard: {
    elevation: 6,
    width: moderateScale(335),
    alignSelf: "center",
    height: moderateScale(80),
    borderRadius: 10,
  },
  quantityText: {
    color: colors.primary,
  },
  itemPrice: {
    color: colors.darkGray,
  },
  nameText: {
    color: colors.darkGray,
    fontSize: moderateScale(15),
    marginTop: moderateScale(2),
    fontFamily: "Roboto-Regular",
    width: 100,
  },
  cartContainer: {
    bottom: moderateScale(43),
  },
});
export default OrderPlacementScreen;
