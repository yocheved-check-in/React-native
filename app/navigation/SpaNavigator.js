import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CartScreen from "../screen/CartScreen";
import SpaItemScreen from "../screen/SpaItemScreen.js";
import SpaScreen from "../screen/SpaScreens/SpaScreen";
import ViewAllScreen from "../screen/ViewAllScreen";
import { connect } from "react-redux";
import SpaAllPackages from "../screen/SpaScreens/SpaAllPackages";
import SpaPackageDetail from "../screen/SpaScreens/SpaPackagesDetail";
import SpaCompleteDetail from "../screen/SpaScreens/SpaPackageCompleteDetail";
import spaOrder from "../screen/SpaScreens/spaOrder";

import SpaOrderSummary from "../screen/SpaScreens/spaOrderSummary";

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
    <Stack.Screen name="SpaAllPackages" component={SpaAllPackages} />
    <Stack.Screen name="SpaPackageDetail" component={SpaPackageDetail} />
    <Stack.Screen name="SpaCompleteDetail" component={SpaCompleteDetail} />

    <Stack.Screen name="spaOrder" component={spaOrder} />

    <Stack.Screen name="SpaOrderSummary" component={SpaOrderSummary} />
  </Stack.Navigator>
);

const mapStateToProps = (state) => {
  return { itemScreenOption: state.itemScreenOption };
};

export default connect(mapStateToProps)(SpaNavigator);
