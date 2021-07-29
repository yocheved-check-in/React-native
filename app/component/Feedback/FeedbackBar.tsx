// import React from "react";
// import { StyleSheet, Dimensions, View } from "react-native";
// import Animated from "react-native-reanimated";
// import colors from "../../config/colors";
// import Face from "./Face";

// const { Value, event, divide, call, multiply } = Animated;
// const { width } = Dimensions.get("window");
// const smileyWidth = width / 5;

// // eslint-disable-next-line react/prefer-stateless-function
// export default class FeedbackBar extends React.Component {
//   x = new Value(0);

//   onScroll = event(
//     [
//       {
//         nativeEvent: {
//           contentOffset: { x: this.x },
//         },
//       },
//     ],
//     { useNativeDriver: true }
//   );

//   render() {
//     const { onScroll, x } = this;
//     const happiness = divide(x, width - smileyWidth);
//     const translateX = x;
//     return (
//       <View style={styles.root}>
//         <View style={styles.container}>

//           <Face happiness={new Value(0)} isStatic />
//           <Face happiness={new Value(0.25)} isStatic />
//           <Face happiness={new Value(0.5)} isStatic />
//           <Face happiness={new Value(0.75)} isStatic />
//           <Face happiness={new Value(1)} isStatic />

//         </View>

//         <Animated.View style={[styles.slider, { transform: [{ translateX }] }]}>
//           <Face {...{ happiness }} />
//         </Animated.View>
//         <Animated.ScrollView
//           style={StyleSheet.absoluteFill}
//           showsHorizontalScrollIndicator={false}
//           scrollEventThrottle={16}
//           bounces={false}
//           contentContainerStyle={{ width: width * 2 - smileyWidth }}
//           horizontal
//           {...{ onScroll }}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//   },
//   container: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   slider: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "flex-start",
//   },

// });
