//@ts-ignore
import * as React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import FeedbackBar from "../component/Feedback/FeedbackBar";

class FeedbackScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={styles.background}
      >
        <FeedbackBar />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    justifyContent: "center",
  },
  rating: {
    padding: 20,
  },
});

export default FeedbackScreen;
