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
import { useFocusEffect } from "@react-navigation/native";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import FabIcon from "../../component/FabIcon";
import CartCounter from "../../component/RoomService/CartCounter";
import { useNavigation } from "@react-navigation/native";
import OrderPlacementScreen from "../../component/OrderPlacementScreenComponent";

function RoomOrderPlacement(props) {
  const [roomServiceData, setRoomServiceData] = useState(props.roomServiceData);
  const [tipData, setTipData] = useState(0);
  navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      let data = [...props.roomServiceData];
      setRoomServiceData(data);
    }, [])
  );

  const extrasSum = () => {
    let sum = 0;
    for (let i = 0; i < props.roomServiceCart.length; i++) {
      if (props.roomServiceCart[i].calculatePrice) {
        sum = sum + Number(props.roomServiceCart[i].calculatePrice);
      } else {
        sum = sum + Number(props.roomServiceCart[i].price);
      }
    }
    sum = sum + tipData;
    return sum;
  };

  const handleNextButton = () => {
    navigation.navigate("OrderSummary", {
      isRoomService: true,
      tipDataText: tipData,
    });
  };

  const incrementCounter = () => setTipData(tipData + 1);
  const decrementCounter = () => {
    if (tipData > 0) {
      setTipData(tipData - 1);
    }
  };

  const incrementCartProduct = (item) => {
    var roomServiceCart = props.roomServiceCart;
    const index = roomServiceCart.indexOf(item);
    if (index == -1) {
      item["quantity"] = 1;
      roomServiceCart.push(item);
    } else {
      roomServiceCart[index].quantity += 1;
      let price =
        Number(roomServiceCart[index].price) *
        Number(roomServiceCart[index].quantity);
      roomServiceCart[index].calculatePrice = price;
      roomServiceCart[index].extraItem = [];
    }

    setRoomServiceData((roomServiceData) => [
      ...roomServiceData,
      { ...roomServiceData.items, ...roomServiceCart },
    ]);

    props.cartChange(roomServiceCart);
  };

  const decrementCartProduct = (item) => {
    var roomServiceCart = props.roomServiceCart;
    const index = roomServiceCart.indexOf(item);
    if (roomServiceCart[index].quantity > 1) {
      roomServiceCart[index].quantity -= 1;
      let price =
        Number(roomServiceCart[index].price) *
        Number(roomServiceCart[index].quantity);
      roomServiceCart[index].calculatePrice = price;
    }
    const isCartEmpty = roomServiceCart.every(
      (item1) => item1.quantity === null || item1.quantity === 0
    );

    setRoomServiceData((roomServiceData) => [
      ...roomServiceData,
      { ...roomServiceData.items, ...roomServiceCart },
    ]);
    props.cartChange(roomServiceCart);
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
        title={"ROOM SERVICE"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        style={styles.header}
        logoImage={require("../../assets/TopHeader/room_service_icone.png")}
        type={CATEGORY.ROOM_SERVICE}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <View style={styles.CardView}>
        <View style={{ flex: 0.7 }}>
          <View style={styles.selectView}>
            <Text style={styles.allPackage}>My order</Text>
          </View>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={props.roomServiceCart}
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
          <Card containerStyle={styles.totalPriceCard}>
            <View style={styles.totalPriceView}>
              <Text style={styles.totalText}>Total </Text>
              <Text style={styles.quantityText}>
                <Text style={styles.totalPriceText}> = ${extrasSum()}</Text>
              </Text>
            </View>
            <Text style={styles.tipText}>Would you like to add a tip?</Text>
            <Text style={styles.tipPrice}>{tipData}$</Text>
            <View style={styles.cardCounterView}>
              <CartCounter
                incrementCart={() => incrementCounter()}
                cartDecrement={() => decrementCounter()}
              />
            </View>
          </Card>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.orderText}>
            Would you like to add another dish to your order?
          </Text>
          <View style={styles.bottomButton}>
            <TouchableOpacity
              style={styles.touchableOpacityStyle}
              onPress={() => navigation.navigate("RoomServiceScreen")}
            >
              <Text style={styles.btnText}>Yes,back to menu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNextButton()}
              style={styles.nextButton}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.fabIconContainer}>
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
    color: "#3C3C3C",
    fontSize: 13,
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
    borderRadius: 7,
  },
  totalPriceCard: {
    borderWidth: 2,
    borderColor: colors.primary,
    elevation: 6,
    width: moderateScale(337),
    alignSelf: "center",
    height: moderateScale(100),
    borderRadius: 7,
    bottom: 14,
  },

  nameText: {
    color: colors.darkGray,
    fontSize: moderateScale(15),
    marginTop: moderateScale(2),
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  nextButtonContainer: {
    alignItems: "center",
    marginTop: moderateScale(16),
    backgroundColor: colors.lightWhite,
  },
  disableNextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.lightBlue,
    borderRadius: 7,
  },
  totalPriceView: {
    flexDirection: "row",
  },
  totalText: {
    color: colors.black,
    fontSize: 17,
  },
  totalPriceText: {
    color: colors.primary,
    fontSize: 17,
  },
  tipText: {
    color: colors.lightgray,
    fontSize: 11,
    marginTop: moderateScale(13),
  },
  tipPrice: {
    color: colors.primary,
    fontSize: 11,
    marginTop: 3,
  },
  cardCounterView: {
    bottom: moderateScale(65),
  },
  bottomView: {
    flex: 0.3,

    marginTop: moderateScale(12),
  },
  bottomButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  touchableOpacityStyle: {
    alignSelf: "center",
    justifyContent: "center",
  },
  fabIconContainer: {
    justifyContent: "flex-start",
    marginTop: moderateScale(15),
    top: 40,
  },
  nextButtonText: {
    color: "white",
  },
  CardView: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_ROOM_CART",
        payload: cart,
      });
    },

    initRoomService(data) {
      dispatch({
        type: "INIT_ROOM_DATA",
        payload: data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    roomServiceData: state.roomServiceData,
    user: state.user,
    roomServiceCart: state.roomServiceCart,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RoomOrderPlacement);
