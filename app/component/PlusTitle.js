import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
import colors from "../config/colors";

function PlusTitle({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="plus" color={colors.primary} size={22} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 30,
  },

  text: {
    fontSize: 17,
    fontWeight: "bold",
    justifyContent: "center",
    color: colors.primary,
    marginLeft: 10,
  },
});
export default PlusTitle;
