import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Card } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

function CartCounter(props) {
  return (
    <Card containerStyle={styles.counterCard}>
      <View style={styles.itemCounterView}>
        <TouchableOpacity onPress={props.incrementCart}>
          <View style={styles.incrementData}>
            <Image
              style={styles.addMore}
              source={require("../../assets/roomService/increment.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.cartDecrement}>
          <View style={styles.decrementData}>
            <Image
              style={styles.decrease}
              source={require("../../assets/roomService/decrement.png")}
            />
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  counterCard: {
    elevation: 10,
    height: moderateScale(48),
    width: moderateScale(109),
    alignSelf: "flex-end",
    justifyContent: "center",
    bottom: moderateScale(15),

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
  incrementData: {
    padding: moderateScale(3),
    borderRightWidth: 0.4,
    borderLeftColor: "lightgrey",
    width: moderateScale(53),
  },
  decrementData: {
    padding: moderateScale(3),
    borderLeftWidth: 0.4,
    borderLeftColor: "lightgrey",
    width: moderateScale(53),
  },
  addMore: {
    height: moderateScale(35),
    width: moderateScale(35),
    // marginRight: moderateScale(20),
    left: moderateScale(5),
    marginTop: moderateScale(1.5),
  },
  decrease: {
    height: moderateScale(35),
    width: moderateScale(25),
    // marginLeft: moderateScale(11),
    left: moderateScale(9),
    marginTop: moderateScale(1),
  },
  heightView: {
    right: moderateScale(4),
    height: moderateScale(43),
    width: moderateScale(1),
    backgroundColor: "lightgrey",
  },
  itemCounterView: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
export default CartCounter;
