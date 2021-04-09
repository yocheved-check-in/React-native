import React from "react";
import { View, StyleSheet, ScrollView, FlatList, Button } from "react-native";
import TopHeader from "../component/TopHeader";
import HorizentalScrollView from "../component/HorizentalScrollView";
import Separate from "../component/Separate";
import colors from "../config/colors";
import { t } from "../services/i18n";
import { CATEGORY } from "../config/enums";
import { connect } from "react-redux";

// const exampledata = [
//   {
//     id: 1,
//     title: "First Course",
//     items: [
//       {
//         idCategory: 1,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 1,
//         image: require("../assets/roomService/food_147.jpeg"),
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 2,
//         image: require("../assets/roomService/food_148.jpeg"),
//         liked: false,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 3,
//         image: require("../assets/roomService/food_149.jpeg"),
//         liked: false,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 4,
//         image: require("../assets/roomService/food_147.jpeg"),
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 5,
//         image: require("../assets/roomService/food_148.jpeg"),
//         liked: false,
//         heart: true,
//       },
//       {
//         idCategory: 1,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 6,
//         image: require("../assets/roomService/food_149.jpeg"),
//         liked: false,
//         heart: true,
//       },
//     ],
//   },

//   {
//     id: 2,
//     title: "Main Course",
//     items: [
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 7,
//         image: require("../assets/roomService/food_147.jpeg"),
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 8,
//         image: require("../assets/roomService/food_148.jpeg"),
//         liked: false,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 9,
//         image: require("../assets/roomService/food_149.jpeg"),
//         liked: false,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 10,
//         image: require("../assets/roomService/food_147.jpeg"),
//         liked: true,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 11,
//         image: require("../assets/roomService/food_148.jpeg"),
//         liked: false,
//         heart: true,
//       },
//       {
//         idCategory: 2,
//         id: 1,
//         name: "sdas dscsdvdscs",
//         description: "fsdfdsn dVxvxc cxvx cxv cfdbdfbfd dbf xvvdb",
//         price: 12,
//         image: require("../assets/roomService/food_149.jpeg"),
//         liked: false,
//         heart: true,
//       },
//     ],
//   },
// ];

const moveToItemScreen = (item) => {
  console.log("item" + item);

  navigation.navigate("RoomServiceItem", { item, navigation });
};

function RoomServiceScreen(props) {
  const renderRow = ({ index }) => {
    const myItems = props.roomServiceData[index];
    console.log(myItems);

    return (
      <>
        <HorizentalScrollView
          items={myItems.items}
          title={myItems.name}
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
        icon={require("../assets/main/foodw.png")}
        title={t("RoomService:roomService")}
        isCart={true}
        style={styles.header}
        type={CATEGORY.ROOM_SERVICE}
      />

      <FlatList
        data={props.roomServiceData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
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
  return { roomServiceData: state.roomServiceData };
};

export default connect(mapStateToProps)(RoomServiceScreen);
