import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";

const ChartLabel = (props) => {
  return (
    <Image
      source={
        props.text === "clicked" ? props.datum.pressedUrl : props.datum.url
      }
      style={{
        top: props.y - 20,
        left: props.x - 20,
        width: 40,
        height: 40,
        resizeMode: "contain",
        position: "absolute",
      }}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default ChartLabel;
