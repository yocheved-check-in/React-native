import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";

function Separate(props) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: "100%",
    backgroundColor: colors.lightGray,
  },
});
export default Separate;
