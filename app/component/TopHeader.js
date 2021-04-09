import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  I18nManager as RNI18nManager,
} from "react-native";
import colors from "../config/colors";
import CircleIcon from "./CircleIcon";
import i18n from "../services/i18n";
import { connect } from "react-redux";
import { CATEGORY } from "../config/enums";

//const navigation = useNavigation();

function TopHeader(props) {
  const cartCount =
    props.type === CATEGORY.ROOM_SERVICE
      ? props.roomServiceCount
      : props.spaCount;

  console.log("cartCount " + cartCount);

  return (
    <View style={styles.container}>
      <View style={styles.basicView}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.backButton}
            source={require("../assets/TopHeader/backButton.png")}
          />
        </TouchableOpacity>
        {props.isCart && (
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => navigation.navigate("Cart", { type: props.type })}
          >
            <Image
              style={styles.cartButton}
              source={require("../assets/TopHeader/cart.png")}
            />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <CircleIcon
        icon={props.icon}
        size={65}
        color={colors.primary}
        bottom={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 50,
    width: 50,
  },

  badge: {
    backgroundColor: "red",
    height: 17,
    width: 17,
    borderRadius: 8.5,
    position: "absolute",
    justifyContent: "center",
  },

  badgeText: {
    color: colors.white,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },

  cartButton: {
    height: 50,
    width: 50,
  },

  container: {
    backgroundColor: "transparent",
    justifyContent: "center",
    height: 160,
    overflow: "visible",
    flexDirection: "row",
    overflow: "visible",
    writingDirection: "ltr",
  },

  basicView: {
    top: 0,
    backgroundColor: colors.primary,
    height: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: colors.white,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 25,
    fontWeight: "bold",
    top: 10,
  },

  cartContainer: {
    top: 40,
    position: "absolute",
    ...i18n.select({
      rtl: { left: 20 },
      ltr: { right: 20 },
    }),
  },

  backContainer: {
    top: 40,
    position: "absolute",
    ...i18n.select({
      rtl: { right: 20 },
      ltr: { left: 20 },
    }),
  },
});

const mapStateToProps = (state) => {
  return { roomServiceCount: state.roomServiceCount, spaCount: state.spaCount };
};

export default connect(mapStateToProps)(TopHeader);
