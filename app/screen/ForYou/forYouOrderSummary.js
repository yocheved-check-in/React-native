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
import { Card } from "react-native-elements";
import DatePicker from "../../component/datePicker";
import FabIcon from "../../component/ConstantStyles/FabIcon";
import { StackActions } from "@react-navigation/native";
import moment from "moment";

function forYouOrderSummary(props) {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [showOrderSent, setShowOrderSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showSpaDate, setShowSpaDate] = useState(
    moment().add(30, "minutes").format("HH:mm")
  );
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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

  const addOrderSummary = async () => {
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
        notes: props.route.params.requestText,
        delivery_time: showSpaDate,
        services: props.forYouCart,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == true) {
          setLoader(false);
          setShowOrderSent(true);

          var ForYouData = props.forYou;

          for (let i = 0; i < ForYouData.length; i++) {
            let itemList = ForYouData[i].items;
            for (let j = 0; j < itemList.length; j++) {
              itemList[j].quantity = 0;
              itemList[j].calculatePrice = null;
            }
          }

          props.initforYou(ForYouData);
          for (let i = 0; i <= props.forYouCart.length; i++) {
            props.forYouCart.pop();
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
        title={"FOR YOU"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        logoImage={require("../../assets/TopHeader/forYou.png")}
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

        <Card containerStyle={styles.cardStyle}>
          <View style={styles.textContainer}>
            <Text style={styles.smallText}>{props.route.params.itemName}</Text>
            <Text style={styles.smallText}>
              {"$" + props.route.params.itemPrice}
            </Text>
          </View>
        </Card>

        <View style={styles.requestTextView}>
          <Text style={styles.requestText}>
            When Would You like to receive the package?
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
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addTreatmentTouchable}
            onPress={() => navigation.navigate("ForYouScreen")}
          >
            <Text style={styles.addText}>Add Treatment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addOrderSummary()}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
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
            <Text style={styles.sideText}>On The Side Menu {">"} </Text>
            <Image
              style={styles.requestIcon}
              source={require("../../assets/request.png")}
            />
            <Text style={styles.RequestStatusText}>Request Status</Text>
          </View>
        </View>
      </ScrollView>

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
  sideText:{ 
    color: colors.black 
  },
  addTreatmentTouchable: {
    alignSelf: "center",
    justifyContent: "center",
  },
  allPackage: {
    color: colors.primary,
    fontSize: 15,
    left: moderateScale(14),
    fontFamily: "Roboto-Regular",
  },
  cardStyle: {
    elevation: 6,
    width: moderateScale(330),
    alignSelf: "center",
    marginTop: "5%",
    backgroundColor: "#FDFDFD",
    borderRadius: moderateScale(5),
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(5),
  },
  smallText: {
    color: colors.spaTextColor,
    fontSize: moderateScale(12),
  },
  requestTextView: {
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
  },
  requestText: {
    color: colors.black,
    marginHorizontal: moderateScale(20),
    fontSize: 13,
    fontFamily: "Roboto-Regular",
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
    marginTop: 20,
    top: 5,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: "10%",
    backgroundColor: colors.backgroundColor,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: moderateScale(12),
    marginTop: "15%",
  },
  addText: {
    alignSelf: "center",
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 16,
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
  currentDateText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: moderateScale(15),
  },
  nextButtonText: {
    color: colors.white,
  },
  RequestStatusText: {
    color: colors.primary,
  },
});

const mapDitpatchToProps = (dispatch) => {
  return {
    initforYou(data) {
      dispatch({
        type: "INIT_FOR_DATA",
        payload: data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    forYou: state.forYou,
    user: state.user,
    forYouCart: state.forYouCart,
    order: state.order,
  };
};
export default connect(mapStateToProps, mapDitpatchToProps)(forYouOrderSummary);
