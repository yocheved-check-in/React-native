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
import FabIcon from "../../component/ConstantStyles/FabIcon";
import { StackActions } from "@react-navigation/native";

function SpaOrderSummary(props) {
  const [showOrderSent, setShowOrderSent] = useState(false);
  const [loader, setLoader] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [spaCart, setSpaCart] = useState(props.spaCart);
  const [id, setId] = useState(18);

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
        services: props.spaCart,
        notes: requestText,
        delivery_time: props.route.params.date,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == true) {
          setLoader(false);
          setShowOrderSent(true);

          var roomServiceData = props.spaData;

          for (let i = 0; i < roomServiceData.length; i++) {
            let itemList = roomServiceData[i].items;
            for (let j = 0; j < itemList.length; j++) {
              itemList[j].quantity = 0;
              itemList[j].calculatePrice = null;
            }
          }

          props.initSpa(roomServiceData);
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
        title={"SPA"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        style={styles.header}
        logoImage={require("../../assets/TopHeader/spa1.png")}
        type={CATEGORY.SPA}
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
        {props.route.params.treatmentName != "Couples Treatments" ? (
          <Card containerStyle={styles.cardStyle}>
            <Text style={styles.nameText}>{props.user.name}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.smallText}>
                {"Today   " + props.route.params.date}
              </Text>
              <Text style={styles.smallText}>Complete Rejuvenation</Text>
            </View>
          </Card>
        ) : (
          <View>
            <Card containerStyle={styles.cardStyle}>
              <Text style={styles.nameText}>{props.user.name}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.smallText}>today 12:00</Text>
                <Text style={styles.smallText}>Complete Rejuvenation</Text>
              </View>
            </Card>
            <Card containerStyle={styles.cardStyle}>
              <Text style={styles.nameText}>dena</Text>
              <View style={styles.textContainer}>
                <Text style={styles.smallText}>today 12:00</Text>
                <Text style={styles.smallText}>Complete Rejuvenation</Text>
              </View>
            </Card>
          </View>
        )}
        <View style={styles.requestTextView}>
          <Text style={styles.requestText}>
            Are there any request regarding the order?
          </Text>
          <TextInput
            placeholder="Type Here"
            placeholderTextColor="grey"
            style={styles.textInput}
            multiline={true}
            onChangeText={(text) => setRequestText(text)}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addTreatmentTouchable}
            onPress={() => navigation.navigate("Spa")}
          >
            <Text style={styles.addText}>Add Treatment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addOrderSummary()}
            style={styles.nextButton}
          >
            <Text style={{ color: "white" }}>Next</Text>
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
            <Text style={{ color: colors.primary }}> Request Status</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.fabIconContainer}>
        <FabIcon
          image={require("../../assets/fabIcon/room.png")}
          name={"room"}
        />
      </View>
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
    fontSize: 15,
    left: moderateScale(14),
    fontFamily: "Roboto-Regular",
  },
  cardStyle: {
    elevation: 6,
    width: moderateScale(335),
    alignSelf: "center",
    marginTop: "5%",

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
  nameText: {
    color: colors.spaTextColor,
    textDecorationLine: "underline",
    fontSize: moderateScale(15),
    fontWeight: "400",

    alignSelf: "flex-start",
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
    color: colors.darkGray,
    marginHorizontal: moderateScale(15),
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },
  textInput: {
    marginVertical: "5%",
    width: moderateScale(328),
    height: moderateScale(110),
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
  fabIconContainer: {
    backgroundColor: colors.backgroundColor,
  },
});

const mapDitpatchToProps = (dispatch) => {
  return {
    initSpa(data) {
      dispatch({
        type: "INIT_SPA_DATA",
        payload: data,
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
    spaCart: state.spaCart,
    order: state.order,
    user: state.user,
  };
};
export default connect(mapStateToProps, mapDitpatchToProps)(SpaOrderSummary);
