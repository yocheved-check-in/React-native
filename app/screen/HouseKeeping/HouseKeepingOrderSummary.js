import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import DatePicker from "../../component/datePicker";
import FabIcon from "../../component/ConstantStyles/FabIcon";
import { StackActions } from "@react-navigation/native";
import moment from "moment";

function HouseKeepingOrderSummary(props) {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showOrderSent, setShowOrderSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showSpaDate, setShowSpaDate] = useState(
    moment().add(30, "minutes").format("HH:mm")
  );
  const [requestText, setRequestText] = useState("");
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [cartData, setCartData] = useState(props.houseKeepingCart);

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
      setShowSpaDate(formatDate);
      hideDatePicker();
    }
  };
  let servicesArray = [];
  const makeFormatOrderSummaryData = () => {
    return new Promise((resolve, reject) => {
      cartData.forEach((item) => {
        if (item.quantity > 0) {
          servicesArray.push({
            id: item.id,
            qty: item.quantity,
          });
        }
      });

      setCartData([...cartData, ...servicesArray]);
      resolve(cartData);
    }).catch((err) => {
      // reject();
    });
  };

  const addOrderSummary = async () => {
    const cartData = await makeFormatOrderSummaryData();
    setLoader(true);
    fetch("http://checkin.parvaty.com/api/order/add/services", {
      method: "POST",
      redirect: "follow",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        OrderNumber: props.order.id,
        langId: "12",
        notes: requestText,
        delivery_time: showSpaDate,
        services: servicesArray,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == true) {
          setLoader(false);
          setShowOrderSent(true);

          var housekeepingData = props.houseKeepingData;

          for (let i = 0; i < housekeepingData.length; i++) {
            let itemList = housekeepingData[i].items;
            for (let j = 0; j < itemList.length; j++) {
              itemList[j].quantity = 0;
              itemList[j].calculatePrice = null;
            }
          }

          props.initHouseKeeping(housekeepingData);

          for (let i = 0; i < props.houseKeepingCart.length; i++) {
            props.houseKeepingCart.pop();
          }

          setTimeout(() => {
            navigation.dispatch(StackActions.popToTop());
          }, 1000);
        }
      })
      .catch((err) => {});
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
      {loader ? (
        <ActivityIndicator
          size="large"
          style={styles.loader}
          color={colors.primary}
        />
      ) : null}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.selectView}>
          <Text style={styles.allPackage}>Order summary</Text>
        </View>

        <View style={styles.requestTextView}>
          <Text style={styles.requestText}>
            when would you like to receive the service?
          </Text>
          {!isDateSelected ? (
            <View>
              <TouchableOpacity
                onPress={showDatePicker}
                style={styles.currentDateContainer}
              >
                <Text style={styles.currentDateText}>{"Today"}</Text>
                <Text style={styles.currentDateText}>{showSpaDate}</Text>
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
                <Text style={styles.currentDateText}>{showSpaDate}</Text>
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
            Are there any requests regarding the service?
          </Text>
          <TextInput
            placeholder="Type Here"
            placeholderTextColor="grey"
            style={styles.textInput}
            multiline={true}
            onChangeText={(text) => setRequestText(text)}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addTreatmentTouchable}
          onPress={() => navigation.navigate("HouseKeepingAllPackages")}
        >
          <Text style={styles.addText}>Back to All Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => addOrderSummary()}
          style={styles.nextButton}
        >
          <Text style={styles.DoneText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.orderView}>
        {showOrderSent ? (
          <Text style={styles.sentOrderText}>
            THE ORDER WAS SENT SUCCESSFULLY!
          </Text>
        ) : null}

        <Text style={styles.trackOrderText}>You Can Track The Order</Text>
        <View style={styles.sideMenuView}>
          <Text style={{ color: colors.black }}>On The Side Menu {">"} </Text>
          <Image
            style={styles.requestIcon}
            source={require("../../assets/request.png")}
          />
          <Text style={styles.RequestStatusText}> Request Status</Text>
        </View>
      </View>

      <FabIcon image={require("../../assets/fabIcon/room.png")} name={"room"} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  selectView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    alignSelf: "center",
    marginTop: moderateScale(18),
  },
  addTreatmentTouchable: {
    alignSelf: "center",
    justifyContent: "center",
  },
  allPackage: {
    color: colors.primary,
    fontSize: moderateScale(14),
    left: moderateScale(14),
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  requestTextView: {
    marginHorizontal: moderateScale(15),
    marginTop: moderateScale(20),
  },
  requestText: {
    color: colors.darkGray,
    marginHorizontal: moderateScale(12),
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },

  textInput: {
    marginVertical: "5%",
    width: "93%",
    height: moderateScale(140),
    alignSelf: "center",
    backgroundColor: colors.opacityWhite,
    textAlignVertical: "top",
    borderRadius: moderateScale(6),
    paddingLeft: moderateScale(15),
    paddingTop: "5%",
  },
  orderView: {
    marginTop: moderateScale(10),
    alignSelf: "center",
  },
  requestIcon: {
    height: moderateScale(17),
    width: moderateScale(17),
    top: moderateScale(1),
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
  sideMenuView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
    bottom: 4,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: "5%",
    backgroundColor: colors.backgroundColor,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: moderateScale(5),
    bottom: moderateScale(9),
  },
  addText: {
    alignSelf: "center",
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 14,
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
  fabIconContainer: {
    top: 0,
    right: -5,
    backgroundColor: colors.backgroundColor,
  },
  currentDateContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: moderateScale(10),
    width: "90%",
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginTop: moderateScale(18),
  },
  currentDateText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: moderateScale(15),
  },
  DoneText: {
    color: colors.white,
  },
  RequestStatusText: {
    color: colors.primary,
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
    user: state.user,
    order: state.order,
    houseKeepingCart: state.houseKeepingCart,
    houseKeepingData: state.houseKeepingData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseKeepingOrderSummary);
