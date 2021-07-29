import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";

function ImageItem({ image, name, price }) {
  const navigation = useNavigation();
  console.log(image);
  return (
    <ImageBackground source={{ uri: image }} style={styles.image}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.backButton}
          source={require("../assets/TopHeader/backButton.png")}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price + "$"}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  backButton: {
    height: 50,
    width: 50,
    marginTop: 30,
    marginStart: 20,
  },
  name: {
    fontSize: 25,
    color: colors.white,
    bottom: 20,
    marginStart: 20,
    position: "absolute",
    fontWeight: "bold",
  },
  price: {
    fontSize: 25,
    color: colors.white,
    bottom: 20,
    marginEnd: 20,
    position: "absolute",
    right: 0,
    fontWeight: "bold",
  },
});
export default ImageItem;
