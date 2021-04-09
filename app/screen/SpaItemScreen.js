import React from "react";
import {
  NativeModules,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
} from "react-native";
import ImageItem from "../component/ImageItem";
import colors from "../config/colors";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import RadioButtonRN from "radio-buttons-react-native";
import GenderCheckBoxes from "../component/Spa/GenderCheckBoxes";
import DropDownPicker from "react-native-dropdown-picker";
import { ScrollView } from "react-native-gesture-handler";

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const sinOrCoup = [
  {
    label: "Single",
  },
  {
    label: "Couple",
  },
];

class SpaItemScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      startMoveValue: new Animated.ValueXY(0, 0),
      endMoveValue: -Dimensions.get("window").height,
      startScaleValue: new Animated.Value(1),
      endScaleVale: 0.1,
      duration: 500,
      animatedStyle: { backgroundColor: colors.white },
      malehecked: false,
      femalehecked: false,
      value: "single",
      lengthArray: [],
      dropViewHeight: 150,
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

  dropDownOpen = (item, open) => {
    if (open) {
      if (item.length.length > 1) this.setState({ dropViewHeight: 250 });
    } else {
      this.setState({ dropViewHeight: 150 });
    }
  };

  render() {
    const item = this.props.route.params.item;

    var spaCart = this.props.spaCart;

    const addItem = () => {
      const n = spaCart.indexOf(item);
      console.log(n);
      if (n == -1) {
        item["amount"] = 1;
        spaCart.push(item);
        this.props.cartChange(spaCart);
      } else {
        spaCart[n].amount += 1;
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

    console.log(item);
    
    return (
      <Animated.View style={[styles.container, this.state.animatedStyle]}>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          <ImageItem image={item.image} name={item.name} price={item.price} />
          <View style={styles.textContainer}>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.rbView}>
            <Text style={styles.textStyle}>Type of treatment:</Text>
            <RadioButtonRN
              data={sinOrCoup}
              box={false}
              selectedBtn={(e) => console.log(e)}
              textStyle={styles.textStyle}
            />
          </View>
          <View
            style={{
              padding: 20,
              paddingBottom: 20,
            }}
          >
            <Text style={styles.genderTextStyle}>Therapist gender:</Text>
            <GenderCheckBoxes />
          </View>
          <View
            style={[styles.dropDownView, { height: this.state.dropViewHeight }]}
          >
            <Text style={styles.textStyle}>Length of treatment:</Text>
            <DropDownPicker
              items={item.length}
              defaultIndex={0}
              onOpen={() => this.dropDownOpen(item, true)}
              onClose={() => this.dropDownOpen(item, false)}
              placeholder="Select a length"
              containerStyle={{ height: 40, margin: 25 }}
              onChangeItem={(item) => console.log(item.label, item.value)}
              dropDownMaxHeight={500}
              labelStyle={{ color: colors.primary }}
            />
          </View>

          <Button
            titleStyle={{ fontWeight: "bold" }}
            buttonStyle={styles.button}
            title="Order"
            onPress={(item) => addItem(item)}
          />
        </ScrollView>
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

  rbView: {
    backgroundColor: colors.lightGray,
    padding: 20,
  },

  dropDownView: {
    backgroundColor: colors.lightGray,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-around",
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
  genderTextStyle: {
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
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
});

const mapStateToProps = (state) => {
  return {
    spaCart: state.spaCart,
  };
};

const mapDitpatchToProps = (dispatch) => {
  return {
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_SPA_CART",
        payload: cart,
      });
    },
    addItem() {
      dispatch({
        type: "ADD_TO_SPA_BADGE",
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

export default connect(mapStateToProps, mapDitpatchToProps)(SpaItemScreen);
