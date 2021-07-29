import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, StatusBar } from "react-native";
import { useNavigation, StackActions } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import TopHeader from "../../component/TopHeader";
import Signature from "react-native-signature-canvas";
import colors from "../../config/colors";

import { t } from "../../services/i18n";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

function MainScreen(props) {
  const [isSelected, isSetSelected] = useState(null);
  const [signature, setSign] = useState(null);

  navigation = useNavigation();

  const handleSignature = (signature) => {
    props.initSignature(signature);
    setSign(signature);
    navigation.navigate("showDigitalSignature");
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
        title={"CHECK IN"}
        headerImage={require("../../assets/sideicon.png")}
        logoImage={require("../../assets/TopHeader/checkIn1.png")}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />

      <View style={styles.userContainer}>
        <Text style={styles.welcomeText}>Digital Signature</Text>
        <Text>5 Of 6</Text>
      </View>
      <Text style={styles.basicText}>* {""}Draw Your Signature</Text>

      <View
        style={{
          flex: 0.7,
          height: moderateScale(300),
          width: moderateScale(330),
          alignSelf: "center",
          marginTop: moderateScale(10),
        }}
      >
        <Signature
          onOK={handleSignature}
          penColor={colors.primary}
          borderRadius="15"
          // clearText={t("CheckIn:clear")}
          // confirmText={t("CheckIn:save")}
          descriptionText=""
          // webStyle={webStyle}
          backgroundColor={"#fff"}
          autoClear={true}
          // imageType={"image/svg+xml"}
          // onBegin={onBegin}
          // onEnd={onEnd}
          imageType={"image/jpeg"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  userContainer: {
    width: "92%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(16),
  },
  welcomeText: {
    fontSize: 17,
    color: colors.darkGray,
    marginHorizontal: moderateScale(16),
  },
  basicText: {
    fontSize: 15,
    marginTop: moderateScale(7),
    color: colors.spaTextColor,
    marginHorizontal: moderateScale(27),
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    initSignature(data) {
      dispatch({
        type: "INIT_SIGNATURE",
        payload: data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return { roomServiceData: state.roomServiceData, user: state.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
