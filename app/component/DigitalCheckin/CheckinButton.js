import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import colors from "../../config/colors";

function CheckinButton({ icon, text, pressed }) {
  return (
    <SafeAreaView style={styles.container}>
      <Icon name={icon} size={20} color={colors.primary} style={styles.icon} />
      <Text style={styles.text}>{text}</Text>
      <Icon
        name="plus"
        size={20}
        color={colors.primary}
        style={styles.icon}
        onPress={pressed}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.opacityWhite,
    borderRadius: 15,
    width: "80%",
    height: 50,
    justifyContent: "space-between",
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
  },
  icon: {
    paddingStart: 15,
    paddingEnd: 15,
  },
});
export default CheckinButton;
