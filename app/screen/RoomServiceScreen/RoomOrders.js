import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, StatusBar } from "react-native";

import colors from "../../config/colors";
import TopHeader from "../../component/TopHeader";
import FabIcon from "../../component/FabIcon";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { useNavigation } from "@react-navigation/native";
import NextButton from "../../component/nextButton";
import CartCounter from "../../component/RoomService/CartCounter";

function RoomOrders() {
  const navigation = useNavigation();

  const DATA = [
    {
      id: "1",
      Pizza: "monstrous pizza",
      desc: "American  cheese placed on top of 400g juicy hamburger..",
    },
    {
      id: "2",
      Pizza: "Hawaiian Pizza",
      desc: "pizza topped with pineapple,ham tomato sauce and cheddar cheese..",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.7, backgroundColor: "#EBEBEB" }}>
        <StatusBar
          backgroundColor={colors.primary}
          barStyle="dark-content"
          translucent={true}
          hidden={false}
        />

        <TopHeader
          title={"ROOM SERVICE"}
          headerImage={require("../../assets/TopHeader/sideIcon.png")}
          style={styles.header}
          logoImage={require("../../assets/TopHeader/room_service_icone.png")}
          type={CATEGORY.ROOM_SERVICE}
          rightImage={require("../../assets/TopHeader/back-arrow.png")}
          leftImagePress={() => navigation.goBack()}
        />

        <View style={styles.nameContainer}>
          <Text style={styles.discountText}>
            Ordering a pizza has a discount on drinks
          </Text>
          <Text style={styles.titleText}>My order</Text>
        </View>

        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View>
              <Card containerStyle={styles.foodContainer}>
                <View style={styles.foodView}>
                  <Text style={styles.foodNameText}>
                    {item.Pizza}{" "}
                    <Text style={styles.breakText}>
                      x1{"\n"}
                      <Text style={styles.descriptionText}>{item.desc}</Text>
                    </Text>
                  </Text>
                </View>
                <View style={styles.cartCounter}>
                  <CartCounter />
                </View>
              </Card>
            </View>
          )}
        />
      </View>
      <View style={styles.downView}>
        <NextButton
          style={styles.NextButton}
          addOrderText={" Would you like to add another dish to your order?"}
          onPress={() => navigation.navigate("RoomServiceScreen")}
          buttonName={"Next"}
        />
      </View>
      <FabIcon></FabIcon>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  nameContainer: {
    marginTop: "5%",
    marginLeft: "5%",
  },
  downView: {
    flex: 0.3,
    alignItems: "center",
  },
  foodContainer: {
    elevation: 6,
    borderRadius: 8,
    height: moderateScale(85),
  },
  cartCounter: {
    elevation: 10,
    height: moderateScale(46),
    width: moderateScale(120),
    alignSelf: "flex-end",
    padding: moderateScale(7),
    left: moderateScale(13),
    bottom: moderateScale(52),
  },
  foodView: {
    width: moderateScale(150),
  },
  descriptionText: {
    color: "grey",
    fontSize: 9,
  },
  foodNameText: {
    textAlign: "left",
    fontSize: 17,
    color: "#3C3C3C",
    bottom: moderateScale(5),
    paddingTop: moderateScale(10),
  },
  discountText: {
    color: colors.pink,
    left: moderateScale(14),
  },
  breakText: {
    color: colors.primary,
  },
  titleText: {
    fontSize: 14,
    marginTop: moderateScale(12),
    left: moderateScale(14),
    color: colors.black,
  },
  header: {
    width: "100%",
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
  },
  NextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(16),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
});

export default RoomOrders;
