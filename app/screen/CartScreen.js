import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import CartItem from "../component/CartItem";
import { t } from "../services/i18n";
import TopHeader from "../component/TopHeader";
import Separate from "../component/Separate";
import { Button } from "react-native-elements";
import colors from "../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../config/enums";

componentDidMount = () => {
  cart.forEach((item) => {
    this.setTotalPrice(price + item.price);
  });
};

function CartScreen(props) {
  const [cartTotal, setCartTotal] = useState(0);
  const [uniqueValue, setUniqueValue] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);

  const type = props.route.params.type;

  var cart =
    type === CATEGORY.ROOM_SERVICE ? props.roomServiceCart : props.spaCart;

  useEffect(() => {
    total();
  }, []);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price * cart[i].amount;
    }
    setCartTotal(totalVal);
  };

  const renderRow = ({ item }) => {
    return (
      <>
        <CartItem item={item} update={() => total()} />
        <Separate />
      </>
    );
  };

  const checkoutPressed = (props) => {
    props.cartDelete(type);
    setCartTotal(0);
    props.navigation.goBack();
  };

  return (
    <View style={styles.container} key={uniqueValue}>
      <TopHeader
        icon={
          type === CATEGORY.ROOM_SERVICE
            ? require("../assets/main/foodw.png")
            : require("../assets/main/spaw.png")
        }
        title={
          type === CATEGORY.ROOM_SERVICE ? t("RoomService:roomService") : "Spa"
        }
        isCart={false}
        style={styles.header}
        numberOfItems={numberOfItems}
      />
      <FlatList
        data={cart}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />

      <Text style={styles.total}>Total: {cartTotal + "$"} </Text>
      <Button
        titleStyle={{ fontWeight: "bold" }}
        buttonStyle={styles.button}
        title="Checkout"
        onPress={() => checkoutPressed(props)}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return { roomServiceCart: state.roomServiceCart, spaCart: state.spaCart };
};
const mapDitpatchToProps = (dispatch) => {
  return {
    cartDelete(type) {
      type === CATEGORY.ROOM_SERVICE
        ? dispatch({
            type: "DELETE_ROOM_CART",
          })
        : dispatch({
            type: "DELETE_SPA_CART",
          });
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    zIndex: 1,
    top: 0,
    position: "absolute",
  },
  total: {
    justifyContent: "center",
    alignSelf: "center",
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  flatList: {
    zIndex: 0,
    bottom: 50,
    flexGrow: 1,
    //height: "70%",
    top: 0,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
  },
});

export default connect(mapStateToProps, mapDitpatchToProps)(CartScreen);
