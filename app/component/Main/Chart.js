import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { VictoryPie } from "victory-native";
import ChartLabel from "./ChartLabel";
import Svg from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const mainEnum = Object.freeze({
  SpaScreen: 1,
  RoomServiceScreen: 2,
  HouseKeepingScreen: 3,
});

navigation = null;
const moveNextScreen = (index) => {
  switch (index) {
    case mainEnum.RoomServiceScreen:
      navigation.navigate("RoomService");
      break;

    case mainEnum.HouseKeepingScreen:
      navigation.navigate("HouseKeeping");
      break;

    case mainEnum.SpaScreen:
      navigation.navigate("Spa");
      break;

    default:
      break;
  }
};

function Chart({ data, colors }) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  var chartRadius = screenWidth / 2 - 30;
  var innerRadius = chartRadius / 2 - 30;
  navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.jpg")}
        style={styles.logoImage}
      />
      <Svg width={screenWidth} height={screenHeight} style={styles.svg}>
        <VictoryPie
          name="pie"
          standalone={false}
          padAngle={1}
          radius={chartRadius}
          innerRadius={innerRadius}
          labelRadius={({ innerRadius, radius }) =>
            radius - (radius - innerRadius) / 2
          }
          x={(data) => data.x}
          width={screenWidth}
          height={screenHeight}
          data={data}
          colorScale={colors}
          labelPosition="centroid"
          labelComponent={<ChartLabel />}
          events={[
            {
              target: "data",
              childName: "pie",
              eventHandlers: {
                onPressIn: (e) => {
                  return [
                    {
                      mutation: (props) => {
                        const fill = props.style.fill;
                        if (fill === colors.opacity) return null;
                        else {
                          return {
                            style: { fill: colors.opacity },
                          };
                        }
                      },
                    },
                    {
                      target: "labels",
                      mutation: (props) => {
                        return props.text === "clicked"
                          ? null
                          : { text: "clicked" };
                      },
                    },
                  ];
                },
                onPressOut: (e) => {
                  return [
                    {
                      mutation: (props) => {
                        moveNextScreen(props.slice.data.x);
                        if (props.style.fill === colors.opacity) return null;
                      },
                    },
                    {
                      target: "labels",
                      mutation: (props) => {
                        return props.text === "clicked"
                          ? null
                          : { text: "clicked" };
                      },
                    },
                  ];
                },
              },
            },
          ]}
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  svg: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage:{
    width: innerRadius * 2 - 5,
    height: innerRadius * 2 - 5,
    borderRadius: innerRadius,
    alignItems: "center",
    position: "absolute",
    justifyContent: "center",
  }
});
export default Chart;
