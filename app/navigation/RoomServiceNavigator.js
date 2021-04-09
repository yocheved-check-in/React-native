import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import CartScreen from "../screen/CartScreen";
import RoomServiceItemScreen from "../screen/RoomServiceItemScreen";
import RoomServiceScreen from "../screen/RoomServiceScreen";
import ViewAllScreen from "../screen/ViewAllScreen";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const RoomServiceNavigator = (props) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="RoomService" component={RoomServiceScreen} />
    <Stack.Screen
      name="RoomServiceItem"
      component={RoomServiceItemScreen}
      options={props.itemScreenOption}
    />
    <Stack.Screen name="ViewAll" component={ViewAllScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

const mapStateToProps = (state) => {
  return { itemScreenOption: state.itemScreenOption };
};

export default connect(mapStateToProps)(RoomServiceNavigator);
