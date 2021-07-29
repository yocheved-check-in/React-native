import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";

function PrivacyPolicy1(props) {
  const [agreed, setAgreed] = useState(false);
  const [isData, setIsData] = useState(false);
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState(true);

  useEffect(() => {
    hotelRule();
  }, []);

  const hotelRule = () => {
    setLoader(true);
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    return fetch(
      "http://checkin.parvaty.com/api/hotel/rules?hotelId=" +
        props.order.hotel_id,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.data == "") {
          setIsData(true);
        } else {
          setData(response.data);
          setIsData(false);
        }
        setLoader(false);
      })
      .catch((error) => setLoader(false));
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
      {loader ? (
        <ActivityIndicator
          size="large"
          style={styles.loader}
          color={colors.primary}
        />
      ) : (
        <>
          <View style={{ flex: 0.15 }}>
            <View style={styles.headingView}>
              <Text style={styles.headingText}>Gordonia Hotel Contract</Text>
              <Text style={styles.pageNumberText}>4 Of 6</Text>
            </View>
            <Text style={styles.text}>
              {" "}
              *{""} Please Read the Hotel Contract
            </Text>
          </View>
          <View style={{ flex: 0.67 }}>
            <Card containerStyle={styles.cardStyle}>
              {isData ? (
                <Text style={{ alignSelf: "center", justifyContent: "center" }}>
                  No Data found
                </Text>
              ) : (
                <ScrollView style={{ flexGrow: 1, marginBottom: "3%" }}>
                  <Text style={styles.contractDescription}>{data}</Text>
                </ScrollView>
              )}
              <View
                style={{
                  paddingTop: moderateScale(13),
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={styles.radioButtonContainer}
                  onPress={() => {
                    setAgreed(!agreed);
                  }}
                >
                  {!agreed ? (
                    <Image
                      source={require("../../assets/roomServiceDetail/fill.png")}
                      style={styles.radioButtonImage}
                    />
                  ) : (
                    <Image
                      source={require("../../assets/roomServiceDetail/circle.png")}
                      style={styles.radioButtonImage}
                    />
                  )}
                </TouchableOpacity>
                <Text style={styles.termsText}>
                  I Agree To The Terms of Use
                </Text>
              </View>
            </Card>
          </View>
          <View style={{ flex: 0.18, marginTop: "5%" }}>
            <TouchableOpacity
              disabled={!agreed == false ? true : false}
              style={
                !agreed == false
                  ? styles.disableNextButton
                  : styles.enableNextButton
              }
              onPress={() => {
                !agreed ? navigation.navigate("drawDigitalSignature") : null;
              }}
            >
              <Text
                style={{
                  color: !agreed == false ? colors.primary : colors.white,
                }}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    top: 0,
    position: "absolute",
  },
  headingView: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(16),
    alignSelf: "center",
  },
  disableNextButton: {
    padding: moderateScale(15.5),
    color: colors.primary,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 8,
    alignItems: "center",
    fontSize: moderateScale(12),
    borderWidth: moderateScale(2),
    width: moderateScale(165),
    borderColor: colors.primary,
    marginTop: moderateScale(25),
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  enableNextButton: {
    padding: moderateScale(15.5),
    // color: colors.primary,
    backgroundColor: colors.primary,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 8,
    alignItems: "center",
    fontSize: moderateScale(12),
    borderWidth: moderateScale(2),
    width: moderateScale(165),
    borderColor: colors.primary,
    marginTop: moderateScale(25),
  },

  headingText: {
    color: colors.darkGray,
    fontSize: 17,
    fontWeight: "900",
    marginHorizontal: moderateScale(22),
  },
  text: {
    color: colors.spaTextColor,
    fontWeight: "900",
    fontSize: moderateScale(13),
    width: "80%",
    alignSelf: "center",
    marginTop: moderateScale(12),
  },
  contentView: {
    marginTop: moderateScale(10),
    width: "80%",
    alignSelf: "center",
  },
  cardStyle: {
    elevation: 3,
    width: moderateScale(335),
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginTop: moderateScale(10),
    backgroundColor: "#FFFFFF",
    paddingBottom: "10%",
    marginBottom: moderateScale(20),
  },
  ContractHeading: {
    textDecorationLine: "underline",
    color: colors.ContractTextColor,
  },
  contractDescription: {
    color: colors.ContractTextColor,
    padding: moderateScale(3),
    marginRight: moderateScale(3),
  },
  image: {
    width: moderateScale(15),
    height: moderateScale(15),
    marginRight: moderateScale(5),
    resizeMode: "contain",
  },
  radioButtonImage: {
    width: moderateScale(15),
    height: moderateScale(15),
    marginRight: moderateScale(5),
    resizeMode: "contain",
    marginTop: moderateScale(2),
  },
  termsText: {
    color: colors.spaTextColor,
    fontWeight: "900",
    textAlign: "left",
    marginLeft: moderateScale(5),
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    initAgreedPrivacyPolicy(data) {
      dispatch({
        type: "INIT_PRIVACY_POLICY",
        payload: data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
    order: state.order,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy1);
