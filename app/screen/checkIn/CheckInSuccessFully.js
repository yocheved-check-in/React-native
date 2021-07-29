import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import FabIcon from "../../component/ConstantStyles/FabIcon.js";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";

function RoomNumberScreen(props) {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />
      <TopHeader
        title={"GORDONTA"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        style={styles.header}
        logoImage={require("../../assets/TopHeader/logo1.png")}
        {...navigation}
        rightImage={require("../../assets/checkIn/crossIcon.png")}
        leftImagePress={() => navigation.goBack()}
      />

      <View style={styles.tabView}>
        <View style={styles.firstTab}>
          <Image
            source={require("../../assets/checkIn/BellBoy.png")}
            style={styles.topImage}
          />
          <Text style={styles.tabText}>BellBoy</Text>
        </View>
        <View style={styles.Tab}>
          <Image
            source={require("../../assets/checkIn/directions.png")}
            style={styles.topImage}
          />
          <Text style={styles.tabText}>Directions</Text>
        </View>
        <View style={styles.Tab}>
          <Image
            source={require("../../assets/checkIn/share.png")}
            style={styles.topImage}
          />
          <Text style={styles.tabText}>Share</Text>
        </View>
      </View>

      <View style={{ flex: 0.8 }}>
        <View style={styles.circleView}>
          <Image
            source={require("../../assets/checkIn/room.png")}
            style={styles.roomImage}
          />
          <Text style={styles.CheckInText}>Check-In successfully!</Text>
          <Text style={styles.roomNumberText}>
            Your Room Number Is{"\n"}
            {props.order.room_number}
          </Text>
          <Text style={styles.basicText}>
            The room is ready for you{"\n"} Enjoy your stay
          </Text>
        </View>

        <View>
          <TouchableOpacity
            // onPress={() => navigation.navigate("Main")}
            style={{
              alignSelf: "center",
              backgroundColor: colors.primary,
              marginTop: "5%",
              padding: moderateScale(15),
              borderRadius: moderateScale(10),
            }}
          >
            <Text style={{ color: "white" }}>Go to menu</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.2 }}>
        <View
          style={{ alignSelf: "center", marginTop: "7%", flexDirection: "row" }}
        >
          <Text style={styles.textStyle}>
            press here to open your room door {"\n"}the door will be open for 5
            seconds
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: moderateScale(3) }}>
          <Image
            source={require("../../assets/checkIn/save.png")}
            style={styles.saveImage}
          />
          <Text style={styles.saveText}>save</Text>
        </View>
        <View style={styles.lineView}></View>
      </View>
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
  header: {
    top: 0,
    position: "absolute",
  },
  circleView: {
    width: moderateScale(300),
    height: moderateScale(300),
    backgroundColor: colors.white,
    borderRadius: moderateScale(300),
    alignSelf: "center",
    marginTop: moderateScale(25),
    padding: moderateScale(5),
  },
  roomImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    resizeMode: "contain",
    marginTop: moderateScale(50),
    alignSelf: "center",
  },
  CheckInText: {
    color: colors.primary,
    alignSelf: "center",
    marginTop: moderateScale(5),
  },
  roomNumberText: {
    fontSize: moderateScale(25),
    alignSelf: "center",
    textAlign: "center",
    color: colors.primary,
  },
  basicText: {
    fontSize: moderateScale(14),
    alignSelf: "center",
    textAlign: "center",
    marginTop: moderateScale(5),
    color: colors.spaTextColor,
  },
  saveImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    alignSelf: "center",
  },
  saveView: {
    // position: "absolute",
    // bottom: 5,
    // left: moderateScale(10),
    //flexDirection: "row",
    // justifyContent: "space-between", backgroundColor: "red"
  },
  saveText: {
    fontSize: moderateScale(14),
    marginLeft: moderateScale(5),
    color: colors.primary,
  },
  saveContent: {
    // flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "red",
    // marginBottom: "10%"
  },
  lineView: {
    borderBottomColor: colors.primary,
    borderBottomWidth: moderateScale(2),
    width: moderateScale(60),
    marginTop: 1,
    marginLeft: moderateScale(3),
  },
  textStyle: {
    color: colors.spaTextColor,
    fontSize: moderateScale(10.5),
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  textView: {
    position: "absolute",
    bottom: moderateScale(60),
    alignSelf: "center",
    // flexDirection: "row",
    backgroundColor: "red",
  },
  arrowIconStyle: {
    height: moderateScale(18),
    width: moderateScale(18),
    resizeMode: "contain",
    alignSelf: "center",
  },
  fabIcon: {
    height: moderateScale(70),
    width: moderateScale(70),
    resizeMode: "contain",
  },

  fabIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  tabView: {
    height: moderateScale(80),
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
  },
  topImage: {
    height: moderateScale(19),
    width: moderateScale(19),
    resizeMode: "contain",
  },
  firstTab: {
    alignItems: "center",
    justifyContent: "center",
    width: "33.3%",
    flexDirection: "row",
    borderColor: colors.primary,
    borderBottomWidth: 2,
  },
  tabText: {
    color: colors.primary,
    marginLeft: moderateScale(3),
  },
  Tab: {
    alignItems: "center",
    justifyContent: "center",
    width: "33.3%",
    flexDirection: "row",
    // backgroundColor: "green"
  },
});

const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
    order: state.order,
  };
};

export default connect(mapStateToProps)(RoomNumberScreen);
