import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  SafeAreaView,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import FabIcon from "../../component/ConstantStyles/FabIcon";
import { useNavigation } from "@react-navigation/native";
import SpaPackage from "../../component/Spa/SpaPackage";

function HouseKeepingAllPackages(props) {
  navigation = useNavigation();
  const renderRow = ({ item, index }) => {
    return (
      <SpaPackage
        backgroundImage={require("../../assets/houseKeepingBackground.jpg")}
        name={item.name}
        onPress={() => {
          navigation.navigate("HouseKeepingViewAll", {
            allData: item.items,
            packageName: props.houseKeepingData[index].name,
          });
        }}
        packageOnPress={() => {
          navigation.navigate("HouseKeepingViewAll", {
            allData: item.items,
            packageName: props.houseKeepingData[index].name,
          });
        }}
      />
    );
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
        title={"HOUSEKEEPING"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        logoImage={require("../../assets/TopHeader/spa1.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <Text style={styles.allPackage}>All Services</Text>

      <FlatList
        data={props.houseKeepingData}
        renderItem={renderRow}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => String(index)}
        contentContainerStyle={{ paddingTop: "4%" }}
      />
      <FabIcon image={require("../../assets/fabIcon/room.png")} name={"room"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Gray,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  allPackage: {
    color: colors.darkGray,
    marginLeft: moderateScale(20),
    marginTop: moderateScale(18),
    fontSize: 15,
    marginBottom: moderateScale(12),
    fontFamily: "Roboto-Regular",
  },
});

const mapStateToProps = (state) => {
  return {
    houseKeepingData: state.houseKeepingData,
  };
};

export default connect(mapStateToProps)(HouseKeepingAllPackages);
