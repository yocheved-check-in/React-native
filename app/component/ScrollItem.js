import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import { FontAwesome as Icon } from "@expo/vector-icons";

function ScrollItem({
  image,
  description,
  name,
  price,
  isheart,
  isLiked,
  onSelectItem,
}) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isLiked);
  }, []);

  const select = (item) => {
    onSelectItem(item);
  };

  return (
    <TouchableOpacity style={[styles.container]} onPress={(item) => select()}>
      <Image source={{ uri: image }} style={styles.image} />
      {isheart && (
        <TouchableOpacity style={styles.heart} onPress={() => setLiked(!liked)}>
          <Icon
            name={!liked ? "heart-o" : "heart"}
            size={23}
            color={colors.white}
          />
        </TouchableOpacity>
      )}
      <View style={styles.textContainer}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <Text numberOfLines={1} style={[styles.text, styles.name]}>
            {name}
          </Text>
          <Text numberOfLines={1} style={[styles.text, styles.description]}>
            {description}
          </Text>
        </View>
        <Text style={[styles.text, styles.price]}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 160,
    margin: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  image: {
    width: "100%",
    height: 110,
    //borderRadius: 15,
  },
  text: {
    color: colors.primary,
  },
  description: {
    flexShrink: 1,
  },
  price: {
    width: 30,
    right: 0,
    fontWeight: "bold",
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    width: 160,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  heart: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  name: {
    fontWeight: "bold",
  },
});
export default ScrollItem;
