import React, { useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RoomServiceNavigator from "./RoomServiceNavigator";
import SpaNavigator from "./SpaNavigator";
import MainScreen from "../screen/MainScreen";
import PreArrivelScreen from "../screen/PreArrivelScreen";
import LoginScreen from "../screen/LoginScreen";
import SideMenu from "../screen/sideMenu";
import CommingSoon from "../screen/CommingSoon";
import OrderSummary from "../screen/OrderSummary";
import Chat from "../screen/ChatScreen";
import CheckInNavigator from "./checkInNavigator";
import ForYouNavigator from "./ForYouNavigator";
import HousekingNavigator from "./HousekingNavigator";
import AnimatedScreen from "../screen/SplashScreen";

export default function MainNavigator(props) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AnimatedScreen" component={AnimatedScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="SideMenu" component={SideMenu} />
      <Stack.Screen name="RoomServiceScreen" component={RoomServiceNavigator} />
      <Stack.Screen name="CommingSoon" component={CommingSoon} />
      <Stack.Screen name="Spa" component={SpaNavigator} />
      <Stack.Screen name="Arrivel" component={PreArrivelScreen} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="CheckInScreen" component={CheckInNavigator} />
      <Stack.Screen name="ForYouScreen" component={ForYouNavigator} />
      <Stack.Screen
        name="HouseKeepingAllPackages"
        component={HousekingNavigator}
      />
    </Stack.Navigator>
  );
}
