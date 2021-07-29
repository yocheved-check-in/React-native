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
import i18n from "../services/i18n";
import { connect } from "react-redux";
import { CATEGORY } from "../config/enums";
import { moderateScale } from "react-native-size-matters";

function TopHeader(props) {
  const cartCount =
    props.type === CATEGORY.ROOM_SERVICE
      ? props.roomServiceCount
      : props.spaCount;

  

  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity
        style={styles.backContainer}
        onPress={() => navigation.openDrawer()}
      >
        <Image style={styles.backButton} source={props.headerImage} />
      </TouchableOpacity>
      {props.isCart && (
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => navigation.navigate("Cart", { type: props.type })}
        >
          <Image
            style={styles.cartButton}
            source={require("../assets/TopHeader/Arrow-Icon.png")}
          />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      <View style={styles.midHeader}>
        <Image style={styles.headerImage} source={props.logoImage} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <TouchableOpacity
        onPress={props.leftImagePress}
        style={styles.backImageView}
      >
        <Image style={styles.headerLeftImage} source={props.rightImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: colors.primary,
    height: moderateScale(70),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  badge: {
    backgroundColor: "red",
    height: 17,
    width: 17,
    borderRadius: 8.5,
    position: "absolute",
    justifyContent: "center",
  },
  midHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  badgeText: {
    color: colors.white,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
  },
  cartButton: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  headerImage: {
    height: 35,
    width: 35,
    resizeMode: "contain",
    alignSelf: "center",
  },
  backButton: {
    height: 31,
    width: 31,
    top: 20,
    resizeMode: "contain",
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
  title: {
    color: colors.white,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 16,
    marginHorizontal: moderateScale(6),
  },
  cartContainer: {
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    ...i18n.select({
      rtl: { left: 20 },
      ltr: { right: 20 },
    }),
  },
  backContainer: {
    ...i18n.select({
      rtl: { right: moderateScale(5) },
      ltr: { left: moderateScale(10) },
    }),
  },
  backImageView: {
    justifyContent: "center",
    paddingRight: moderateScale(10),
  },
  headerLeftImage: {
    height: 26,
    width: 25,
    resizeMode: "contain",
    justifyContent: "center",
    alignSelf: "center",
    paddingHorizontal: moderateScale(18),
  },
});

const mapStateToProps = (state) => {
  return { roomServiceCount: state.roomServiceCount, spaCount: state.spaCount };
};

export default connect(mapStateToProps)(TopHeader);
