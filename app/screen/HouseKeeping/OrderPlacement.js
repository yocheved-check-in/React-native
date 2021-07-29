import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";
import { Card } from "react-native-elements";
import FabIcon from "../../component/FabIcon";
import CartCounter from "../../component/RoomService/CartCounter";
import OrderPlacementScreen from "../../component/OrderPlacementScreenComponent";

function OrderPlacement(props) {
  const [houseKeepingData, setHouseKeepingData] = useState(
    props.houseKeepingCart
  );

  const handleNextButton = () => {
    navigation.navigate("HouseKeepingOrderSummary");
  };

  useFocusEffect(
    React.useCallback(() => {
      let data = [...props.houseKeepingCart];

      setHouseKeepingData(data);
    }, [])
  );

  const incrementCartProduct = (item) => {
    var houseKeepingCart = props.houseKeepingCart;
    const index = houseKeepingCart.indexOf(item);
    if (houseKeepingCart[index].quantity > 0) {
      houseKeepingCart[index].quantity += 1;
      let price =
        Number(houseKeepingCart[index].price) *
        Number(houseKeepingCart[index].quantity);
      houseKeepingCart[index].calculatePrice = price;
    }
    setHouseKeepingData((houseKeepingData) => [...houseKeepingCart]);
    props.cartChange(houseKeepingCart);
  };

  //remove Item to Cart
  const decrementCartProduct = (item) => {
    var houseKeepingCart = props.houseKeepingCart;
    const index = houseKeepingCart.indexOf(item);
    if (houseKeepingCart[index].quantity > 1) {
      houseKeepingCart[index].quantity -= 1;
      let price =
        Number(houseKeepingCart[index].price) *
        Number(houseKeepingCart[index].quantity);
      houseKeepingCart[index].calculatePrice = price;
    }
    const isCartEmpty = houseKeepingCart.every(
      (item1) => item1.quantity === null || item1.quantity === 0
    );
    setHouseKeepingData((houseKeepingData) => [...houseKeepingCart]);
    props.cartChange(houseKeepingCart);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />
      <TopHeader
        title={"HOUSEKEEPING"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        style={styles.header}
        logoImage={require("../../assets/TopHeader/spa1.png")}
        type={CATEGORY.SPA}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
        <View style={{ flex: 0.5 }}>
          <View style={styles.selectView}>
            <Text style={styles.allPackage}>My order</Text>
          </View>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={props.houseKeepingCart}
            renderItem={({ item, index }) => {
              if (item.quantity >= 1) {
                return (
                  <OrderPlacementScreen
                    ItemName={item.item_name}
                    Quantity={item.quantity}
                    Price={
                      item.calculatePrice ? item.calculatePrice : item.price
                    }
                    incrementCartQuantity={() =>
                      incrementCartProduct(item, index)
                    }
                    decrementCartQuantity={() =>
                      decrementCartProduct(item, index)
                    }
                  />
                );
              }
            }}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.orderText}>
            would you like to add another service to your order?
          </Text>
          <View style={styles.footerStyle}>
            <TouchableOpacity
              style={styles.touchableOpacityStyle}
              onPress={() => navigation.navigate("HouseKeepingAllPackages")}
            >
              <Text style={styles.btnText}>Yes,back to all services</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNextButton()}
              style={styles.nextButton}
            >
              <Text style={{ color: "white" }}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-start",
            marginTop: moderateScale(15),
            // top: 40,
          }}
        >
          <FabIcon
            image={require("../../assets/fabIcon/room.png")}
            name={"room"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  btnText: {
    color: colors.primary,
    textDecorationLine: "underline",
  },
  quantityText: {
    color: colors.primary,
  },
  itemPrice: {
    color: colors.darkGray,
  },
  orderText: {
    textAlign: "center",
    margin: "5%",
  },
  selectView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    alignSelf: "center",
    marginTop: "5%",
    marginBottom: "4%",
  },
  allPackage: {
    color: colors.spaTextColor,
    fontSize: moderateScale(14),
    left: moderateScale(14),
  },
  QuestionCard: {
    elevation: 6,
    width: moderateScale(335),
    alignSelf: "center",
    height: moderateScale(80),
    borderRadius: 10,
  },
  nameText: {
    color: colors.darkGray,
    fontSize: moderateScale(15),
    marginTop: moderateScale(2),
    fontFamily: "Roboto-Regular",
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  footerStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touchableOpacityStyle: {
    alignSelf: "center",
    justifyContent: "center",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_HOUSE_CART",
        payload: cart,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    houseKeepingCart: state.houseKeepingCart,
    houseKeepingData: state.houseKeepingData,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderPlacement);
