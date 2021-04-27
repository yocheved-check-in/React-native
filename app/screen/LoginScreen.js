import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Image,
  Text,
  TextInput,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";
import { connect } from "react-redux";
import { Fumi } from "react-native-textinput-effects";
import { FontAwesome as Icon } from "@expo/vector-icons";
import moment from "moment";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { moderateScale } from "react-native-size-matters";
import { BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

function LoginScreen(props) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateString, setDateString] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const navigation = useNavigation();
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    var mydate = moment(currentDate).format("DD-MM-YYYY");
    setDateString(mydate);
    setShow(false);
  };
  const showMode = () => {
    setShow(true);
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const login = () => {
    if (orderNumber == "" && dateString == "") {
      alert("Please Enter Reservation Code");
    } else {
      var url =
        BASE_URL +
        "Signin?" +
        new URLSearchParams({
          OrderNumber: orderNumber,
          ArrivalDate: dateString,
          langId: 1,
        });

      fetch(url)
        .then((response) => response.json())
        .then((json) => parseLoginJson(json))
        .catch((error) => console.error(error))
        .finally
        // navigation.navigate("Main")
        ();
    }

    const parseLoginJson = (json) => {
      if (json.data) {
        props.initRoomService(json.data.food);
        props.initUser(json.data.order.user);
        props.initHouseKeeping(json.data.housekeeping);
        spaBuilder(json.data.spa);

        navigation.navigate("Main");
      } else {
        alert("Error " + json.message);
      }
    };

    const spaBuilder = (spa) => {
      console.log(spa);
      spa.map((category) => {
        console.log(category);
        category.items.map((item) => {
          console.log(item);
          sortLengthArray(item);
        });
      });

      props.initSpa(spa);
    };
  };

  const sortLengthArray = (item) => {
    var lengthArray = [];
    var tmp = {};

    item.length.forEach((element) => {
      console.log(element);

      if (lengthArray.length === 0)
        lengthArray.push({
          value: element + " min",
          label: element + " min",
          selected: "true",
        });
      else {
        lengthArray.push({
          value: element + " min",
          label: element + " min",
        });
      }
      console.log("lengthArray" + lengthArray);
      item.length = lengthArray;
    });
  };

  return (
    // <View style={styles.container}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/checkinLogo.png")}
        />
        <Text style={styles.headerText}>checkIn</Text>
      </View>

      <View style={styles.secondview}>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            alignSelf: "center",
            marginLeft: 15,
            marginTop: "10%",
          }}
        >
          <Image
            style={styles.logoCalender}
            source={require("../assets/onlycalender.png")}
          />
          <Text
            style={{
              color: colors.primary,
              marginTop: 5,
            }}
          >
            ArrivalDate
          </Text>
        </View>
        <Fumi
          marginBottom={11}
          iconClass={Icon}
          iconName={"calendar"}
          iconColor={colors.primary}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.input}
          value={dateString}
          onFocus={() => showDatepicker()}
        />
      </View>
      <View style={styles.ReserveView}>
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            alignSelf: "center",
            marginLeft: 15,
          }}
        >
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
          keyboardType={"numeric"}
          placeholderTextColor="grey"
          maxLength={10}
          returnKeyType="done"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(text) => setOrderNumber(text)}
          onSubmitEditing={() => login()}
        />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  input: {
    backgroundColor: colors.opacityWhite,
    borderColor: colors.gray,
    borderWidth: 1,
    marginTop: 15,
    width: "80%",
    alignSelf: "center",
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
  },

  label: {
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: colors.white,
  },

  header: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
  },
  headerText: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
  secondview: {
    width: "100%",
    marginBottom: "5%",
  },
  ReserveView: {
    width: "100%",
    marginTop: 15,
  },
  datepicker: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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

export default connect(null, mapDitpatchToProps)(LoginScreen);
