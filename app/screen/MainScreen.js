import * as React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import colors from "../config/colors";
import Chart from "../component/Main/Chart";
import Tabbar from "../component/Main/Tabbar";

// constants coming from context api irl.
const exampledata = [
  {
    x: 1,
    y: 3.3,
    url: require("../assets/main/spa.png"),
    pressedUrl: require("../assets/main/spaw.png"),
    pressed: 0,
  },
  {
    x: 2,
    y: 3.3,
    url: require("../assets/main/food.png"),
    pressedUrl: require("../assets/main/foodw.png"),
    pressed: 0,
  },
  {
    x: 3,
    y: 3.3,
    url: require("../assets/main/house.png"),
    pressedUrl: require("../assets/main/housew.png"),
    pressed: 0,
  },
];

const pieColors = [
  colors.opacityWhite,
  colors.opacityWhite,
  colors.opacityWhite,
];

function MainScreen({ navigation }) {
  return (
    <>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.background}
      >
        <Chart data={exampledata} colors={pieColors} navigation />
      </ImageBackground>

      <View style={styles.tabContainer}>
        <Tabbar />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  tabContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});

export default MainScreen;
