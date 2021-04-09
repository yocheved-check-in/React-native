import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import NumericInput from "react-native-numeric-input";
import colors from "../config/colors";
import { FontAwesome as Icon } from "@expo/vector-icons";

function CartItem({ item, update }) {
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    console.log(item);
    setPrice(item.price);
    console.log(price);
    setAmount(item.amount);
  }, []);

  const amountChange = (value) => {
    console.log("value " + value);
    setAmount(value);
    item.amount = value;
    update();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Icon
          name="times-circle"
          size={25}
          color={colors.primary}
          style={styles.xButton}
        />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image}></Image>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.innerTextContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}> {amount * price + "$"} </Text>
        </View>

        <NumericInput
          value={amount}
          initValue={amount}
          minValue={1}
          type="up-down"
          totalWidth={70}
          onChange={(value) => amountChange(value)}
          upDownButtonsBackgroundColor={colors.primary}
          leftButtonBackgroundColor="#E56B70"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.lightGray,
    height: 130,
    borderRadius: 15,
    borderColor: colors.mediumGray,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    top: 40,
  },
  innerTextContainer: {
    flexDirection: "column",
    margin: 10,
    marginRight: 10,
    justifyContent: "space-evenly",
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },

  imageContainer: {
    margin: 10,
    marginLeft: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.primary,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
  },
  xButton: {
    position: "absolute",
    top: -8,
    left: -8,
  },
});
export default CartItem;
