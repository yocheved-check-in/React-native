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

function ForYouScreen(props) {
  navigation = useNavigation();
  const renderRow = ({ item, index }) => {
    if (item.items.length > 0)
      return (
        <SpaScreenComponent
          onCardPress={(item) =>
            navigation.navigate("ForYouCompleteDetail", {
              forYouDetail: item,
              treatmentName: props.forYou[index].name,
            })
          }
          title={props.forYou[index].name}
          FlatListData={props.forYou[index].items}
          viewOnPress={() =>
            navigation.navigate("ForYouPackageDetail", {
              allData: item.items,
              packageName: props.forYou[index].name,
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
        title={"FOR YOU"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        logoImage={require("../../assets/TopHeader/forYou.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.listStyle}>
          <Text style={styles.basicText}>
            Pamper Packages Especially For You
          </Text>
          <FlatList
            data={props.forYou}
            renderItem={renderRow}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForYouAllPackages");
        }}
      >
        <Text style={styles.viewAllPackages}>VIEW ALL PACKAGES</Text>
      </TouchableOpacity>

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
  basicText: {
    fontSize: 12,
    color: colors.pinkColor,
    marginTop: moderateScale(15),
    marginLeft: moderateScale(30),
    fontFamily: "Roboto-Light",
  },
  viewAllPackages: {
    padding: moderateScale(17),
    backgroundColor: colors.primary,
    color: colors.white,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 8,
    justifyContent: "center",
    textDecorationLine: "underline",
    fontSize: 15,
  },
  footerButtonView: {
    alignSelf: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    forYou: state.forYou,
  };
};

export default connect(mapStateToProps)(ForYouScreen);
