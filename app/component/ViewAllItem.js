import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../config/colors";

function ViewAllItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <ImageBackground
          source={item.image}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.darkenImage} />
          <View style={styles.textContainer}>
            <View style={styles.innerTextContainer}>
              <Text style={[styles.text, styles.name]}>{item.name}</Text>
              <Text numberOfLines={1} style={[styles.text, styles.description]}>
                {item.description}
              </Text>
            </View>
            <Text style={[styles.text, styles.price]}>{item.price + "$"}</Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    alignItems: "center",
  },

  darkenImage: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.6)",
    borderRadius: 15,
  },

  innerTextContainer: {
    flexDirection: "column",
    width: "80%",
  },

  image: {
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  text: {
    fontSize: 13,
    color: colors.white,
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    flexShrink: 1,
  },
  price: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
export default ViewAllItem;
