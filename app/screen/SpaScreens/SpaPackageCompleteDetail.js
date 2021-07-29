import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import CompleteDetail from "../../component/Spa/CompleteDetail";
import { Card } from "react-native-elements";
import SpaFooter from "../../component/Spa/spaFooter";

function SpaPackageCompleteDetail(props) {
  const [spaDetail, setSpaDetail] = useState(props.route.params.spaDetail);
  const [isPackageSelected, setIsPackageSelected] = useState(true);
  const [quantityArray, setQuantityArray] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [quantityObject, setQuantityObject] = useState({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [id, setId] = useState(18);

  useMemo(() => {
    spaDetail.quantity = 1;
    let array = [];
    let quantityArrayObject = {
      TimeArray: spaDetail.item_variants,
      gender: spaDetail.gender,
      selectedGender: "",
      selectedTime: "",
      selectedId: "",
    };
    if (props.route.params.treatmentName == id) {
      //Add Patient one
      quantityArrayObject.name = "Patient 1";
      array.push({
        TimeArray: spaDetail.item_variants,
        gender: spaDetail.gender,
        selectedGender: "",
        selectedTime: "",
        name: "Patient 1",
        selectedId: "",
      });
      //Add Patient Two
      quantityArrayObject.name = "Patient 2";
      array.push({
        TimeArray: spaDetail.item_variants,
        gender: spaDetail.gender,
        selectedGender: "",
        selectedTime: "",
        name: "Patient 2",
        selectedId: "",
      });
    } else {
      //Add Patient one
      quantityArrayObject.name = "Patient 1";

      array.push(quantityArrayObject);
    }
    setQuantityArray(array);
    setQuantityObject(quantityArrayObject);
  }, [userDetails]);

  const handleNextButton = () => {
    let cartArray = [];
    for (let i = 0; i < quantityArray.length; i++) {
      let cartItem = {
        id: spaDetail.id,
        qty: 1,
        variant_id: quantityArray[i].selectedId,
        settings: {
          therapist_gender: quantityArray[i].selectedGender,
          length_of_treatment: quantityArray[i].selectedTime,
        },
      };
      cartArray.push(cartItem);
    }
    props.cartChange(cartArray);
    navigation.navigate("spaOrder", {
      treatmentName: props.route.params.treatmentName,
    });
  };

  const isEnable = () => {
    for (let i = 0; i < quantityArray.length; i++) {
      if (
        quantityArray[i].selectedGender == "" ||
        quantityArray[i].selectedTime == ""
      ) {
        return false;
      }
    }
    return true;
  };

  const incrementCartProduct = () => {
    if (props.route.params.treatmentName == id && quantityArray.length < 4) {
      setIsNextEnabled(false);
      quantityObject.name =
        "Patient " + (Number(quantityArray.length) + Number(1));

      let quanObject = {
        TimeArray: spaDetail.item_variants,
        gender: spaDetail.gender,
        selectedGender: "",
        selectedTime: "",
        selectedId: "",
        name: "Patient " + (Number(quantityArray.length) + Number(1)),
      };
      setQuantityArray((quantityArray) => [...quantityArray, quanObject]);

      let quanObjectAnother = {
        TimeArray: spaDetail.item_variants,
        gender: spaDetail.gender,
        selectedGender: "",
        selectedTime: "",
        selectedId: "",
        name: "Patient " + (Number(quantityArray.length) + Number(1)),
      };

      setQuantityArray((quantityArray) => [
        ...quantityArray,
        quanObjectAnother,
      ]);
      var spaServiceCart = spaDetail;
      spaServiceCart.quantity += 1;
      let price =
        Number(spaServiceCart.price) * Number(spaServiceCart.quantity);
      spaServiceCart.calculatePrice = price;
      setSpaDetail((spaDetail) => ({ ...spaDetail, ...spaServiceCart }));
    } else if (
      props.route.params.treatmentName != id &&
      quantityArray.length < 5
    ) {
      let quanObjectAnother = {
        TimeArray: spaDetail.item_variants,
        gender: spaDetail.gender,
        selectedGender: "",
        selectedTime: "",
        selectedId: "",
        name: "Patient " + (Number(quantityArray.length) + Number(1)),
      };

      setQuantityArray((quantityArray) => [
        ...quantityArray,
        quanObjectAnother,
      ]);
      var spaServiceCart = spaDetail;
      spaServiceCart.quantity += 1;
      let price =
        Number(spaServiceCart.price) * Number(spaServiceCart.quantity);
      spaServiceCart.calculatePrice = price;
      setSpaDetail((spaDetail) => ({ ...spaDetail, ...spaServiceCart }));
    } else {
      alert("Sorry this is max length for selected Treatment");
    }
    if (spaDetail.quantity >= 0) {
      setIsPackageSelected(true);
    }
  };

  const renderQuestionsView = (data, quantityIndex, user) => {
    return (
      <View>
        <Card containerStyle={styles.cardStyle}>
          <View style={styles.patientView}>
            <Image
              style={styles.pencilImage}
              source={require("../../assets/spa/pencil.png")}
            />
            <TextInput
              placeholder={data.name}
              placeholderTextColor="grey"
              maxLength={10}
              style={styles.textInput}
              onChangeText={(text) => {
                data.name = text;
              }}
            />
          </View>
        </Card>

        <Card containerStyle={styles.QuestionCard}>
          <Text style={styles.questionText}>
            What kind of therapist would you prefer?
          </Text>

          <View style={styles.preferredContainer}>
            {data.gender.map((item, index) => (
              <TouchableOpacity
                style={
                  data.selectedGender == item
                    ? styles.selectedItem
                    : styles.unselectedItem
                }
                onPress={() => {
                  data.selectedGender = item;
                  quantityArray[quantityIndex] = data;
                  let quantityData = [...quantityArray];
                  setQuantityArray(quantityData);
                  setTimeout(() => {
                    setIsNextEnabled(isEnable());
                  }, 500);
                }}
              >
                <Text
                  style={{
                    color:
                      data.selectedGender == item
                        ? colors.primary
                        : colors.spaTextColor,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
        <Card containerStyle={[styles.QuestionCard, { marginBottom: "1%" }]}>
          <Text style={styles.questionText}>
            What is preferred duration of treatment?
          </Text>

          <View style={styles.preferredContainer}>
            {data.TimeArray.map((item, index) => (
              <TouchableOpacity
                style={
                  data.selectedTime == item.variant_value
                    ? styles.selectedItem
                    : styles.unselectedItem
                }
                onPress={() => {
                  data.selectedTime = item.variant_value;
                  data.selectedId = item.id;
                  quantityArray[quantityIndex] = data;
                  let quantityData = [...quantityArray];
                  setQuantityArray(quantityData);
                  setTimeout(() => {
                    setIsNextEnabled(isEnable());
                  }, 500);
                }}
              >
                <Text
                  style={{
                    color:
                      data.selectedTime == item.variant_value
                        ? colors.primary
                        : colors.spaTextColor,
                    alignSelf: "center",
                    justifyContent: "center",
                    fontSize: moderateScale(10),
                  }}
                >
                  {item.variant_value} min
                  {index == 0 ? (
                    ""
                  ) : (
                    <Text>
                      (+
                      {item.variant_price -
                        spaDetail.item_variants[0].variant_price}
                      )
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>
      </View>
    );
  };

  //remove Item to Cart
  const decrementCartProduct = () => {
    if (props.route.params.treatmentName == id) {
      for (let i = 1; i < 3; i++) {
        quantityArray.pop();
      }
      var spaServiceCart = spaDetail;
      if (spaServiceCart.quantity > 0) spaServiceCart.quantity -= 1;

      let price;
      Number(spaServiceCart.price) * Number(spaServiceCart.quantity);
      spaServiceCart.calculatePrice = price;
      setSpaDetail((spaDetail) => ({ ...spaDetail, ...spaServiceCart }));
    } else {
      quantityArray.pop();
      var spaServiceCart = spaDetail;
      if (spaServiceCart.quantity > 0) spaServiceCart.quantity -= 1;

      let price =
        Number(spaServiceCart.price) * Number(spaServiceCart.quantity);
      spaServiceCart.calculatePrice = price;
      setSpaDetail((spaDetail) => ({ ...spaDetail, ...spaServiceCart }));
    }
    if (spaDetail.quantity <= 0) {
      setIsPackageSelected(false);
    }
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
        title={"SPA"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        style={styles.header}
        logoImage={require("../../assets/TopHeader/spa1.png")}
        type={CATEGORY.SPA}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <ScrollView style={{ flexGrow: 1 }}>
        <View style={styles.selectView}>
          <Text style={styles.allPackage}>Selected Treatments</Text>
        </View>
        <CompleteDetail
          image={{
            uri:
              spaDetail.imgurl == " "
                ? "data:image/jpeg;base64,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"
                : spaDetail.imgurl,
          }}
          name={spaDetail.item_name}
          showQuantity={spaDetail.quantity == 0 ? " " : "X"}
          description={spaDetail.description}
          price={
            spaDetail.calculatePrice
              ? parseFloat(spaDetail.calculatePrice).toFixed(2)
              : parseFloat(spaDetail.price).toFixed(2)
          }
          quantity={spaDetail.quantity == "0" ? " " : spaDetail.quantity}
          incrementCart={() => incrementCartProduct()}
          cartDecrement={() => decrementCartProduct()}
        />
        {quantityArray.map((item, index) =>
          renderQuestionsView(item, index, "person" + index)
        )}
      </ScrollView>

      <SpaFooter
        nextButtonPress={() => handleNextButton()}
        addTreatmentPress={() => navigation.navigate("Spa")}
        disabled={!isNextEnabled}
        disabledStyle={isNextEnabled}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Gray,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  selectView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    alignSelf: "center",
    marginTop: moderateScale(20),
  },
  fabIconContainer: {
    justifyContent: "flex-start",
    marginTop: moderateScale(15),
    top: 40,
  },
  addTreatmentTouchable: {
    alignSelf: "center",
    justifyContent: "center",
  },
  addTreatmentText: {
    alignSelf: "center",
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 16,
  },
  nextButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: moderateScale(10),
    backgroundColor: colors.backgroundColor,
  },
  disableNextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.lightBlue,
    borderRadius: 7,
  },
  allPackage: {
    color: colors.darkGray,
    fontSize: moderateScale(14),
    left: moderateScale(14),
  },
  pencilImage: {
    width: moderateScale(22),
    height: moderateScale(22),
    top: 10,
    right: 5,
  },
  patientText: {
    padding: moderateScale(5),
    textDecorationLine: "underline",
    color: colors.spaTextColor,
  },
  patientView: {
    flexDirection: "row",
    left: moderateScale(10),
  },
  cardStyle: {
    elevation: 10,
    backgroundColor: colors.backgroundColor,
    borderTopLeftRadius: moderateScale(6),
    borderTopRightRadius: moderateScale(6),
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  QuestionCard: {
    elevation: 6,
    width: moderateScale(335),
    alignSelf: "center",
  },
  questionText: {
    color: colors.darkGray,
    fontSize: moderateScale(15),
  },
  preferredContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  selectedItem: {
    borderWidth: 1,
    marginTop: "5%",
    paddingVertical: moderateScale(8),
    width: "33%",
    alignItems: "center",
    borderColor: colors.primary,
    borderRadius: moderateScale(5),
  },
  unselectedItem: {
    alignItems: "center",
    marginTop: "5%",
    paddingVertical: moderateScale(8),
    alignSelf: "center",
    width: "33%",
  },
  textInput: {
    color: colors.spaTextColor,
    fontSize: 15,
    width: "90%",
    alignSelf: "center",
    backgroundColor: colors.backgroundColor,
    borderColor: colors.backgroundColor,
    borderWidth: 1,
    paddingLeft: "5%",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_ROOM_CART",
        payload: cart,
      });
    },

    initUser(data) {
      dispatch({
        type: "INIT_USER",
        payload: data,
      });
    },

    initRoomService(data) {
      dispatch({
        type: "INIT_ROOM_DATA",
        payload: data,
      });
    },
    initSpa(data) {
      dispatch({
        type: "INIT_SPA_DATA",
        payload: data,
      });
    },
    initHouseKeeping(data) {
      dispatch({
        type: "INIT_HOUSE_DATA",
        payload: data,
      });
    },
    cartChange(cart) {
      dispatch({
        type: "ADD_TO_SPA_CART",
        payload: cart,
      });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
    user: state.user,
    roomServiceCart: state.roomServiceCart,
    spaCart: state.spaCart,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpaPackageCompleteDetail);
