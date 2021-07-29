import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../config/colors";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import TopHeader from "../component/TopHeader";
import FabIcon from "../component/FabIcon";
import { CATEGORY } from "../config/enums";
import { moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import DatePicker from "../component/datePicker";
import NextButton from "../component/nextButton";
import { AntDesign as Icon } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";

function OrderSummary(route, props) {
  var today = new Date();
  let newDate = moment(today).format("hh:mm");
  navigation = useNavigation();
  const [showDate, setShowDate] = useState(
    moment().add(30, "minutes").format("HH:mm")
  );
  const [cartData, setCartData] = useState([]);
  const [isRoomService, setIsRoomService] = useState(
    route.route.params.isRoomService
  );
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [tipData, setTipData] = useState(route.route.params.tipDataText);
  const [requestText, setRequestText] = useState("");
  const [showOrderSent, setShowOrderSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [roomServiceCart, setRoomServiceCart] = useState(route.roomServiceCart);

  useEffect(() => {
    makeFormatOrderSummaryData();
  }, []);

  const makeFormatOrderSummaryData = () => {
    return new Promise((resolve, reject) => {
      let roomServiceDetailData = [];
      if (typeof route.roomServiceCart == "object") {
        roomServiceDetailData.push(route.roomServiceCart);
        roomServiceDetailData;
      }
      let servicesData = isRoomService
        ? route.roomServiceCart
        : route.roomServiceCart;

      let servicesArray = [];
      servicesData.forEach((item) => {
        if (item.quantity > 0) {
          servicesArray.push({
            id: item.id,
            qty: item.quantity,
            extras: item.extraItem,
          });
        }
      });

      setCartData([...cartData, ...servicesArray]);
      resolve(cartData);
    }).catch((err) => {
      // reject();
    });
  };

  /* Implement Add ORder Summary Api */
  const addOrderSummary = async () => {
    const cartData = await makeFormatOrderSummaryData();

    setLoader(true);

    let services = cartData;
    let time = showDate;
    let note = requestText;

    fetch("http://checkin.parvaty.com/api/order/add/services", {
      method: "POST",
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OrderNumber: route.order.id,
        langId: "12",
        notes: note,
        tip: tipData,
        delivery_time: time,
        services: services,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == true) {
          setLoader(false);
          setShowOrderSent(true);

          var roomServiceData = route.roomServiceData;

          for (let i = 0; i < roomServiceData.length; i++) {
            let itemList = roomServiceData[i].items;
            for (let j = 0; j < itemList.length; j++) {
              itemList[j].quantity = 0;
              itemList[j].calculatePrice = null;
            }
          }

          //Commented Temporary to test dev
          // for (let i = 0; i < route.roomServiceCart.length; i++) {
          //   route.roomServiceCart.pop();
          // }

          route.roomServiceCart.splice(0, route.roomServiceCart.length);
          setTimeout(() => {
            navigation.dispatch(StackActions.popToTop());
          }, 1000);
        }
      })
      .catch((err) => {});
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirmDate = (date) => {
    if (date) {
      var formatDate = moment(date).format("HH:mm");
      setIsDateSelected(true);
      setShowDate(formatDate);
      // setDate(formatDate)

      hideDatePicker();
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent={true}
          hidden={false}
        />

        <TopHeader
          title={"ROOM SERVICE"}
          headerImage={require("../assets/TopHeader/sideIcon.png")}
          style={styles.header}
          logoImage={require("../assets/TopHeader/roomServiceLogo.png")}
          type={CATEGORY.ROOM_SERVICE}
          rightImage={require("../assets/TopHeader/back-arrow.png")}
          leftImagePress={() => navigation.goBack()}
        />
        {loader ? (
          <ActivityIndicator
            size="large"
            style={styles.loader}
            color={Colors.primary}
          />
        ) : null}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <View style={styles.datePickerView}>
            <Text style={styles.orderText}>Order Summary</Text>
            <Text style={styles.receiveOrder}>
              When would you like to receive the order?
            </Text>
            {!isDateSelected ? (
              <View>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.currentDateContainer}
                >
                  <Text style={styles.currentDateText}>{"Today"}</Text>
                  <Text style={styles.currentDateText}>{showDate}</Text>
                  {/* <Text style={styles.currentDateText}>{year}</Text> */}
                </TouchableOpacity>
                <DatePicker
                  mode={"time"}
                  date={date}
                  isDatePickerVisible={isDatePickerVisible}
                  setDate={(date) => handleConfirmDate(date)}
                  hideDatePicker={hideDatePicker}
                  showDatePicker={showDatePicker}
                />
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.currentDateContainer}
                >
                  <Text style={styles.currentDateText}>{"Today"}</Text>
                  <Text style={styles.currentDateText}>{showDate}</Text>
                  {/* <Text style={styles.currentDateText}>{year}</Text> */}
                </TouchableOpacity>
                <DatePicker
                  mode={"time"}
                  date={date}
                  isDatePickerVisible={isDatePickerVisible}
                  setDate={(date) => handleConfirmDate(date)}
                  hideDatePicker={hideDatePicker}
                  showDatePicker={showDatePicker}
                />
              </View>
            )}
          </View>
          <View style={styles.requestTextView}>
            <Text style={styles.requestText}>
              Are there any request regarding the order?
            </Text>

            <TextInput
              placeholder="Type Here"
              placeholderTextColor="grey"
              style={styles.textInput}
              multiline={true}
              value={requestText}
              onChangeText={(text) => setRequestText(text)}
            />
          </View>
          <View style={{ marginTop: "5%" }}>
            <NextButton
              backToMenuOnPress={() => navigation.navigate("RoomServiceScreen")}
              style={styles.logInButtonEnable}
              buttonName={"Done"}
              onPress={() => addOrderSummary()}
            />
          </View>
          <View style={styles.orderView}>
            {showOrderSent ? (
              <Text style={styles.sentOrderText}>
                THE ORDER WAS SENT SUCCESSFULLY!
              </Text>
            ) : null}
            <Text style={styles.trackOrderText}>You Can Track The Order</Text>

            <View style={styles.sideMenuView}>
              <Text style={{ color: colors.black }}>
                On The Side Menu {">"}{" "}
              </Text>
              <Image
                style={styles.requestIcon}
                source={require("../assets/request.png")}
              />
              <Text style={{ color: colors.primary }}> Request Status</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <FabIcon></FabIcon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  currentDateContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: moderateScale(10),
    width: "94%",
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginTop: moderateScale(18),
  },
  datePickerView: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(15),
  },
  pickerContainer: {
    flexDirection: "row",
    color: colors.primary,
    fontSize: 15,
    width: "94%",
    alignSelf: "center",
    paddingVertical: moderateScale(12),
    marginTop: "2%",
    backgroundColor: "#fff",
    borderColor: colors.gray,
    paddingHorizontal: "5%",
    borderWidth: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: "15%",
  },
  sideMenuView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    top: 5,
  },
  receiveOrder: {
    fontSize: 13,
    marginTop: moderateScale(8),
    color: colors.black,
    marginHorizontal: moderateScale(15),
  },
  currentDateText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: moderateScale(15),
  },
  orderText: {
    color: colors.primary,
    marginHorizontal: moderateScale(15),
  },
  input: {
    backgroundColor: colors.opacityWhite,
    borderColor: colors.gray,
    borderRadius: 5,
    marginTop: moderateScale(20),
    width: moderateScale(300),
    alignSelf: "center",
  },
  requestText: {
    color: colors.black,
    marginHorizontal: moderateScale(15),
  },
  textInput: {
    marginTop: moderateScale(20),
    width: moderateScale(300),
    height: moderateScale(120),
    alignSelf: "center",
    backgroundColor: colors.opacityWhite,
    textAlignVertical: "top",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  requestTextView: {
    top: moderateScale(30),
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  logInButtonEnable: {
    left: moderateScale(30),
    borderRadius: 7,
    width: moderateScale(140),
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: moderateScale(13),
    backgroundColor: colors.primary,
  },

  buttonDisabled: {
    fontSize: 16,
    color: colors.primary,
  },
  enableButton: {
    fontSize: 16,
    color: "white",
  },
  sentOrderText: {
    color: colors.pink,
    marginTop: moderateScale(20),
    top: moderateScale(20),
  },
  trackOrderText: {
    color: colors.black,
    top: moderateScale(24),
    textAlign: "center",
  },
  orderView: {
    marginTop: moderateScale(20),
    top: moderateScale(20),
    alignSelf: "center",
  },
  requestIcon: {
    height: moderateScale(17),
    width: moderateScale(17),
    top: moderateScale(1),
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
    order: state.order,
    roomServiceCart: state.roomServiceCart,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
