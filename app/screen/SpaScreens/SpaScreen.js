import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import SpaScreenComponent from "../../component/SpaScreenComponent";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import FabIcon from "../../component/ConstantStyles/FabIcon";
import { useNavigation } from "@react-navigation/native";

function SpaScreen(props) {
  navigation = useNavigation();

  const renderRow = ({ item, index }) => {
    if (item.items.length > 0)
      return (
        <SpaScreenComponent
          onCardPress={(item) =>
            navigation.navigate("SpaCompleteDetail", {
              spaDetail: item,
              treatmentName: props.spaData[index].id,
            })
          }
          title={props.spaData[index].name}
          FlatListData={props.spaData[index].items}
          viewOnPress={() =>
            navigation.navigate("SpaPackageDetail", {
              allData: item.items,
              packageName: props.spaData[index].name,
            })
          }
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
        logoImage={require("../../assets/TopHeader/spa1.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.listStyle}>
          <Text style={styles.basicText}>
            Treatment Packages Especially For You
          </Text>
          <FlatList
            data={props.spaData}
            renderItem={renderRow}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.viewAllPackages}
          onPress={() => {
            navigation.navigate("SpaAllPackages");
          }}
        >
          <Text style={styles.viewAllPackagesText}>VIEW ALL PACKAGES</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fabIconContainer}>
        <FabIcon
          image={require("../../assets/fabIcon/room.png")}
          name={"room"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Gray,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    top: 0,
    position: "absolute",
  },
  buttonContainer: {
    width: "43%",
    alignSelf: "center",
    justifyContent: "center",
  },
  basicText: {
    fontSize: 12,
    color: colors.pinkColor,
    marginTop: moderateScale(15),
    marginLeft: moderateScale(30),
    fontFamily: "Roboto-Light",
  },
  viewAllPackagesText: {
    color: colors.white,
    textAlign: "center",
    textDecorationLine: "underline",
    fontSize: 13,
  },
  viewAllPackages: {
    height: moderateScale(60),
    width: moderateScale(160),
    backgroundColor: colors.primary,
    color: colors.white,
    alignSelf: "center",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    textDecorationLine: "underline",
  },
  fabIconContainer: {
    marginTop: "10%",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    initSpa(data) {
      dispatch({
        type: "INIT_SPA_DATA",
        payload: data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaScreen);
