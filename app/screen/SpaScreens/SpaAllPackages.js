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

function SpaAllPackages(props) {
  navigation = useNavigation();
  const renderRow = ({ item, index }) => {
    return (
      <SpaPackage
        backgroundImage={require("../../assets/spa/spabackground.png")}
        name={item.name}
        onPress={() => {
          navigation.navigate("SpaPackageDetail", {
            allData: item.items,
            packageName: props.spaData[index].name,
          });
        }}
        packageOnPress={() => {
          navigation.navigate("SpaPackageDetail", {
            allData: item.items,
            packageName: props.spaData[index].name,
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
        title={"SPA"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        style={styles.header}
        logoImage={require("../../assets/TopHeader/spa1.png")}
        type={CATEGORY.SPA}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <Text style={styles.allPackage}>All Packages</Text>

      <FlatList
        data={props.spaData}
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
    fontSize: moderateScale(15),
    marginBottom: moderateScale(12),
  },
  backgroundImage: {
    width: moderateScale(340),
    height: moderateScale(105),
    justifyContent: "center",
    opacity: 0.9,
  },
  contentContainer: {
    width: "80%",
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "space-between",
  },
  cardText: {
    backgroundColor: colors.white,
    width: moderateScale(200),
    padding: moderateScale(12),
    alignSelf: "center",
    textAlign: "center",
    color: colors.darkGray,
    borderRadius: moderateScale(8),
    fontSize: moderateScale(15),
  },
  listForwardImage: {
    marginTop: moderateScale(8),
    marginRight: moderateScale(10),
  },
});

const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
  };
};

export default connect(mapStateToProps)(SpaAllPackages);
