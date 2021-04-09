import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import ScrollItem from "./ScrollItem";

function HorizentalScrollView({ items, title, itemPressed, navigation }) {
  const renderRow = ({ item }) => {
    return (
      <ScrollItem
        image={item.imgurl}
        description={item.description}
        name={item.item_name}
        price={item.price + "$"}
        isLiked={item.liked}
        isheart={item.heart}
        onSelectItem={() => itemSelected(item)}
      />
    );
  };

  const itemSelected = (item) => {
    itemPressed(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          style={{ right: 15 }}
          onPress={() =>
            navigation.navigate("ViewAll", { items, itemSelected })
          }
        >
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={items}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    marginBottom: 15,
    marginTop: 15,
    flex: 1,
    flexDirection: "column",
  },
  textContainer: {
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
    justifyContent: "space-between",
  },

  viewAll: {
    fontWeight: "bold",
    fontSize: 18,
  },
  title: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
    left: 15,
  },
});
export default HorizentalScrollView;
