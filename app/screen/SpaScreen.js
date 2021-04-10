import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Text,
} from "react-native";
import TopHeader from "../component/TopHeader";
import HorizentalScrollView from "../component/HorizentalScrollView";
import Separate from "../component/Separate";
import colors from "../config/colors";
import { connect } from "react-redux";
import { object } from "yup";
import { CATEGORY } from "../config/enums";

// const exampledata = [
//   {
//     id: 1,
//     title: "RELAXING",
//     items: [
//       {
//         idCategory: 1,
//         id: 1,
//         name: "Ayurveda (2 hands/4 hands)",
//         description:
//           "The science of life- a traditional Indian treatment featuring hot sesame oil, using long and gentle movements and followed by pouring oil on the third eye and soothing scalp massage. Treatment is performed unclothed yet appropriately covered.",
//         price: 200,
//         image: require("../assets/spa/spa1.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 2,
//         name: "Aromatherapy",
//         description:
//           "This multi-sensual experience relaxes and purifies the body with essential oils from natural plants. You may choose between a stimulating treatment to a classical treatment",
//         price: 250,
//         image: require("../assets/spa/spa2.jpeg"),
//         length: [60, 75, 90],
//         gender: "male",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 3,
//         name: "Re-Energizing Sun Stones",
//         description:
//           "A balancing treatment that releases the daily tension by combining a gentle massage featuring basalt stones along your body’s energy path.",
//         price: 200,
//         image: require("../assets/spa/spa3.jpeg"),
//         length: [75],
//         gender: "male",
//         singleTherapy: false,
//         liked: false,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 4,
//         name: "Awakening",
//         description:
//           "Renewal, release and balance are the essence of this treatment. A combination of various accessories like hot stones and aromatic oil will treat fatigue, headaches and stress. Recommended after long flights and time zones differences. The treatment will begin by nurturing your hands using a paraffin bath.",
//         price: 300,
//         image: require("../assets/spa/spa4.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 5,
//         name: "Prenatal",
//         description:
//           "A gentle and soothing treatment which reduces the feeling of heaviness stabilizes the posture and loosens up the lower back and hips. From 16th week.",
//         price: 200,
//         image: require("../assets/spa/spa5.jpeg"),
//         length: [45],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//     ],
//   },

//   {
//     id: 2,
//     title: "DEEP",
//     items: [
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa6.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa7.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa8.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa9.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "NURISHING",
//     items: [
//       {
//         idCategory: 3,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa10.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 3,
//         id: 2,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa11.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 3,
//         id: 3,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa12.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 3,
//         id: 4,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 200,
//         image: require("../assets/spa/spa13.jpeg"),
//         length: [60],
//         gender: "female",
//         singleTherapy: true,
//         liked: true,
//         heart: true,
//       },
//     ],
//   },
// ];

const moveToItemScreen = (item) => {
  console.log("item" + item);
  navigation.navigate("SpaItem", { item, navigation });
};

function SpaScreen(props) {
  const renderRow = ({ index }) => {
    console.log("category " + JSON.stringify(props.spaData[index].items[0]));
    return (
      <>
        <HorizentalScrollView
          items={props.spaData[index].items}
          title={props.spaData[index].title}
          itemPressed={(item) => moveToItemScreen(item)}
          navigation={navigation}
        />
        <Separate />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TopHeader
        icon={require("../assets/main/spaw.png")}
        title="Spa"
        isCart={true}
        style={styles.header}
        type={CATEGORY.SPA}
      />

      <FlatList
        data={props.spaData}
        renderItem={renderRow}
        keyExtractor={(item, index) => String(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumGray,
    flexDirection: "column",
  },
  header: {
    top: 0,
    position: "absolute",
  },
});

const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
  };
};

export default connect(mapStateToProps)(SpaScreen);
