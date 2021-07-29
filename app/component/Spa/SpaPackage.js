import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../config/colors";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";

function SpaPackage(props) {
  return (
    <TouchableOpacity onPress={props.packageOnPress} activeOpacity={1}>
      <Card containerStyle={styles.container}>
        <ImageBackground
          imageStyle={{ borderRadius: 5 }}
          style={[styles.backgroundImage]}
          source={props.backgroundImage}
        >
          <View style={styles.contentContainer}>
            <Text style={styles.cardText}>{props.name}</Text>
            <TouchableOpacity onPress={props.onPress}>
              <Icon
                style={styles.listForwardImage}
                type="font-awesome"
                name="angle-right"
                color="#2699FB"
                size={30}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: moderateScale(340),
    height: moderateScale(105),
    elevation: 10,
    margin: 0,
    padding: 0,
    borderRadius: moderateScale(3),
    alignSelf: "center",
    marginBottom: moderateScale(18),
    borderRadius: moderateScale(5),
  },

  backgroundImage: {
    width: moderateScale(340),
    height: moderateScale(105),
    justifyContent: "center",
    opacity: 0.9,
    resizeMode: "contain",
  },
  contentContainer: {
    width: "80%",
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  cardText: {
    backgroundColor: "rgba(253,253,253,0.8)",
    width: moderateScale(200),
    padding: moderateScale(12),
    alignSelf: "center",
    textAlign: "center",
    color: colors.darkGray,
    borderRadius: moderateScale(10),
    fontSize: 17,
    fontFamily: "Roboto-Regular",
  },
  listForwardImage: {
    marginTop: moderateScale(8),
    marginRight: moderateScale(10),
  },
});

export default SpaPackage;
