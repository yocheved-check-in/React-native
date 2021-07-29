import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { Card } from "react-native-elements";
import PagerView from "react-native-pager-view";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import FabIcon from "../../component/FabIcon";
import RoomServiceCourse from "../../component/RoomService/RoomServiceCourse";
import CartCounter from "../../component/RoomService/CartCounter";

function RoomService(props) {
  const navigation = useNavigation();
  const [roomServiceData, setRoomServiceData] = useState(props.roomServiceData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [headerIndex, setHeaderIndex] = useState(0);
  const [isFoodSelected, setIsFoodSelected] = useState(false);

  useEffect(() => {
    roomServiceData.forEach((element) => {
      element.items.forEach((items) => {
        items.quantity = null;
      });
    });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let data = [...props.roomServiceData];

      setRoomServiceData(data);
    }, [])
  );

  const changePage = (item, index) => {
    setHeaderIndex(index);
    this.pageViewref.setPage(index);
  };

  /* Change the Page on the tap of courses */
  const onPageChange = (position) => {
    setHeaderIndex(position);
    setSelectedIndex(position);
  };

  /* Change the Page on the swipe of courses */
  const handleNavigation = (item, index) => {
    navigation.navigate("RoomServiceDetail", {
      detail: item,
    });
  };

  //add Item to Cart
  const incrementCartProduct = (item) => {
    if (item.extras.length > 0) {
      navigation.navigate("RoomServiceDetail", {
        detail: item,
      });
    } else {
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
      setIsFoodSelected(true);
      setRoomServiceData((roomServiceData) => [
        ...roomServiceData,
        { ...roomServiceData.items, ...roomServiceCart },
      ]);
      props.cartChange(roomServiceCart);
    }
  };

  //remove Item to Cart
  const decrementCartProduct = (item) => {
    if (item.extras.length > 0) {
      navigation.navigate("RoomServiceDetail", {
        detail: item,
      });
    } else {
      var roomServiceCart = props.roomServiceCart;
      const index = roomServiceCart.indexOf(item);
      if (roomServiceCart[index].quantity > 0) {
        roomServiceCart[index].quantity -= 1;
        let price =
          Number(roomServiceCart[index].price) *
          Number(roomServiceCart[index].quantity);
        roomServiceCart[index].calculatePrice = price;
      }
      const isCartEmpty = roomServiceCart.every(
        (item1) => item1.quantity === null || item1.quantity === 0
      );
      setIsFoodSelected(!isCartEmpty);
      setRoomServiceData((roomServiceData) => [
        ...roomServiceData,
        { ...roomServiceData.items, ...roomServiceCart },
      ]);
      props.cartChange(roomServiceCart);
    }
  };

  /* Show Types of Food list */
  const renderRow = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={
          selectedIndex == index
            ? styles.selectedHeadingStyle
            : styles.headingStyle
        }
        onPress={() => changePage(item, index)}
      >
        <Text
          style={
            selectedIndex == index ? styles.selectedTextStyle : styles.textStyle
          }
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  /* Show Drinks View */
  const renderDrinkView = ({ item, index }) => {
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
              ${item.calculatePrice ? item.calculatePrice : item.price}
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

  /* Show Courses view */

  const renderCourseView = ({ item, index }) => {
    return (
      <RoomServiceCourse
        onPressCard={() => handleNavigation(item, index)}
        foodName={item.item_name}
        description={item.description}
        foodImage={{
          uri:
            item.imgurl == null
              ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"
              : item.imgurl,
        }}
        quantity={item.quantity == "0" ? " " : item.quantity}
        showQuantity={item.quantity > 0 ? "X" : " "}
        foodPrice={item.calculatePrice ? item.calculatePrice : item.price}
        heart={item.heart}
        incrementCartQuantity={() => incrementCartProduct(item, index)}
        decrementCartQuantity={() => decrementCartProduct(item, index)}
        onArrowPress={() => handleNavigation(item, index)}
      />
    );
  };

  /* Show the UI on the tap of food types course */
  const renderPageView = () => {
    return roomServiceData.map((item, index) => (
      <View key={index}>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: moderateScale(80),
          }}
          data={item.items}
          showsVerticalScrollIndicator={false}
          renderItem={
            item.name == "Beverages" || item.name == "drinks"
              ? renderDrinkView
              : renderCourseView
          }
          keyExtractor={(index) => index.toString()}
        />
      </View>
    ));
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

      <View style={styles.flatListContainer}>
        <FlatList
          data={roomServiceData}
          horizontal={true}
          renderItem={renderRow}
          showsHorizontalScrollIndicator={false}
          style={styles.flatListContainer}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <PagerView
        ref={(pageViewref) => (this.pageViewref = pageViewref)}
        style={styles.container}
        initialPage={0}
        onPageSelected={(e) => onPageChange(e.nativeEvent.position)}
      >
        {renderPageView()}
      </PagerView>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          disabled={!isFoodSelected}
          onPress={() => navigation.navigate("RoomOrderPlacement")}
          style={
            isFoodSelected ? styles.enableNextButton : styles.disableNextButton
          }
        >
          <Text style={styles.nextButtonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
      <View style={{ top: moderateScale(31) }}>
        <FabIcon
          image={require("../../assets/fabIcon/room.png")}
          name={"room"}
        ></FabIcon>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  flatListContainer: {
    width: "100%",
    height: moderateScale(40),
    marginTop: moderateScale(5),
    marginLeft: moderateScale(2),
  },
  drinkCardCounter: {
    elevation: 10,
    height: moderateScale(46),
    width: moderateScale(120),
    alignSelf: "flex-end",
    padding: 7,
    bottom: moderateScale(45),
  },
  drinkCardContainer: {
    height: moderateScale(80),
    elevation: 3,
    width: moderateScale(320),
    alignSelf: "center",
    padding: 7,
    borderRadius: 3,
  },
  selectedTextStyle: {
    color: colors.primary,
    alignSelf: "center",
    fontSize: 10,
    bottom: moderateScale(1),
    fontFamily: "Roboto-Light",
  },
  textStyle: {
    alignSelf: "center",
    top: moderateScale(0.3),
    fontSize: 10,
    fontFamily: "Roboto-Light",
  },
  cardContainer: {
    elevation: 6,
  },
  beveragesTextContainer: {
    width: "55%",
    flexDirection: "column",
    marginTop: moderateScale(5),
  },
  beveragesName: {
    textAlign: "left",
    fontSize: 17,
    color: colors.black,
    marginBottom: "-15%",
    fontFamily: "Roboto-Regular",
    justifyContent: "center",
  },
  headingStyle: {
    width: moderateScale(70),
    height: moderateScale(32),
    borderRadius: moderateScale(5),
    left: moderateScale(5),
    justifyContent: "center",
    marginHorizontal: moderateScale(10),
  },
  selectedHeadingStyle: {
    width: moderateScale(70),
    height: moderateScale(32),
    backgroundColor: colors.white,
    borderRadius: moderateScale(5),
    left: moderateScale(12),
    justifyContent: "center",
    marginHorizontal: moderateScale(10),
  },
  beveragesDescText: {
    color: colors.lightgray,
    fontSize: 14,
    marginTop: moderateScale(3),
    fontFamily: "Roboto-Regular",
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
  nextButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: moderateScale(80),
    justifyContent: "center",
    backgroundColor: colors.mediumGray,
  },
  courseText: {
    left: moderateScale(25),
    fontSize: moderateScale(15),
    color: colors.black,
    top: moderateScale(3),
  },
  addMore: {
    height: moderateScale(30),
    width: moderateScale(30),
    marginRight: moderateScale(17),
    marginTop: moderateScale(2),
  },
  decrease: {
    height: moderateScale(30),
    width: moderateScale(20),
    marginLeft: moderateScale(11),
    marginTop: moderateScale(2),
  },
  emptyView: {
    marginRight: moderateScale(9),
    height: moderateScale(35),
    width: moderateScale(1),
    backgroundColor: "lightgrey",
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomService);
