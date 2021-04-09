import React from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../config/colors";

function CircleIcon({ color, size, icon, bottom }) {
  return (
    <View
      style={[
        styles.circle,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
          bottom,
        },
      ]}
    >
      <Image
        source={icon}
        style={[styles.icon, { height: size - 30, width: size - 30 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: "absolute",
    //bottom: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    tintColor: colors.white,
    resizeMode: "contain",
  },
});
export default CircleIcon;
