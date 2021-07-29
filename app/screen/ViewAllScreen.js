import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import Separate from "../component/Separate";
import TopHeader from "../component/TopHeader";
import ViewAllItem from "../component/ViewAllItem";
import { t } from "../services/i18n";

function ViewAllScreen(props) {
  const renderRow = ({ item }) => {
    return (
      <>
        <ViewAllItem item={item} onPress={() => itemPressed(item)} />
        <Separate />
      </>
    );
  };

  const itemPressed = (item) => {
    navigation.navigate("RoomServiceItem", { item });
  };

  return (
    <View style={styles.container}>
      <TopHeader
        icon={require("../assets/main/foodw.png")}
        title={t("RoomService:roomService")}
        isCart={true}
        style={styles.header}
      />
      <FlatList
        data={props.route.params.items}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //flex: 1,
    height: "100%",
    overflow: "hidden",
  },
  header: {
    zIndex: 1,
    top: 0,
    position: "absolute",
  },
  flatList: {
    flex: 1,
    zIndex: 0,
    bottom: 0,
    flexGrow: 1,
  },
});
export default ViewAllScreen;
