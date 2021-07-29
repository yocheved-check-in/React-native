import React from "react";
import {
  ImageBackground,
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
} from "react-native";
import colors from "../config/colors";
import Carousel from "react-native-snap-carousel";
import QuestionView from "../component/PreArrivel/QuestionView";

const data = [
  {
    question: "How old are you?",
    answers: [{ label: "0-10" }, { label: "10-20" }, { label: "20-30" }],
  },
  {
    question: "What do you like to drink?",
    answers: [
      { label: "Cola" },
      { label: "Orange juice hgvh hgjhjghgh h hghjghjgjhg jhghjgj" },
      { label: "Water" },
      { label: "wine" },
    ],
  },
  {
    question: "Where are you from?",
    answers: [
      { label: "Israel" },
      { label: "USA" },
      { label: "England" },
      { label: "France" },
      { label: "Dubai" },
      { label: "England" },
      { label: "France" },
      { label: "Dubai" },
    ],
  },

  {
    message:
      "Thank you for your answers!!\n We are waiting to you at the checkin date",
  },
];

const renderItem = ({ item, index }) => {
  return (
    <ImageBackground
      source={require("../assets/preArrivel/questionBackground.jpg")}
      style={styles.slide}
      resizeMode="stretch"
      imageStyle={{
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
      }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          height: 50,
          position: "absolute",
          top: 0,
          left: 0,
          width: 350,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        imageStyle={{}}
      />

      <QuestionView item={item} onAnswer={(e) => onAnswer(e)} />
    </ImageBackground>
  );
};

const onAnswer = (e) => {
  this._carousel.snapToNext();
};

function PreArrivelScreen(props) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.profileView}>
          <Image
            style={styles.profileImg}
            source={require("../assets/spa/spa1.jpeg")}
          ></Image>
          <Text style={styles.profileText}>Dave con</Text>
          <Text style={styles.profileText}>Welcome! select your prefer:</Text>
        </View>
        <View style={styles.questionView}>
          <Carousel
            scrollEnabled={false}
            ref={(c) => {
              this._carousel = c;
            }}
            data={data}
            renderItem={renderItem}
            sliderWidth={400}
            itemWidth={350}
            itemHeight={500}
            slideStyle={styles.slideContainer}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.li,
    flex: 1,
  },

  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 50,
    borderColor: colors.white,
    borderWidth: 5,
  },

  profileView: {
    justifyContent: "center",
    alignItems: "center",
    height: "45%",
  },
  slide: {
    //backgroundColor: colors.gray,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
    // borderTopLeftRadius: 50,
    // borderTopRightRadius: 50,
  },

  slideContainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    borderRadius: 50,
  },

  profileText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  questionView: {
    height: "55%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    //padding: 20,
  },
});
export default PreArrivelScreen;
