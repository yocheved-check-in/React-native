import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimension,
} from "react-native";
import TopHeader from "../component/TopHeader";
import Separate from "../component/Separate";
import colors from "../config/colors";
import { t } from "../services/i18n";
import { CATEGORY } from "../config/enums";
import { connect } from "react-redux";
import PagerView from "react-native-pager-view";
import { FloatingAction } from "react-native-floating-action";
import { moderateScale } from "react-native-size-matters";

const exampledata = [
  {
    id: 1,
    title: "coca cola",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 2,
    title: "sprite *1",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 3,
    title: "zero coca cola *2",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 4,
    title: "diet sprite",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 5,
    title: "orange juice ",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 5,
    title: "orange juice ",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 5,
    title: "orange juice ",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 5,
    title: "orange juice ",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
  {
    id: 5,
    title: "orange juice ",
    price: "$4",
    addSign: "+",
    subSign: "-",
  },
];

function RoomServiceScreen(props) {
  const renderRow = ({ item }) => {
    return (
      <>
        <View style={styles.listItem}>
          <View style={styles.listText}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
          <View style={styles.innerView}>
            <TouchableOpacity>
              <Text style={styles.signText}>{item.addSign}</Text>
            </TouchableOpacity>
            <View style={styles.StraightLine}></View>
            <TouchableOpacity>
              <Text style={styles.signText}>{item.subSign}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#0db6ac"
        barStyle="dark-content"
        translucent={true}
        hidden={false}
      />
      <TopHeader
        title={"GORDONTA"}
        style={styles.header}
        type={CATEGORY.ROOM_SERVICE}
      />

      <Text style={styles.tabText}>First course</Text>
      <View style={styles.textContainer}>
        <Text style={styles.beverageText}>Beverage</Text>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: moderateScale(20),
          }}
          data={exampledata}
          showsVerticalScrollIndicator={false}
          renderItem={renderRow}
          keyExtractor={(index) => index.toString()}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.nextBtn}>NEXT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.touchableOpacityStyle}>
          <Image
            style={styles.fabImage}
            source={require("../assets/lock.png")}
          />
          <Text style={styles.fabText}>room</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mediumGray,
  },
  headerText: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
  pagerView: {
    flex: 1,
  },
  tabText: {
    fontSize: 15,
    marginLeft: 15,
  },
  textContainer: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
  },
  beverageText: {
    fontSize: 17,
    color: colors.black,
  },
  listItem: {
    height: 80,
    width: "100%",
    backgroundColor: colors.opacityWhite,
    padding: 10,
    flexDirection: "row",
    marginTop: 15,
  },
  listText: {
    width: "60%",
  },
  titleText: {
    fontSize: 16,
    color: colors.black,
  },
  priceText: {
    fontSize: 16,
  },
  innerView: {
    height: 60,
    width: "40%",
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  signText: {
    fontSize: 40,
    alignSelf: "center",
    color: colors.black,
  },
  StraightLine: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  nextBtn: {
    width: "42%",
    marginTop: moderateScale(15),
    padding: 12,
    backgroundColor: colors.primary,
    color: colors.white,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 6,
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 15,
    backgroundColor: colors.opacityWhite,
    borderRadius: 50,
  },
  fabImage: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  fabText: {
    fontSize: 8,
    color: colors.primary,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.mediumGray,
    height: "12%",
  },
});

const mapStateToProps = (state) => {
  return { roomServiceData: state.roomServiceData };
};

export default connect(mapStateToProps)(RoomServiceScreen);
