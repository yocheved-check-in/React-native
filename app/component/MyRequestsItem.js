import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";

import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NumericInput from "react-native-numeric-input";
function MyRequestsItem({ item, onDelete }) {
  const [amount, setAmount] = useState(1);

  const amountChange = (value) => {
    console.log(value);
    setAmount(value);
    item.amount = value;
    //update();
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.amount}> */}

      {/* </View> */}
      <View style={styles.row}>
        <View style={styles.column}>
          <MaterialCommunityIcons
            name="playlist-edit"
            size={20}
            color={colors.primary}
            style={styles.icon}
          />
          <MaterialCommunityIcons
            name="timetable"
            size={20}
            color={colors.primary}
            style={styles.icon}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.selectedDate}</Text>
        </View>

        <View style={styles.column}>
          <NumericInput
            value={amount}
            initValue={amount}
            minValue={1}
            type="up-down"
            totalWidth={70}
            onChange={(value) => amountChange(value)}
            upDownButtonsBackgroundColor={colors.primary}
            leftButtonBackgroundColor="#E56B70"
          />
        </View>
      </View>
      {/* <MaterialCommunityIcons
        style={styles.deleteIcon}
        name="delete-circle-outline"
        size={24}
        color={colors.primary}
        onPress={onDelete}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.opacityWhite,
    borderRadius: 20,
    width: "80%",
    justifyContent: "center",
    height: 100,
    alignSelf: "center",
    margin: 7,
  },
  text: {
    color: colors.primary,
    marginBottom: 10,
    fontSize: 17,
    justifyContent: "center",
    fontWeight: "bold",
    // marginLeft: 15,
  },
  icon: {
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  column: {
    flexDirection: "column",
    justifyContent: "space-between",
  },

  deleteIcon: {
    alignContent: "flex-end",
    position: "absolute",
    right: 5,
    bottom: 5,
  },
});
export default MyRequestsItem;
