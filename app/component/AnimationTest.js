import React from "react";
import { Dimensions } from "react-native";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const MARGIN = 10;
const vHeight = 221 + MARGIN;
const vWidth = 152 + MARGIN;
const width = Dimensions.get("window").width - 64;
const height = (width * vHeight) / vWidth;
const path = ["M1 220.683L150.758 1"];

function AnimationTest(props) {
  return (
    <View style={styles.container}>
      <Svg
        width={width}
        height={height}
        viewBox={[
          -MARGIN / 2,
          -MARGIN / 2,
          vWidth + MARGIN / 2,
          vHeight + MARGIN / 2,
        ].join(" ")}
      >
        {path.map((d, key) => (
          <Path d={d} stroke="black" strokeWidth={10} key={key} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AnimationTest;
