import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";
import CartCounter from "./RoomService/CartCounter";
import colors from "../config/colors";

function OrderPlacementScreen(props) {
  return (
    <Card containerStyle={styles.QuestionCard}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Text style={styles.nameText}>{props.name}</Text>
        <Text style={styles.quantityText}>
          <Text style={styles.increseQuan}> x</Text>
          {item.quantity}
        </Text>
      </View>
      <Text style={styles.itemPrice}>
        {item.calculatePrice ? (
          <Text>${parseFloat(item.calculatePrice).toFixed(2)}</Text>
        ) : item.price == 0 ? (
          "free"
        ) : (
          <Text>${parseFloat(item.price).toFixed(2)}</Text>
        )}
      </Text>
      <View
        style={{
          bottom: moderateScale(45),
        }}
      >
        <CartCounter
          incrementCart={() => incrementCartProduct(item, index)}
          cartDecrement={() => decrementCartProduct(item, index)}
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
    backgroundColor: "red",
  },
  nameText: {
    fontSize: moderateScale(15),
    marginTop: moderateScale(2),
    fontFamily: "Roboto-Regular",
  },
  increseQuan: {
    color: colors.primary,
    fontSize: 17,
  },
});
export default OrderPlacementScreen;
