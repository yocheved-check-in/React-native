import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Animated } from "react-native";
import CartScreen from "../screen/CartScreen";
import SpaItemScreen from "../screen/SpaItemScreen.js";
import SpaScreen from "../screen/SpaScreen";
import ViewAllScreen from "../screen/ViewAllScreen";
import { connect } from "react-redux";

const Stack = createStackNavigator();

const SpaNavigator = (props) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Spa" component={SpaScreen} />
    <Stack.Screen
      name="SpaItem"
      component={SpaItemScreen}
      options={props.itemScreenOption}
    />
    <Stack.Screen name="ViewAll" component={ViewAllScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

const mapStateToProps = (state) => {
  return { itemScreenOption: state.itemScreenOption };
};

export default connect(mapStateToProps)(SpaNavigator);
