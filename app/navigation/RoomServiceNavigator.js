import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CartScreen from "../screen/CartScreen";
import RoomServiceItemScreen from "../screen/RoomServiceItemScreen";
import RoomServiceScreen from "../screen/RoomServiceScreen/RoomServiceScreen";
import ViewAllScreen from "../screen/ViewAllScreen";
import { connect } from "react-redux";
import RoomServiceDetail from "../screen/RoomServiceScreen/RoomServiceDetail";
import RoomOrders from "../screen/RoomServiceScreen/RoomOrders";
import RoomOrderPlacement from "../screen/RoomServiceScreen/RoomOrderPlacement";

const Stack = createStackNavigator();

const RoomServiceNavigator = (props) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="RoomServiceScreen" component={RoomServiceScreen} />
    <Stack.Screen name="RoomServiceDetail" component={RoomServiceDetail} />
    <Stack.Screen
      name="RoomServiceItem"
      component={RoomServiceItemScreen}
      options={props.itemScreenOption}
    />

    <Stack.Screen name="ViewAll" component={ViewAllScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="RoomOrders" component={RoomOrders} />
    <Stack.Screen name="RoomOrderPlacement" component={RoomOrderPlacement} />
  </Stack.Navigator>
);

const mapStateToProps = (state) => {
  return { itemScreenOption: state.itemScreenOption };
};

export default connect(mapStateToProps)(RoomServiceNavigator);
