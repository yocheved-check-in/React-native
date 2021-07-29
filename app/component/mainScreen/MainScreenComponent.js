import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import { moderateScale } from "react-native-size-matters";

function MainScreenComponent(props) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={props.onPress}
      style={styles.backgroundImageView}
    >
      <ImageBackground
        imageStyle={{ borderRadius: 20 }}
        style={styles.backgroundImage}
        source={props.backgroundImage}
      >
        <View style={props.highlightedStyle}>
          <View style={styles.middleImage}>
            <Image style={styles.heart} source={props.middleImage} />
            <Text style={props.textStyle}>{props.name}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backgroundImageView: {
    marginBottom: moderateScale(-18),
  },

  backgroundImage: {
    height: moderateScale(220),
    width: moderateScale(330),
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
  },
  middleImage: {
    height: 90,
    width: 130,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.opacityWhite,
    borderRadius: 10,
  },
  heart: {
    height: 35,
    width: 40,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
export default MainScreenComponent;
