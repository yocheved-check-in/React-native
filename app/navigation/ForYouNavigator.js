import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import ForYouScreen from "../screen/ForYou/ForYouScreen";
import ForYouAllPackages from "../screen/ForYou/ForYouAllPackages";
import ForYouCompleteDetail from "../screen/ForYou/ForYouCompleteDetail";
import ForYouPackageDetail from "../screen/ForYou/ForYouPackageDetail";
import ForYouOrder from "../screen/ForYou/ForYouOrder";
import forYouOrderSummary from "../screen/ForYou/forYouOrderSummary";

const Stack = createStackNavigator();

const ForYouNavigator = (props) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="ForYouScreen" component={ForYouScreen} />
    <Stack.Screen name="ForYouAllPackages" component={ForYouAllPackages} />
    <Stack.Screen
      name="ForYouCompleteDetail"
      component={ForYouCompleteDetail}
    />
    <Stack.Screen name="ForYouPackageDetail" component={ForYouPackageDetail} />
    <Stack.Screen name="ForYouOrder" component={ForYouOrder} />
    <Stack.Screen name="forYouOrderSummary" component={forYouOrderSummary} />
  </Stack.Navigator>
);

const mapStateToProps = (state) => {
  return { itemScreenOption: state.itemScreenOption };
};

export default connect(mapStateToProps)(ForYouNavigator);
