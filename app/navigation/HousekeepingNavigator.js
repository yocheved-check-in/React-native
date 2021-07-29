import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import HouseKeepingAllPackages from "../screen/HouseKeeping/HouseKeepingAllPackages";
import HouseKeepingViewAll from "../screen/HouseKeeping/HouseKeepingViewAll";
import HouseKeepingOrderSummary from "../screen/HouseKeeping/HouseKeepingOrderSummary";
import OrderPlacement from "../screen/HouseKeeping/OrderPlacement";

const Stack = createStackNavigator();

const HouseKeepingNavigator = (props) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen
      name="HouseKeepingAllPackages"
      component={HouseKeepingAllPackages}
    />
    <Stack.Screen name="HouseKeepingViewAll" component={HouseKeepingViewAll} />
    <Stack.Screen name="OrderPlacement" component={OrderPlacement} />
    <Stack.Screen
      name="HouseKeepingOrderSummary"
      component={HouseKeepingOrderSummary}
    />
  </Stack.Navigator>
);

const mapStateToProps = (state) => {
  return { itemScreenOption: state.itemScreenOption };
};

export default connect(mapStateToProps)(HouseKeepingNavigator);
