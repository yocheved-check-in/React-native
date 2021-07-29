import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  I18nManager as RNI18nManager,
} from "react-native";
import colors from "../../config/colors";

import { moderateScale } from "react-native-size-matters";

function FabIcon(props) {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={props.fabOnPress}
        style={styles.FloatingButton}
      >
        <Image
          style={styles.FloatIcon}
          source={props.image}
         
        />
        <Text style={styles.itemName}>
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  FloatingButton: {
    elevation: 10,
    backgroundColor: "white",
    width: moderateScale(60),
    height: moderateScale(60),
    bottom: moderateScale(10),
    right: 20,
    alignSelf: "flex-end",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  itemName:{ 
    color: colors.primary, 
    bottom: 2, 
    fontSize: 11 
  },
  Fab: {
    position: "absolute",
    width: moderateScale(60),
    height: moderateScale(60),
    margin: 16,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "white",
  },
  FloatIcon: {
    width: moderateScale(23),
    height: moderateScale(23),
    resizeMode: "contain",
  },
});

export default FabIcon;
