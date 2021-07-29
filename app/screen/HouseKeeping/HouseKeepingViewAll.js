import React, { useState, useMemo } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import FabIcon from "../../component/ConstantStyles/FabIcon";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Card } from "react-native-elements";
import CartCounter from "../../component/RoomService/CartCounter";

function HouseKeepingViewAll(props) {
  const [houseKeepingData, setHouseKeepingData] = useState(
    props.route.params.allData
  );
  const [isPackageSelected, setIsPackageSelected] = useState(false);
  navigation = useNavigation();

  useMemo(() => {
    houseKeepingData.quantity = 0;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let data = [...props.route.params.allData];

      setHouseKeepingData(data);
    }, [])
  );

  //add Item to Cart
  const incrementCartProduct = (item) => {
    var houseKeepingCart = props.houseKeepingCart;
    const index = houseKeepingCart.indexOf(item);
    if (index == -1) {
      item["quantity"] = 1;
      houseKeepingCart.push(item);
    } else {
      houseKeepingCart[index].quantity += 1;
      let price =
        Number(houseKeepingCart[index].price) *
        Number(houseKeepingCart[index].quantity);
      houseKeepingCart[index].calculatePrice = price;
    }
    setIsPackageSelected(true);
    setHouseKeepingData((houseKeepingData) => [...houseKeepingCart]);
    props.cartChange(houseKeepingCart);
  };

  //remove Item to Cart
  const decrementCartProduct = (item) => {
    var houseKeepingCart = props.houseKeepingCart;
    const index = houseKeepingCart.indexOf(item);
    if (houseKeepingCart[index].quantity > 0) {
      houseKeepingCart[index].quantity -= 1;
      let price =
        Number(houseKeepingCart[index].price) *
        Number(houseKeepingCart[index].quantity);
      houseKeepingCart[index].calculatePrice = price;
    }
    const isCartEmpty = houseKeepingCart.every(
      (item1) => item1.quantity === null || item1.quantity === 0
    );
    setIsPackageSelected(!isCartEmpty);
    setHouseKeepingData((houseKeepingData) => [...houseKeepingCart]);
    props.cartChange(houseKeepingCart);
  };

  const renderRow = ({ item, index }) => {
    return (
      <Card containerStyle={styles.beveragesCardContainer}>
        <View style={styles.beveragesViewContainer}>
          <View style={styles.beveragesTextContainer}>
            <Text numberOfLines={2} style={styles.beveragesName}>
              {item.item_name}
              <Text style={{ color: colors.primary }}>
                {item.quantity > 0 ? "X" : " "}
                {item.quantity == "0" ? " " : item.quantity}
                {"\n"}
              </Text>
            </Text>
            <Text style={styles.beveragesDescText}>
              {item.calculatePrice ? (
                <Text>${parseFloat(item.calculatePrice).toFixed(2)}</Text>
              ) : item.price == 0 ? (
                "free"
              ) : (
                <Text>${parseFloat(item.price).toFixed(2)}</Text>
              )}
            </Text>
          </View>
          <View
            style={{
              marginTop: moderateScale(15),
            }}
          >
            <CartCounter
              incrementCart={() => incrementCartProduct(item, index)}
              cartDecrement={() => decrementCartProduct(item, index)}
            />
          </View>
        </View>
      </Card>
    );
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
        logoImage={require("../../assets/TopHeader/spa1.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.listStyle}>
          <Text style={styles.basicText}>{props.route.params.packageName}</Text>
          {props.route.params.allData.length > 0 ? (
            <FlatList
              data={props.route.params.allData}
              renderItem={renderRow}
              keyExtractor={(item, index) => String(index)}
            />
          ) : (
            <View style={styles.noPackageFoundContainer}>
              <Text style={{ color: colors.primary }}>No Package found</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={!isPackageSelected}
          onPress={() => {
            navigation.navigate("OrderPlacement");
          }}
          style={
            isPackageSelected
              ? styles.enableNextButton
              : styles.disableNextButton
          }
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>

      <FabIcon image={require("../../assets/fabIcon/room.png")} name={"room"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Gray,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  buttonContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
  },
  basicText: {
    fontSize: 15,
    color: colors.darkGray,
    marginTop: moderateScale(15),
    marginLeft: moderateScale(30),
    fontFamily: "Roboto-Regular",
  },
  beveragesCardContainer: {
    borderRadius: moderateScale(8),
    justifyContent: "center",
    alignContent: "center",
    height: moderateScale(80),
  },
  beveragesViewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  beveragesTextContainer: {
    width: "55%",
    flexDirection: "column",
    marginTop: moderateScale(5),
  },
  beveragesName: {
    textAlign: "left",
    fontSize: 18.5,
    color: colors.black,
    marginBottom: "-15%",
    justifyContent: "center",
    fontFamily: "Roboto-Regular",
  },
  beveragesDescText: {
    color: colors.lightgray,
    fontSize: 14,
    marginTop: moderateScale(4),
    fontFamily: "Roboto-Regular",
  },
  noPackageFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    color: colors.primary,
  },
  enableNextButton: {
    width: moderateScale(150),
    padding: moderateScale(15),
    backgroundColor: colors.primary,
    color: colors.white,
    alignSelf: "center",
    borderRadius: 6,
    alignItems: "center",
  },
  disableNextButton: {
    width: moderateScale(150),
    padding: moderateScale(15),
    backgroundColor: colors.primary,
    color: colors.white,
    backgroundColor: colors.lightBlue,
    alignSelf: "center",
    borderRadius: 6,
    alignItems: "center",
  },
  nextButtonText: {
    color: colors.white,
  },
});

const mapStateToProps = (state) => {
  return {
    houseKeepingCart: state.houseKeepingCart,
    houseKeepingData: state.houseKeepingData,
  };
};

const mapDitpatchToProps = (dispatch) => {
  return {
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_HOUSE_CART",
        payload: cart,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDitpatchToProps
)(HouseKeepingViewAll);
