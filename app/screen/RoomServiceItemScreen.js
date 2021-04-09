import React from "react";
import {
  NativeModules,
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import ImageItem from "../component/ImageItem";
import colors from "../config/colors";
import { Button } from "react-native-elements";
import PlusTitle from "../component/PlusTitle";
import MultiSelectListModal from "../component/MultiSelectListModal";
import { connect } from "react-redux";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const extrasList = [
  "Tomatoes",
  "Olives",
  "Potatos",
  "Cheese",
  "Bread",
  "Mashroom",
  "Tomatoes",
  "Olives",
  "Potatos",
];

const drinkList = [
  "Cola can",
  "Cola bottle",
  "Cola zero can",
  "Cola zero bottle",
  "Orange juice",
  "Grape juice",
  "Watter bottle",
  "Instant coffee",
  "Tea",
  "Chocolate milk",
];

class RoomServiceItemScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showExtras: false,
      showDrinks: false,
      specialText: "",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      startMoveValue: new Animated.ValueXY(0, 0),
      endMoveValue: -Dimensions.get("window").height,
      startScaleValue: new Animated.Value(1),
      endScaleVale: 0.1,
      duration: 500,
      animatedStyle: { backgroundColor: colors.white },
    };

    this.setScreenOptions(false);
  }

  setScreenOptions = (transparent) => {
    const options = {
      animationEnabled: false,
      cardStyle: {
        backgroundColor: transparent ? "transparent" : "white",
        opacity: 1,
      },
    };

    this.props.changeScreenOptions(options);
  };

  render() {
    const item = this.props.route.params.item;

    var roomServiceCart = this.props.roomServiceCart;

    const addItem = () => {
      const n = roomServiceCart.indexOf(item);
      console.log(n);
      if (n == -1) {
        item["amount"] = 1;
        roomServiceCart.push(item);
        this.props.cartChange(roomServiceCart);
      } else {
        roomServiceCart[n].amount += 1;
      }

      this.props.addItem();

      this.setScreenOptions(true);

      this.setState({
        animatedStyle: {
          transform: [
            {
              translateX: this.state.startMoveValue.x,
              translateY: this.state.startMoveValue.y,
              scale: this.state.startScaleValue,
            },
          ],

          opacity: 1,
        },
      });

      Animated.sequence([
        Animated.timing(this.state.startScaleValue, {
          toValue: this.state.endScaleVale,
          duration: this.state.duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.startMoveValue, {
          toValue: {
            x: Dimensions.get("window").width,
            y: -Dimensions.get("window").height,
          },
          duration: this.state.duration,
          useNativeDriver: true,
        }),
      ]).start(() => this.props.navigation.goBack());
    };

    return (
      <Animated.View style={([styles.container], this.state.animatedStyle)}>
        <ImageItem
          image={item.imgurl}
          name={item.item_name}
          price={item.price}
        />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <MultiSelectListModal
          data={extrasList}
          setVisble={(bool) => this.setState({ showExtras: bool })}
          title="Extras"
          visible={this.state.showExtras}
        />

        <MultiSelectListModal
          data={drinkList}
          setVisble={(bool) => this.setState({ showDrinks: bool })}
          title="Drinks"
          visible={this.state.showDrinks}
        />

        <Button
          titleStyle={{ fontWeight: "bold" }}
          buttonStyle={styles.button}
          title="Order"
          onPress={(item) => addItem(item)}
        />
        <View style={styles.plusContainer}>
          <PlusTitle
            title="Extras"
            onPress={() => {
              this.setState({ showExtras: !this.state.showExtras });
            }}
          />
          <PlusTitle
            title="Drink"
            onPress={() => {
              this.setState({ showDrinks: !this.state.showDrinks });
            }}
          />
        </View>
        <TextInput
          style={styles.specialReq}
          placeholder="Special requests"
          placeholderTextColor={colors.primary}
          multiline={true}
          textAlignVertical={"center"}
        />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    height: "100%",
    width: "100%",
  },
  textContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 20,
    padding: 10,
    justifyContent: "center",
  },

  button: {
    width: "90%",
    alignSelf: "center",
  },

  chooseButton: {
    width: "95%",
    alignSelf: "center",
  },

  closeIcon: {
    top: 10,
    left: 10,
    position: "absolute",
  },

  description: {
    lineHeight: 25,
    fontSize: 15,
    fontWeight: "bold",
  },

  plusContainer: {
    margin: 20,
    height: 100,
    marginTop: 40,
    justifyContent: "space-around",
  },

  centeredView: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: "50%",
  },

  textStyle: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    position: "absolute",
    top: 0,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    paddingTop: 10,
  },
  specialReq: {
    width: "90%",
    borderColor: colors.primary,
    borderWidth: 2,
    borderRadius: 7,
    paddingVertical: 0,
    padding: 20,
    backgroundColor: "#d3e6ff",
    justifyContent: "center",
    alignSelf: "center",
    minHeight: 45,
  },
});

const mapStateToProps = (state) => {
  return {
    roomServiceCart: state.roomServiceCart,
  };
};

const mapDitpatchToProps = (dispatch) => {
  return {
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_ROOM_CART",
        payload: cart,
      });
    },
    addItem() {
      dispatch({
        type: "ADD_TO_ROOM_BADGE",
      });
    },
    changeScreenOptions(options) {
      dispatch({
        type: "SET_OPTIONS",
        payload: options,
      });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDitpatchToProps
)(RoomServiceItemScreen);
