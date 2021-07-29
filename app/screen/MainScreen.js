import React, { useState, useEffect, useRef } from "react";
import {
  AppState,
  View,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  Alert,
  // BackHandler
} from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import colors from "../config/colors";
import TopHeader from "../component/TopHeader";
import { CATEGORY } from "../config/enums";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import FabIcon from "../component/ConstantStyles/FabIcon";
import MainServices from "../component/mainScreen/MainScreenComponent";
import { color } from "react-native-elements/dist/helpers";
import Signature from "../component/DigitalCheckin/Signature";
import { NetInfoCellularGeneration } from "@react-native-community/netinfo";
import DatabaseService from "../services/DatabaseService";
const services = [
  {
    name: "For You",
    middleImage: require("../assets/mainScreen/blueHeart.png"),
    backgroundImage: require("../assets/mainScreen/backgroundGift.png"),
    screen: "ForYouScreen",
  },
  {
    name: "Spa",
    middleImage: require("../assets/mainScreen/spa1.png"),
    backgroundImage: require("../assets/mainScreen/backgroundCousin.png"),
    screen: "Spa",
  },
  {
    name: "HouseKeeping",
    middleImage: require("../assets/mainScreen/houseKeeping1.png"),
    backgroundImage: require("../assets/mainScreen/flower.png"),
    screen: "HouseKeepingAllPackages",
  },
  {
    name: "Room Service",
    middleImage: require("../assets/mainScreen/roomService.png"),
    backgroundImage: require("../assets/roomServiceBackground.png"),
    screen: "RoomServiceScreen",
  },
  {
    name: "Attractions",
    middleImage: require("../assets/mainScreen/attractions.png"),
    backgroundImage: require("../assets/AttractionsBackground.png"),
    screen: "CommingSoon",
  },
  {
    name: "Tickets",
    middleImage: require("../assets/mainScreen/Tickets.png"),
    backgroundImage: require("../assets/TicketsBackground.png"),
    screen: "CommingSoon",
  },
];

function MainScreen(props) {
  let dbService = new DatabaseService();

  // useEffect(() => {
  //   dbService.getUserDetail().then((json) => {});
  //   AppState.addEventListener("change", _handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener("change", _handleAppStateChange);
  //   };
  // });

  const [isSelected, isSetSelected] = useState(null);
  const [signature, setSign] = useState(null);
  navigation = useNavigation();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const handleSignature = (signature) => {
    // onSubmit(signature);
    alert("1234");
    setSign(signature);
  };

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "background") {
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  const getNetworkConnection = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected == true) {
        login();
      } else {
        alert("please check Network connection");
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.primary}
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />

      <TopHeader
        title={"GORDONTA"}
        headerImage={require("../assets/TopHeader/sideIcon.png")}
        style={styles.header}
        logoImage={require("../assets/TopHeader/logo1.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../assets/TopHeader/back-arrow.png")}
      />

      <View style={styles.userContainer}>
        <Text style={styles.welcomeText}>Welcome {props.user.name},</Text>
        <Text style={styles.basicText}>What Would You Like to Do?</Text>
      </View>

      <FlatList
        numColumns={1}
        contentContainerStyle={{ flexGrow: 1 }}
        data={services}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <MainServices
            name={item.name}
            backgroundImage={item.backgroundImage}
            middleImage={item.middleImage}
            onPress={() => {
              isSetSelected(index);
              navigation.navigate(item.screen);
            }}
            highlightedStyle={[
              styles.changeImageColorView,
              {
                backgroundColor:
                  index == isSelected ? "rgba(0, 133, 310, 0.6)" : null,
              },
            ]}
            textStyle={[
              styles.serviceName,
              {
                color:
                  index == "0"
                    ? colors.primary
                    : index == "1"
                    ? colors.greenColor
                    : index == "3"
                    ? colors.orange
                    : index == "4"
                    ? colors.purple
                    : index == "2"
                    ? colors.pinkColor
                    : colors.primary,
              },
            ]}
          />
        )}
      />
      <View style={styles.fabIconContainer}>
        <FabIcon
          fabOnPress={() => navigation.navigate("CheckInScreen")}
          image={require("../assets/fabIcon/checkin.png")}
          name={"check in"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    width: "90%",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: moderateScale(15),
  },
  welcomeText: {
    fontSize: 21,
    color: colors.primary,
    fontFamily: "Roboto-Regular",
  },
  basicText: {
    fontSize: 17,
    color: colors.primary,
    fontFamily: "Roboto-Regular",
  },
  changeImageColorView: {
    alignSelf: "center",
    justifyContent: "center",
    height: moderateScale(210),
    width: moderateScale(330),
    marginBottom: moderateScale(15),
  },
  serviceName: {
    fontSize: 15.5,
    alignSelf: "center",
    fontFamily: "Roboto-Light",
    color: "#3C3C3C",
  },
  fabIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

const mapStateToProps = (state) => {
  return { roomServiceData: state.roomServiceData, user: state.user };
};

export default connect(mapStateToProps, null)(MainScreen);
