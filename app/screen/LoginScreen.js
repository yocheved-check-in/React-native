import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  InputText,
  Modal,
  Image,
} from "react-native";
import { Fumi } from "react-native-textinput-effects";
import { FontAwesome as Icon } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import colors from "../config/colors";
import { TextInputMask } from "react-native-masked-text";
import { DateInput } from "react-native-date-input";
import dayjs from "dayjs";
import moment from "moment";
import { Button } from "react-native-paper";
import { WebView } from "react-native-webview";
import { BASE_URL } from "@env";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function LoginScreen(props) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [dateString, setDateString] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  let dateInput = null;

  const navigation = useNavigation();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    var mydate = moment(currentDate).format("DD-MM-YYYY");
    setDateString(mydate);
    setShow(false);
  };

  const openDatePicker = () => {
    setShow(true);
  };

  const login = () => {
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
      .finally(navigation.navigate("Main"));
  };

  const parseLoginJson = (json) => {
    props.initRoomService(json.data.food);
    props.initUser(json.data.order.user);
    spaBuilder(json.data.spa);
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

  const sortLengthArray = (item) => {
    var lengthArray = [];
    var tmp = {}; //create a temporary object

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
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/checkinLogo.png")}
        width={110}
        height={110}
      />
      <Fumi
        label={"Order number"}
        iconClass={Icon}
        iconName={"reorder"}
        iconColor={colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        style={styles.input}
        onChangeText={(text) => setOrderNumber(text)}
      />

      <Fumi
        label={"Arrival date"}
        iconClass={Icon}
        iconName={"calendar"}
        iconColor={colors.primary}
        iconSize={20}
        iconWidth={40}
        inputPadding={16}
        style={styles.input}
        value={dateString}
        onFocus={() => openDatePicker()}
      />

      <Button
        color={colors.opacityWhite}
        mode="contained"
        onPress={() => login()}
        labelStyle={styles.label}
        style={styles.loginButton}
      >
        Login
      </Button>

      <Modal
        animationType="fade"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!show);
        }}
        style={styles.modal}
        presentationStyle="overFullScreen"
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: colors.white,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: colors.primary,
            }}
          >
            <DateTimePicker
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
              style={styles.datepicker}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  input: {
    backgroundColor: colors.opacityWhite,
    marginTop: 40,
    borderColor: colors.gray,
    borderRadius: 15,
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },

  logo: {
    alignSelf: "center",
    marginTop: 70,
    marginBottom: 30,
  },

  datepicker: {
    color: colors.primary,
  },

  modal: {
    width: "50%",
    height: "50%",
    backgroundColor: colors.primary,
  },

  label: {
    padding: 7,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    color: colors.white,
  },

  loginButton: {
    marginTop: 70,
    width: "90%",
    marginBottom: 30,
    alignSelf: "center",
    backgroundColor: colors.primary,
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
  };
};

export default connect(null, mapDitpatchToProps)(LoginScreen);
