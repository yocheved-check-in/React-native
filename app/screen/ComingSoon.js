import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import colors from "../config/colors";
import TopHeader from "../component/TopHeader";
import { CATEGORY } from "../config/enums";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { Colors } from "react-native/Libraries/NewAppScreen";

function CommingSoon(props) {
  navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Colors.primary}
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />

      <TopHeader
        title={"GORDONTA"}
        headerImage={require("../assets/sideicon.png")}
        // isCart={true}
        style={styles.header}
        type={CATEGORY.ROOM_SERVICE}
        rightImage={require("../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <View style={styles.userContainer}>
        <Text style={styles.comingSoonText}>Comming Soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userContainer: {
    flex: 1,

    alignSelf: "center",
    justifyContent: "center",
  },
  comingSoonText: {
    fontSize: 22,
    color: colors.primary,
  },
});

const mapStateToProps = (state) => {
  return { roomServiceData: state.roomServiceData, user: state.user };
};

export default connect(mapStateToProps, null)(CommingSoon);
