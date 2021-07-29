import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

import { DateTimePickerModal } from "react-native-modal-datetime-picker";
import { Entypo as Icon } from "@expo/vector-icons";
import { moderateScale } from "react-native-size-matters";
import { TouchableOpacity } from "react-native-gesture-handler";
function datePicker(props) {
  const [dateString, setDateString] = useState("");

  return (
    <TouchableOpacity
      onPress={props.showDatePicker}
      style={props.containerDatePicker}
    >
      <DateTimePickerModal
        is24Hour={true}
        isVisible={props.isDatePickerVisible}
        mode={props.mode}
        onConfirm={props.setDate}
        onCancel={props.hideDatePicker}
      />
      <Icon
        name={props.iconName}
        size={25}
        color={colors.primary}
        style={{ paddingHorizontal: "3%" }}
      />
      <Text>{props.date}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    color: colors.primary,
    fontSize: 15,
    width: "80%",
    alignSelf: "center",
    paddingVertical: moderateScale(12),
    marginTop: "2%",
    paddingHorizontal: "2%",
    backgroundColor: colors.opacityWhite,
    borderColor: colors.gray,
    borderWidth: 1,
  },
});
export default datePicker;
