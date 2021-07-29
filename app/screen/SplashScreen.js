import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { duration } from "moment";

const AnimatedScreen = () => {
  const navigation = useNavigation();
  const moveAnim = useRef(
    new Animated.Value(Dimensions.get("window").height / 1.1)
  ).current;

  // const moveAnim = useRef(new Animated.Value(-30)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const rotateValueHolder = useRef(new Animated.Value(0)).current;

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [50, 100],
    // toValue: -300,
    outputRange: ["2deg", "-370deg"],
  });

  const position = new Animated.ValueXY({ x: 0, y: 0 });
  Animated.timing(position, {
    toValue: { x: 0, y: 0 },
    duration: 1000,
  }).start();

  const rotate = position.x.interpolate({
    inputRange: [0, 100],
    outputRange: ["0deg", "-360deg"],
  });

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    setTimeout(() => {
      navigation.navigate("Login");
    }, 8000);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
    }).start();
    [fadeAnim],
      Animated.timing(moveAnim, {
        duration: 1500,
        toValue: 8,
        delay: 0,
        useNativeDriver: false,
      }).start();
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    Animated.timing(fadeAnim, {
      duration: 2000,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImage}
        source={require("../assets/SlpashBackground.png")}
      >
        <View style={styles.contentContainer}>
          <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
            <Animated.Image
              style={{
                width: 280,
                height: 280,
                marginLeft: 5,
                opacity: fadeAnim,
                duration: 3000,
                transform: [
                  // { rotateY: rotateData },
                  { translateY: moveAnim },
                  { translateX: position.x },
                ],
              }}
              source={require("../assets/CheckInLogo2.png")}
            />
          </Animated.View>

          <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
            <Text style={[styles.CheckIn]}>Check In</Text>
            <Animated.Text
              style={[styles.logoText, { opacity: fadeAnim }]}
            ></Animated.Text>
          </Animated.View>
          <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
            <Text style={[styles.logoText]}>
              The Entire Hotel In The Palm Of Your Hand
            </Text>
            <Animated.Text
              style={[styles.logoText, { opacity: fadeAnim }]}
            ></Animated.Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  CheckIn: {
    fontSize: 45,
    marginTop: 5,
    color: "#FFFFFF",
    fontWeight: "bold",
    top: -34,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  logoText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontWeight: "700",
    top: -34,
  },
  contentContainer: {
    top: "5%",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    flexDirection: "row",
  },
});
export default AnimatedScreen;
