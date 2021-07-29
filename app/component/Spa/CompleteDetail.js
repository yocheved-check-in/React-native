import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import colors from "../../config/colors";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import CartContainer from "../../component/RoomService/CartCounter";

function CompleteDetail(props) {
  return (
    <View>
      <Card containerStyle={styles.cardStyle}>
        <Image style={styles.cardImage} source={props.image}></Image>
        <View style={styles.orderView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.deliveryTitleText}>
              {props.name}{" "}
              <Text style={styles.QuantityText}>
                {""}
                <Text>{props.showQuantity}</Text> {props.quantity}
              </Text>
            </Text>

            <Text style={styles.priceText}>${props.price}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={styles.descriptionText}>{props.description}</Text>

            <View style={{ marginTop: 10 }}>
              <CartContainer
                incrementCart={props.incrementCart}
                cartDecrement={props.cartDecrement}
              />
            </View>
          </View>
        </View>

        <View style={styles.descriptionView}></View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: "center",
  },
  cardStyle: {
    elevation: 10,
    borderRadius: 5,
    alignSelf: "center",
    paddingTop: "-12%",
    width: moderateScale(330),
    marginHorizontal: moderateScale(20),
    marginBottom: "3%",
    paddingBottom: "6%",
  },
  cardImage: {
    height: moderateScale(180),
    width: moderateScale(330),
    alignSelf: "center",
    resizeMode: "cover",
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
  },
  orderView: {
    justifyContent: "space-between",
    top: moderateScale(8),
  },
  deliveryTitleText: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.darkGray,
    alignSelf: "center",
    width: "75%",
    fontFamily: "Roboto-Regular",
  },
  QuantityText: {
    fontSize: moderateScale(15),
    color: colors.primary,
    paddingTop: moderateScale(100),
  },
  priceText: {
    fontSize: moderateScale(14),
    color: colors.darkGray,
  },
  descriptionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    top: moderateScale(10),
  },
  descriptionText: {
    color: colors.lightgray,
    fontSize: 12,
    width: "57%",
    fontFamily: "Roboto-Regular",
  },
  ItemCounter: {
    flexDirection: "row",
    paddingHorizontal: 7,
    justifyContent: "space-between",
  },
  AddMore: {
    height: moderateScale(20),
    width: moderateScale(20),
    top: moderateScale(8),
    alignSelf: "center",
    justifyContent: "center",
  },
  Decrease: {
    height: moderateScale(30),
    width: moderateScale(20),
    top: moderateScale(8),
  },
  HeightView: {
    height: moderateScale(50),
    width: moderateScale(1),
    backgroundColor: "lightgrey",
  },
  smallCardView: {
    height: moderateScale(52),
    width: moderateScale(120),
    elevation: 10,
    alignSelf: "flex-end",
    paddingTop: 0,
  },
});
export default CompleteDetail;
