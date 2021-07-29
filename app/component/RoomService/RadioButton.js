import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";
import SpaItemScreen from "../../screen/SpaItemScreen";
import colors from "../../config/colors";

function RadioButton(props) {
  return (
    <View style={styles.radioButtonsContainer}>
      <TouchableOpacity onPress={props.radioButtonPress}>
        {props.imageChange}
        {props.isSelected ? (
          <Image
            style={styles.radioButtonImage}
            source={require("../../assets/roomServiceDetail/fill.png")}
          ></Image>
        ) : (
          <Image
            style={styles.radioButtonImage}
            source={require("../../assets/roomServiceDetail/circle.png")}
          ></Image>
        )}
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={[
          styles.radioButtonText,
          {
            color: props.isSelected ? colors.primary : colors.spaTextColor,
          },
        ]}
      >
        {props.radioButtonName}(+{parseFloat(props.Price).toFixed(0)}$)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  radioButtonImage: {
    height: moderateScale(19),
    width: moderateScale(19),
    resizeMode: "contain",
  },

  containerCard: {
    elevation: 6,
    width: moderateScale(120),
    alignSelf: "flex-end",
    padding: 7,
    left: moderateScale(8),
    top: moderateScale(20),
  },
  RadioButton: {
    // flexDirection: "row",
    marginLeft: moderateScale(-10),
    paddingLeft: moderateScale(-10),
    justifyContent: "space-evenly",
    paddingVertical: moderateScale(16),
  },
  radioButtonsContainer: {
    flexDirection: "row",
    paddingVertical: moderateScale(15),
  },
  radioButtonText: {
    marginHorizontal: moderateScale(7),
    fontSize: 11.1,
    right: 5,
    fontFamily: "Roboto-Regular",
    fontWeight: "700",
    alignSelf: "center",
  },
});
export default RadioButton;
