import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  FlatList,
} from "react-native";
import colors from "../../config/colors";
import TopHeader from "../../component/TopHeader";
import FabIcon from "../../component/FabIcon";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import NextButton from "../../component/nextButton";
import { connect } from "react-redux";
import RadioButton from "../../component/RoomService/radioButton";
import ServiceDetailCard from "../../component/RoomService/ServiceDetail";

function RoomServiceDetail(route) {
  const navigation = useNavigation();
  const [roomServiceDetail, setRoomServiceDetail] = useState(
    route.route.params.detail
  );
  const [isFoodSelected, setIsFoodSelected] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [roomServiceData, setRoomServiceData] = useState(route.roomServiceData);
  const [extraItem, setExtraItem] = useState([]);
  const [extraItemPrice, setExtraItemPrice] = useState([]);
  const [extraItemArray, setExtraItemArray] = useState(
    roomServiceDetail.extras
  );
  const [quantity, setQuantity] = useState(0);
  const [extraQuestions, setExtraQuestions] = useState([]);

  useMemo(() => {
    if (roomServiceDetail.extras.length > 0) {
      let quantityArrayObject = {
        Extras: JSON.parse(JSON.stringify(roomServiceDetail.extras)),
      };
      setExtraQuestions((extraQuestions) => [
        ...extraQuestions,
        quantityArrayObject,
      ]);
      var roomServiceData = JSON.parse(JSON.stringify(roomServiceDetail));
      if (quantity >= 0) {
        setIsFoodSelected(true);
      }
      roomServiceData.extraItem = extraItem;
      roomServiceData.quantity = 1;
      roomServiceData.calculatePrice = roomServiceData.price;
      roomServiceData.indexId = roomServiceDetail.id.toString() + quantity;
      setQuantity(quantity + 1);
      route.roomServiceCart.push(roomServiceData);
      route.cartChange(route.roomServiceCart);
    }
  }, []);

  const extrasSum = () => {
    let sum = 0;
    for (let i = 0; i < extraItemPrice.length; i++) {
      sum = sum + Number(extraItemPrice[i]);
    }

    let extraPriceSum =
      sum +
      Number(
        roomServiceDetail.calculatePrice
          ? roomServiceDetail.calculatePrice
          : roomServiceDetail.price
      );

    return extraPriceSum;
  };

  const extrasSumView = (parentIndex) => {
    let cartId = roomServiceDetail.id.toString() + parentIndex;
    //get cart index
    let cartIndex = getItemSubIndex(cartId);
    if (
      cartIndex > -1 &&
      route.roomServiceCart[cartIndex].extraItem &&
      route.roomServiceCart[cartIndex].extraItem.length > 0
    ) {
      return (
        <Text style={styles.extraPriceText}>
          {" "}
          ${route.roomServiceCart[cartIndex].calculatePrice}
        </Text>
      );
    }
    return null;
  };

  useFocusEffect(
    React.useCallback(() => {
      let data = [...route.roomServiceData];

      setRoomServiceData(data);
    }, [])
  );

  useEffect(() => {
    let arr = roomServiceDetail.extras.map((item, index) => {
      item.isSelected = false;
      return item;
    });

    setExtraItemArray((extraItemArray) => [...extraItemArray, ...arr]);
    if (roomServiceDetail.quantity > 0) {
      setIsFoodSelected(true);
    }
  }, []);

  //add Item to Cart
  const incrementCartProduct = () => {
    if (roomServiceDetail.extras.length > 0) {
      if (quantity >= 1) {
        let quantityArrayObject = {
          Extras: JSON.parse(JSON.stringify(roomServiceDetail.extras)),
        };
        setExtraQuestions((extraQuestions) => [
          ...extraQuestions,
          quantityArrayObject,
        ]);
      }
      var roomServiceData = roomServiceDetail;
      let price = Number(roomServiceData.price) * Number(quantity);
      roomServiceData.calculatePrice = price;
      roomServiceData.extraItem = extraItem;
      setRoomServiceDetail((roomServiceDetail) => ({
        ...roomServiceDetail,
        ...roomServiceData,
      }));
      if (quantity >= 0) {
        setIsFoodSelected(true);
      }
      roomServiceData.quantity = 1;
      roomServiceData.calculatePrice = roomServiceDetail.price;
      roomServiceData.indexId = roomServiceDetail.id.toString() + quantity;

      setQuantity(quantity + 1);
      route.roomServiceCart.push(roomServiceData);
      route.cartChange(route.roomServiceCart);
    } else {
      var roomServiceData = roomServiceDetail;
      roomServiceData.quantity += 1;
      let price =
        Number(roomServiceData.price) * Number(roomServiceData.quantity);
      roomServiceData.calculatePrice = price;
      roomServiceData.extraItem = extraItem;
      setRoomServiceData((roomServiceDetail) => ({
        ...roomServiceDetail,
        ...roomServiceData,
      }));
      let cartIndex = getItemIndex(roomServiceData.id);

      if (cartIndex == -1) {
        route.roomServiceCart.push(roomServiceData);
      } else {
        route.roomServiceCart[cartIndex].quantity = roomServiceData.quantity;

        route.roomServiceCart[cartIndex].calculatePrice =
          roomServiceData.calculatePrice;

        route.roomServiceCart[cartIndex].extraItem = roomServiceData.extraItem;
      }

      if (roomServiceDetail.quantity >= 0) {
        setIsFoodSelected(true);
      }

      route.cartChange(route.roomServiceCart);
    }
  };
  const getItemIndex = (id) => {
    for (let i = 0; i < route.roomServiceCart.length; i++) {
      if (route.roomServiceCart[i].id == id) {
        return i;
      }
    }
    return -1;
  };

  const getItemSubIndex = (id) => {
    for (let i = 0; i < route.roomServiceCart.length; i++) {
      if (route.roomServiceCart[i].indexId == id) {
        return i;
      }
    }
    return -1;
  };

  //remove Item to Cart
  const decrementCartProduct = () => {
    if (roomServiceDetail.extras.length > 0) {
      let qty = quantity;
      if (qty > 1) {
        qty = qty - 1;
      }
      let index = roomServiceDetail.id.toString() + qty;
      let cartIndex = getItemSubIndex(index);

      if (cartIndex > -1) {
        route.roomServiceCart.pop(cartIndex);
        route.cartChange(route.roomServiceCart);
        setQuantity(qty);
        let extraData = [...extraQuestions];
        extraData.pop();
        setExtraQuestions(extraData);
      }
    } else {
      var roomServiceData = roomServiceDetail;
      if (roomServiceData.quantity > 0) {
        roomServiceData.quantity -= 1;
        let price =
          Number(roomServiceData.price) * Number(roomServiceData.quantity);
        roomServiceData.calculatePrice = price;
      } else {
        delete roomServiceData.extraItem;
      }
      setRoomServiceData((roomServiceDetail) => ({
        ...roomServiceDetail,
        ...roomServiceData,
      }));

      if (roomServiceDetail.quantity <= 0) {
        setIsFoodSelected(false);
      }
      let cartIndex = getItemIndex(roomServiceData.id);
      if (cartIndex >= 0) {
        route.roomServiceCart[cartIndex].quantity = roomServiceData.quantity;

        route.roomServiceCart[cartIndex].calculatePrice =
          roomServiceData.calculatePrice;

        route.roomServiceCart[cartIndex].extraItem = roomServiceData.extraItem;
      }
      route.cartChange(route.roomServiceCart);
    }
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
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <View style={styles.innerContainer}>
        <ScrollView>
          <View style={styles.orderNameContainer}>
            <Text style={styles.preferText}>MY PREFERENCE</Text>
          </View>

          <ServiceDetailCard
            foodImage={{
              uri:
                roomServiceDetail.imgurl == null
                  ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
                  : roomServiceDetail.imgurl,
            }}
            price={
              roomServiceDetail.calculatePrice
                ? roomServiceDetail.calculatePrice
                : roomServiceDetail.price
            }
            heart={roomServiceDetail.heart}
            foodName={roomServiceDetail.item_name}
            showQuantity={
              roomServiceDetail.extras.length > 0
                ? quantity > 0
                  ? "X"
                  : ""
                : roomServiceDetail.quantity > 0
                ? "X"
                : ""
            }
            quantity={
              roomServiceDetail.extras.length > 0
                ? quantity > 0
                  ? quantity
                  : ""
                : roomServiceDetail.quantity > 0
                ? roomServiceDetail.quantity
                : ""
            }
            description={roomServiceDetail.description}
            incrementProductQuantity={() => incrementCartProduct()}
            decrementProductQuantity={() => decrementCartProduct()}
          />

          {extraQuestions.map((parentItem, parentIndex) => {
            return roomServiceDetail.extras.length > 0 ? (
              <Card containerStyle={styles.extraItemCard}>
                <View style={styles.extraItemView}>
                  <Text style={styles.likeText}>
                    How do you like your {roomServiceDetail.item_name}?
                  </Text>
                  {extrasSumView(parentIndex)}
                </View>
                {/* {parentItem.Extras.map((item, index) => { */}
                <FlatList
                  numColumns={2}
                  data={parentItem.Extras}
                  renderItem={({ item, index }) => {
                    return (
                      <RadioButton
                        radioButtonName={item.item_name}
                        Price={item.price}
                        radioButtonPress={() => {
                          let extradata = [...extraQuestions];
                          // let cartSubIndex=Number(parentIndex)+1
                          let cartId =
                            roomServiceDetail.id.toString() + parentIndex;

                          //get cart index
                          let cartIndex = getItemSubIndex(cartId);

                          let extraItemList = [];
                          if (cartIndex > -1) {
                            //SAGAR CHANGE
                            extraItemList = JSON.parse(
                              JSON.stringify(
                                route.roomServiceCart[cartIndex].extraItem
                              )
                            );
                          }

                          if (item.isSelected) {
                            item.isSelected = false;
                            extradata[parentIndex].Extras[
                              index
                            ].isSelected = false;
                            //Remove the extra item from list
                            if (extraItemList.length > 0) {
                              extraItemList.pop(item.id);
                              route.roomServiceCart[cartIndex].extraItem =
                                JSON.parse(JSON.stringify(extraItemList));
                              route.roomServiceCart[cartIndex].calculatePrice =
                                Number(
                                  route.roomServiceCart[cartIndex]
                                    .calculatePrice
                                ) - Number(item.price);
                            }
                          } else {
                            extradata[parentIndex].Extras[
                              index
                            ].isSelected = true;
                            //add the extra item from list
                            extraItemList.push(item.id);
                            route.roomServiceCart[cartIndex].extraItem =
                              JSON.parse(JSON.stringify(extraItemList));
                            route.roomServiceCart[cartIndex].calculatePrice =
                              Number(
                                route.roomServiceCart[cartIndex].calculatePrice
                              ) + Number(item.price);
                          }

                          setExtraQuestions(extradata);
                          route.cartChange(route.roomServiceCart);
                        }}
                        isSelected={item.isSelected}
                      />
                    );
                  }}
                />
                {/* })} */}
              </Card>
            ) : null;
          })}
          <View style={styles.nextButtonContainer}>
            <NextButton
              addOrderText={
                " Would you like to add another dish to your order?"
              }
              onPress={() => navigation.navigate("RoomOrderPlacement")}
              backToMenuOnPress={() => navigation.navigate("RoomServiceScreen")}
              disabled={!isFoodSelected}
              style={
                isFoodSelected
                  ? styles.enableNextButton
                  : styles.disableNextButton
              }
              buttonName={"Next"}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{ backgroundColor: colors.lightGray }}>
        <FabIcon />
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
  nextButtonContainer: {
    alignItems: "center",
    marginTop: moderateScale(16),
  },
  OrderingItem: {
    color: colors.pink,
    marginHorizontal: moderateScale(9),
  },
  extraItemCard: {
    elevation: 6,
    borderRadius: 8,
    paddingVertical: moderateScale(10),
  },
  extraItemView: {
    flexDirection: "row",
  },
  orderNameContainer: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(15),
  },
  likeText: {
    fontWeight: "bold",
    fontSize: 13,
    color: colors.black,
    fontFamily: "Roboto-Regular",
  },
  RadioButton: {
    flexDirection: "row",
    marginLeft: moderateScale(-10),
    paddingLeft: moderateScale(-10),
    justifyContent: "space-evenly",
    paddingVertical: moderateScale(16),
  },
  preferText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    marginTop: moderateScale(12),
    color: colors.black,
    marginHorizontal: moderateScale(9),
  },
  header: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
  },
  extraPriceText: {
    color: colors.primary,
    left: moderateScale(10),
    fontSize: 13,
    marginTop: moderateScale(1),
  },
  enableNextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  disableNextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.lightBlue,
    borderRadius: 7,
  },
  innerContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
    paddingBottom: "5%",
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

    initUser(data) {
      dispatch({
        type: "INIT_USER",
        payload: data,
      });
    },

    initRoomService(data) {
      dispatch({
        type: "INIT_ROOM_DATA",
        payload: data,
      });
    },
    initSpa(data) {
      dispatch({
        type: "INIT_SPA_DATA",
        payload: data,
      });
    },
    initExtra(data) {
      dispatch({
        type: "INIT_EXTRAITEM",
        payload: data,
      });
    },
    initHouseKeeping(data) {
      dispatch({
        type: "INIT_HOUSE_DATA",
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
    extraItem: state.extraItem,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomServiceDetail);
