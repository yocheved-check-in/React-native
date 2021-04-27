import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import colors from "../config/colors";
import { SafeAreaView } from "react-native-safe-area-context";

function MainScreen() {
  navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/sideicon.png")}
          />
          <View style={styles.midheader}>
            <Text style={styles.headerText}>GORDONTA</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.secondcontainer}>
        <Text style={styles.bigtext}>Welcome David,</Text>
        <Text style={styles.smalltext}>What Would You Like to Do?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("RoomService")}
          style={styles.RoomView}
        >
          <ImageBackground
            style={styles.image}
            source={require("../assets/backgroundgift.png")}
          >
            <View style={styles.smalldiv}>
              <Image
                style={styles.heart}
                source={require("../assets/blueheart.png")}
              />
              <Text style={styles.smalldivtext}>For You</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Spa")}
          style={styles.SpaView}
        >
          <ImageBackground
            style={styles.image}
            source={require("../assets/backgroundCoussin.png")}
          >
            <View style={styles.smalldiv}>
              <Image
                style={styles.spa}
                source={require("../assets/spa1.png")}
              />
              <Text style={styles.spatext}>Spa</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("HouseKeeping")}
          style={styles.HouseView}
        >
          <ImageBackground
            style={styles.image}
            source={require("../assets/backgroundflower.png")}
          >
            <View style={styles.smalldiv}>
              <Image
                style={styles.housekeeping}
                source={require("../assets/housekeeping1.png")}
              />
              <Text style={styles.housetext}>HouseKeeping</Text>
            </View>
            <TouchableOpacity style={styles.TouchableOpacityStyle}>
              <Image
                style={styles.fabimage}
                source={require("../assets/fabicon.png")}
              />
              <Text style={styles.fabtext}>Preferences</Text>
            </TouchableOpacity>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: "center",
    marginTop: 10,
  },
  headerText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: "roboto",
    marginTop: 5,
  },
  header: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
  },
  midheader: {
    width: "80%",
    alignItems: "center",
    alignSelf: "center",
  },
  secondcontainer: {
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  bigtext: {
    fontSize: 22,
    color: colors.primary,
  },
  smalltext: {
    fontSize: 15,
    color: colors.primary,
  },
  RoomView: {
    height: "28.5%",
  },
  SpaView: {
    height: "28.5%",
  },
  HouseView: {
    height: "28.5%",
  },
  image: {
    resizeMode: "cover",
    justifyContent: "center",
    height: moderateScale(220),
    borderRadius: 8,
  },
  smallimage: {
    height: 10,
    width: 20,
  },
  smalldiv: {
    height: 90,
    width: 130,
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.opacityWhite,
    borderRadius: 10,
  },
  heart: {
    height: 35,
    width: 40,
    alignSelf: "center",
  },
  smalldivtext: {
    fontSize: 13,
    color: colors.primary,
    alignSelf: "center",
  },
  spa: {
    height: 35,
    width: 55,
    alignSelf: "center",
  },
  spatext: {
    fontSize: 13,
    color: "green",
    alignSelf: "center",
  },
  housekeeping: {
    height: 45,
    width: 51,
    alignSelf: "center",
  },
  housetext: {
    fontSize: 13,
    alignSelf: "center",
    color: colors.pink,
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
    backgroundColor: colors.opacityWhite,
    borderRadius: 50,
  },
  fabimage: {
    width: 30,
    height: 30,
  },
  fabtext: {
    fontSize: 8,
    color: colors.primary,
  },
});

const mapStateToProps = (state) => {
  return { roomServiceData: state.roomServiceData };
};

export default MainScreen;
