import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import TopHeader from "../component/TopHeader";
import colors from "../config/colors";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import moment from "moment";
import { moderateScale } from "react-native-size-matters";
import { BASE_URL } from "@env";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "../component/datePicker";
import { KeyboardAvoidingView } from "react-native";
import DatabaseService from "../services/DatabaseService";
import messaging from "@react-native-firebase/messaging";
import initializeNotification from "../services/initializeNotification";

function LoginScreen(props) {
  let dbService = new DatabaseService();

  const [checkInDate, setCheckInDate] = useState("");

  const [isCheckInDatePickerVisible, setCheckInDatePickerVisibility] =
    useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [fcmToken, setFcmToken] = useState("");
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();

  const showCheckInDatePicker = () => {
    setCheckInDatePickerVisibility(true);
  };

  const hideCheckInDatePicker = () => {
    setCheckInDatePickerVisibility(false);
  };

  const handleCheckInConfirm = (date) => {
    if (date) {
      var formatDate = moment(date).format("DD-MM-YYYY");
      setCheckInDate(formatDate);
      hideCheckInDatePicker();
    }
  };

  const getDeviceToken = () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          login(fcmToken);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    initializeNotification();

    dbService.getUserDetail().then((json) => {
      if (json != null) {
        saveLoginData(JSON.parse(json));
        firebaseService.messaging().onNotificationOpenedApp((remoteMessage) => {
          // navigation.navigate(remoteMessage.data.type);
        });
        // Check whether an initial notification is available
        firebaseService
          .messaging()
          .getInitialNotification()
          .then((remoteMessage) => {
            if (remoteMessage) {
              // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
            setLoading(false);
          });
      } else {
        navigation.navigate("Login");
      }
    });
  });

  const getNetworkConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        // login();
        getDeviceToken();
      } else {
        alert("please check Network connection");
      }
    });
  };

  const login = (fcmToken) => {
    let CheckInDate = moment(checkInDate).format("YYYY-MM-DD");
    if (orderNumber == "" || CheckInDate == "") {
      alert("Please Enter Reservation Code");
    } else {
      setLoader(true);

      var url =
        BASE_URL +
        "Signin?" +
        new URLSearchParams({
          reservationId: orderNumber,
          checkInDate: checkInDate,
          langId: 1,
          device_token: fcmToken,
        });
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (json.status == true) {
            json.reservationnumber = orderNumber;

            dbService.saveUserDetail(json);
            parseLoginJson(json, true);
            // getDeviceToken();
          } else {
            alert(json.message);
            setLoader(false);
          }
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };

  const parseLoginJson = (json) => {
    setLoader(false);

    if (json.data) {
      props.initRoomService(json.data.food);
      props.initOrder(json.data.order);
      props.initUser(json.data.order.user);
      props.initHouseKeeping(json.data.housekeeping);

      props.initforYou(json.data.for_you);
      spaBuilder(json.data.spa);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Main" }],
        })
      );
    } else {
      alert("Error " + json.message);
    }
  };

  const saveLoginData = (loginData) => {
    var url =
      BASE_URL +
      "Signin?" +
      new URLSearchParams({
        reservationId: loginData.reservationnumber,
        checkInDate: loginData.data.order.check_in,
        langId: 1,
      });
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // let res = JSON.parse(json);
        if (json.status == true) {
          json.reservationnumber = loginData.reservationnumber;
          dbService.saveUserDetail(json);

          parseLoginJson(json);
        } else {
          parseLoginJson(loginData);
        }
      })
      .catch((error) => {});
  };
  const spaBuilder = (spa) => {
    spa.map((category) => {
      category.items.map((item) => {
        sortLengthArray(item);
      });
    });

    props.initSpa(spa);
  };

  const sortLengthArray = (item) => {
    var lengthArray = [];
    var tmp = {};

    item.length.forEach((element) => {
      if (lengthArray.length === 0)
        lengthArray.push({
          value: element + " min",
          label: element + " min",
          selected: "false",
        });
      else {
        lengthArray.push({
          value: element + " min",
          label: element + " min",
        });
      }

      item.length = lengthArray;
    });
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
        title={"Check in"}
        style={styles.header}
        logoImage={require("../assets/TopHeader/Logo.png")}
      />
      {loader ? (
        <ActivityIndicator
          size="large"
          style={styles.loader}
          color={colors.primary}
        />
      ) : null}
      <KeyboardAvoidingView style={{ flex: 1, paddingBottom: "5%" }}>
        <ScrollView style={{ flexGrow: 1 }}>
          <View style={styles.datePickerView}>
            <View style={styles.datePickerContainer}>
              <Image
                style={styles.logoCalender}
                source={require("../assets/onlycalender.png")}
              />
              <Text style={styles.arrivalDateText}>CheckIn Date</Text>
            </View>
            <DatePicker
              iconName={"calendar"}
              containerDatePicker={styles.pickerContainer}
              date={checkInDate}
              isDatePickerVisible={isCheckInDatePickerVisible}
              setDate={(date) => handleCheckInConfirm(date)}
              hideDatePicker={hideCheckInDatePicker}
              showDatePicker={showCheckInDatePicker}
            />
          </View>

          <View style={styles.ReserveView}>
            <View style={styles.reservedNumber}>
              <Image
                style={styles.datepicker}
                source={require("../assets/calenderxxx.png")}
              />
              <Text
                style={{
                  color: colors.primary,
                }}
              >
                Reservation Code
              </Text>
            </View>

            <TextInput
              placeholder="Type Your 10 Character Code"
              placeholderTextColor="grey"
              maxLength={10}
              returnKeyType="done"
              style={styles.textInput}
              onChangeText={(text) => setOrderNumber(text)}
              onSubmitEditing={() => getNetworkConnection()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  donText: {
    color: colors.white,
    alignSelf: "center",
    fontSize: moderateScale(14),
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
  input: {
    backgroundColor: colors.opacityWhite,
    borderColor: colors.gray,
    borderWidth: 1,
    marginTop: 15,
    width: "80%",
    alignSelf: "center",
  },
  pickerContainer: {
    flexDirection: "row",
    color: colors.primary,
    fontSize: 15,
    width: "80%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: moderateScale(12),
    marginTop: "2%",
    paddingHorizontal: "2%",
    backgroundColor: colors.opacityWhite,
    borderColor: colors.gray,
    borderWidth: 1,
  },
  doneButton: {
    backgroundColor: colors.primary,
    width: "50%",
    alignSelf: "center",
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(8),
    marginVertical: "20%",
  },
  reservedNumber: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    marginLeft: 15,
    alignItems: "center",
  },
  arrivalDateText: {
    color: colors.primary,
    marginTop: 5,
  },
  datePickerContainer: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "center",
    marginLeft: 15,
    marginTop: "10%",
    alignItems: "center",
  },
  logo: {
    height: 43,
    width: 43,
    marginRight: 10,
  },
  logoCalender: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 30,
    width: 30,
    marginRight: moderateScale(5),
  },

  label: {
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: colors.white,
  },

  headerContainer: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: moderateScale(15),
  },
  headerText: {
    color: colors.white,
    fontSize: moderateScale(25),
  },
  headerImage: {
    height: moderateScale(40),
    width: moderateScale(40),
    marginRight: moderateScale(5),
  },
  datePickerView: {
    width: "100%",
  },
  ReserveView: {
    width: "100%",
    marginTop: "8%",
  },
  datepicker: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginRight: moderateScale(5),
  },
  text: {
    fontSize: 12,
    color: colors.primary,
  },
  textInput: {
    color: colors.primary,
    fontSize: 15,
    width: "80%",
    alignSelf: "center",
    marginTop: "2%",
    backgroundColor: colors.opacityWhite,
    borderColor: colors.gray,
    borderWidth: 1,
    paddingLeft: "5%",
  },
});

const mapDitpatchToProps = (dispatch) => {
  return {
    initUser(data) {
      dispatch({
        type: "INIT_USER",
        payload: data,
      });
    },
    initOrder(data) {
      dispatch({
        type: "INIT_ORDER",
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
    initforYou(data) {
      dispatch({
        type: "INIT_FOR_DATA",
        payload: data,
      });
    },
  };
};

export default connect(null, mapDitpatchToProps)(LoginScreen);
