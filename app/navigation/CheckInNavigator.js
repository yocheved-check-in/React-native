import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { connect } from "react-redux";
import AddCheckInName from "../screen/checkIn/AddCheckInName";
import PersonalInformation from "../screen/checkIn/PersonalInformation";
import PersonalInformation2 from "../screen/checkIn/PersonalInformation2";
import PrivacyPolicy1 from "../screen/checkIn/PrivacyPolicy1";
import drawDigitalSignature from "../screen/checkIn/drawDigitalSignature";
import showDigitalSignature from "../screen/checkIn/showDigitalSignature";
import uploadDocuments from "../screen/checkIn/uploadDocuments";
import checkinSuccessFully from "../screen/checkIn/checkinSuccessFully";

const Stack = createStackNavigator();

const CheckInNavigator = (props) => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="AddCheckInName" component={AddCheckInName} />
    <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
    <Stack.Screen
      name="PersonalInformation2"
      component={PersonalInformation2}
    />
    <Stack.Screen name="PrivacyPolicy1" component={PrivacyPolicy1} />
    <Stack.Screen
      name="drawDigitalSignature"
      component={drawDigitalSignature}
    />
    <Stack.Screen
      name="showDigitalSignature"
      component={showDigitalSignature}
    />
    <Stack.Screen name="uploadDocuments" component={uploadDocuments} />
    <Stack.Screen name="checkinSuccessFully" component={checkinSuccessFully} />
  </Stack.Navigator>
);

const mapStateToProps = (state) => {
  return { itemScreenOption: state.itemScreenOption };
};

export default connect(mapStateToProps)(CheckInNavigator);
