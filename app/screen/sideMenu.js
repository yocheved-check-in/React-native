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

import { Fumi } from "react-native-textinput-effects";
import { FontAwesome as Icon } from "@expo/vector-icons";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { moderateScale } from "react-native-size-matters";
import { BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Separate from "../component/Separate";

function SideMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={require("../assets/sideicon.png")} />
        <Text style={styles.headerText}>GORDONIA</Text>
      </View>

      <View style={{ width: "100%", height: "100%" }}>
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            marginTop: "7%",
          }}
        >
          {/* <Image style={styles.logo} source={require("../assets/star.png")} /> */}
          <Text style={{ marginLeft: "10%", color: colors.primary }}>Home</Text>
        </View>
        <Separate></Separate>
        <View
          style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.logo}
            source={require("../assets/checkin.png")}
          />
          <Text style={{ marginLeft: "10%", color: colors.primary }}>
            CheckIn/Out
          </Text>
        </View>
        <Separate></Separate>

        <View
          style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.logo}
            source={require("../assets/request.png")}
          />
          <Text style={{ marginLeft: "10%", color: colors.primary }}>
            Request Status
          </Text>
          {/* <Image
            style={styles.logo}
            source={require("../assets/arrow122.png")}
          /> */}
        </View>
        <Separate></Separate>

        <View
          style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            alignItems: "center",
          }}
        >
          <Image style={styles.logo} source={require("../assets/chat.png")} />
          <Text style={{ marginLeft: "10%", color: colors.primary }}>Chat</Text>
        </View>
        <Separate></Separate>
        <View
          style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            alignItems: "center",
          }}
        >
          <Image style={styles.logo} source={require("../assets/star.png")} />
          <Text style={{ marginLeft: "10%", color: colors.primary }}>
            Feedback
          </Text>
        </View>
        <Separate></Separate>
        <View
          style={{
            width: "100%",
            height: 70,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.logo}
            source={require("../assets/prefrence.png")}
          />
          <Text style={{ marginLeft: "10%", color: colors.primary }}>
            Preference
          </Text>
        </View>
        <Separate></Separate>
        <View
          style={{
            width: "100%",
            height: 80,
            flexDirection: "row",
            justifyContent: "flex-start",
            paddingLeft: "20%",
            alignItems: "center",
          }}
        >
          <Image style={styles.logo} source={require("../assets/logout.png")} />
          <Text style={{ marginLeft: "10%", color: colors.primary }}>
            LogOut
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
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
    height: 30,
    width: 30,

    // marginLeft,
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
    justifyContent: "flex-start",
    // alignItems: "center",
    paddingVertical: 17,
  },
  headerText: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
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

export default SideMenu;
