import React from "react";
import { View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNavigator from "./MainNavigator";
import ChatScreen from "../screen/ChatScreen";
import CheckinScreen from "../screen/CheckinScreen";
import FeedbackScreen from "../screen/FeedbackScreen";
import PreArrivelScreen from "../screen/PreArrivelScreen";
import LoginScreen from "../screen/LoginScreen";

function DrawerNavigator(props) {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={MainNavigator} />
      <Drawer.Screen name="My order" component={ChatScreen} />
      <Drawer.Screen name="Logout" component={CheckinScreen} />
      <Drawer.Screen name="My messeges" component={FeedbackScreen} />
      <Drawer.Screen name="Privacy policy" component={PreArrivelScreen} />
      <Drawer.Screen name="Terms of services" component={LoginScreen} />
      <Drawer.Screen name="Language" component={MainNavigator} />
      <Drawer.Screen name="Profile" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
