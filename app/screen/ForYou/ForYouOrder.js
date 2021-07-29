import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import SpaFooter from "../../component/Spa/spaFooter";

function ForYouOrder(props) {
  const [requestText, setRequestText] = useState("");
  const [postCardText, setPostCardText] = useState("");

  const handleNextButton = () => {
    navigation.navigate("forYouOrderSummary", {
      itemName: props.route.params.itemName,
      itemPrice: props.route.params.itemPrice,
      requestText: requestText,
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
        title={"FOR YOU"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        logoImage={require("../../assets/TopHeader/forYou.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.selectView}>
          <Text style={styles.allPackage}>{props.route.params.itemName}</Text>
        </View>

        <Card containerStyle={styles.cardStyle}>
          <View style={styles.PackageContainer}>
            <View style={styles.patientView}>
              <Image
                style={styles.pencilImage}
                source={require("../../assets/spa/pencil.png")}
              />
              <View style={styles.UserNameContainer}>
                <Text style={styles.userNameText}>
                  package for {props.user.name}
                </Text>
                <Text style={styles.giftText}>
                  Sunflowers, Teddy bear, Chocolate
                </Text>
              </View>
            </View>
            <Text style={styles.priceText}>
              {"$" + props.route.params.itemPrice}
            </Text>
          </View>
        </Card>

        <Card containerStyle={styles.cardStyle}>
          <Text style={styles.questionText}>
            What would you like to write in postcard?
          </Text>
          <TextInput
            placeholder="For You"
            placeholderTextColor={colors.spaTextColor}
            style={styles.textInput}
            multiline={true}
            onChangeText={(text) => setPostCardText(text)}
          />
        </Card>
        <Card containerStyle={styles.cardStyle}>
          <Text style={styles.questionText}>Are there any requests?</Text>
          <TextInput
            placeholder="Type Here"
            placeholderTextColor="gray"
            style={styles.textInput}
            multiline={true}
            onChangeText={(text) => setRequestText(text)}
          />
        </Card>
      </ScrollView>

      <SpaFooter
        nextButtonPress={() => handleNextButton()}
        addTreatmentPress={() => navigation.navigate("ForYouScreen")}
        disabledStyle={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  selectView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    alignSelf: "center",
    marginTop: moderateScale(18),
  },
  allPackage: {
    color: colors.darkGray,
    fontSize: 15,
    left: moderateScale(14),
    fontFamily: "Roboto-Regular",
  },
  pencilImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: "contain",
  },
  patientView: {
    flexDirection: "row",
    marginLeft: moderateScale(10),
  },
  cardStyle: {
    elevation: 5,
    width: moderateScale(335),
    alignSelf: "center",
    backgroundColor: "#FDFDFD",
    borderRadius: moderateScale(5),
  },
  questionText: {
    color: colors.darkGray,
    marginLeft: moderateScale(5),
    fontFamily: "Roboto-Regular",
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  userNameText: {
    fontSize: 15,
    color: colors.spaTextColor,
  },
  giftText: {
    fontSize: 12,
    color: colors.lightgray,
  },
  priceText: {
    color: colors.spaTextColor,
  },
  textInput: {
    marginVertical: "3%",
    height: moderateScale(100),
    textAlignVertical: "top",
    marginLeft: "5%",
    fontSize: moderateScale(15),
  },
  scrollViewContainer: {
    backgroundColor: colors.backgroundColor,
    flexGrow: 1,
    marginBottom: "5%",
  },
  PackageContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  UserNameContainer: {
    marginLeft: moderateScale(6),
    marginTop: moderateScale(-5),
  },
});

const mapStateToProps = (state) => {
  return {
    forYou: state.forYou,
    forYouCart: state.forYouCart,
    order: state.order,
    user: state.user,
  };
};

export default connect(mapStateToProps)(ForYouOrder);
