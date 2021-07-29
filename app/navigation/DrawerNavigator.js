import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNavigator from "./MainNavigator";
import colors from "../config/colors";
import TopHeader from "../component/TopHeader";
import { moderateScale } from "react-native-size-matters";
import FabIcon from "../component/FabIcon";
import DatabaseService from "../services/DatabaseService";
import AsyncStorage from "@react-native-community/async-storage";
import { connect } from "react-redux";

const sideMenuContent = [
  {
    name: "Home",
    Image: require("../assets/sideMenu/checkin.png"),
    screen: "Main",
  },
  {
    name: "Check In / Out",
    Image: require("../assets/sideMenu/checkin.png"),
    screen: "CommingSoon",
  },
  {
    name: "Request Status",
    Image: require("../assets/sideMenu/requestStatus.png"),
    screen: "CommingSoon",
  },
  {
    name: "Chat",
    Image: require("../assets/sideMenu/chat.png"),
    screen: "Chat",
  },
  {
    name: "Feedback",
    Image: require("../assets/sideMenu/feedback.png"),
    screen: "CommingSoon",
  },
  {
    name: "Prefrences",
    Image: require("../assets/sideMenu/prefrences.png"),
    screen: "CommingSoon",
  },
  {
    name: "Log Out",
    Image: require("../assets/sideMenu/logout.png"),
    screen: "Login",
  },
];

function CustomDrawerContent(props) {
  const [isSelected, isSetSelected] = useState(null);

  resetScreen = async () => {
    AsyncStorage.clear().then((response) => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader
        title={"GORDONTA"}
        headerImage={require("../assets/sideicon.png")}
        logoImage={require("../assets/TopHeader/logo1.png")}
      />
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />

      <FlatList
        numColumns={1}
        contentContainerStyle={{ flexGrow: 1 }}
        data={sideMenuContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                isSetSelected(index);
                if (index == 6) {
                  resetScreen();
                }
                setTimeout(() => {
                  navigation.navigate(item.screen);
                }, 500);
              }}
              style={styles.listContainer}
            >
              <Image style={[styles.image]} source={item.Image} />
              <Text
                style={[
                  styles.listName,
                  {
                    fontFamily: "Roboto-Light",
                    fontStyle: index == isSelected ? "bold" : null,
                    fontSize:
                      index == isSelected
                        ? moderateScale(18)
                        : moderateScale(16),
                  },
                ]}
              >
                {item.name}
              </Text>
              <Image
                style={styles.listForwardImage}
                source={require("../assets/sideMenu/forwardIcon.png")}
              />
            </TouchableOpacity>
            <View style={styles.emptyView}></View>
          </View>
        )}
      />

      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={require("../assets/sideMenu/profile.png")}
        />
        <View style={styles.profileView}>
          <Text style={[styles.profileText, { fontSize: moderateScale(20) }]}>
            Profile
          </Text>
          <Text style={[styles.profileText, { fontSize: moderateScale(16) }]}>
            {props.username}
          </Text>
        </View>
      </View>
      <View style={styles.fabIconContainer}>
        <FabIcon />
      </View>
    </SafeAreaView>
  );
}

function DrawerNavigator(props) {
  const Drawer = createDrawerNavigator();

  let userprops = {
    username: props.user.name,
  };

  return (
    <Drawer.Navigator
      drawerContent={(dataprops) => (
        <CustomDrawerContent {...dataprops} {...userprops} />
      )}
      drawerStyle={{ width: "96%" }}
    >
      <Drawer.Screen name="Home" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  emptyView: {
    height: moderateScale(1),
    backgroundColor: colors.lineColor,
    width: "92%",
    alignSelf: "center",
  },
  profileView: {
    flexDirection: "column",
    alignSelf: "center",
    paddingHorizontal: moderateScale(10),
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: moderateScale(15),
    marginTop: moderateScale(10),
  },
  listName: {
    color: colors.primary,
    width: "48%",
  },
  listForwardImage: {
    height: moderateScale(20),
    width: moderateScale(20),
    justifyContent: "flex-end",
  },
  image: {
    height: moderateScale(30),
    width: moderateScale(30),
    resizeMode: "contain",
  },
  profileImage: {
    height: moderateScale(60),
    width: moderateScale(60),
    justifyContent: "center",
    alignSelf: "center",
  },

  profileText: {
    color: colors.primary,
  },
  profileContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "12%",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  fabIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(DrawerNavigator);
