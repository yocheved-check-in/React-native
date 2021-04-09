import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RoomServiceNavigator from "./RoomServiceNavigator";
import SpaNavigator from "./SpaNavigator";
import MainScreen from "../screen/MainScreen";
import { View } from "react-native";
import HouseKeepingScreen from "../screen/HouseKeepingScreen";
import PreArrivelScreen from "../screen/PreArrivelScreen";
import LoginScreen from "../screen/LoginScreen";

function MainNavigator(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="RoomService" component={RoomServiceNavigator} />
      <Stack.Screen name="HouseKeeping" component={HouseKeepingScreen} />
      <Stack.Screen name="Spa" component={SpaNavigator} />
      <Stack.Screen name="Arrivel" component={PreArrivelScreen} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
