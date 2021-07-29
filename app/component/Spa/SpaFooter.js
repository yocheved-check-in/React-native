import React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import FabIcon from "../../component/ConstantStyles/FabIcon";
import { moderateScale } from "react-native-size-matters";
import colors from "../../config/colors";

function SpaFooter(props) {
  return (
    <View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={styles.addTreatmentTouchable}
          onPress={props.addTreatmentPress}
        >
          <Text style={styles.addTreatmentText}>Add Treatment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={props.disabled}
          onPress={props.nextButtonPress}
          style={
            props.disabledStyle ? styles.nextButton : styles.disableNextButton
          }
        >
          <Text style={{ color: "white" }}>Next</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fabIconContainer}>
        <FabIcon
          image={require("../../assets/fabIcon/room.png")}
          name={"room"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fabIconContainer: {
    justifyContent: "flex-start",
    marginTop: moderateScale(15),
    top: 7,
  },
  addTreatmentTouchable: {
    alignSelf: "center",
    justifyContent: "center",
  },
  addTreatmentText: {
    alignSelf: "center",
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 16,
  },
  nextButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: moderateScale(10),
    backgroundColor: colors.backgroundColor,
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  disableNextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.lightBlue,
    borderRadius: 7,
  },
});
export default SpaFooter;
