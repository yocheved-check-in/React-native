import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import moment from "moment";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import DatePicker from "../../component/datePicker";
import SpaFooter from "../../component/Spa/spaFooter";

function spaOrder(route) {
  const [date, setDate] = useState("");
  const [showSpaDate, setShowSpaDate] = useState(
    moment().add(30, "minutes").format("HH:mm")
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isOrderDatePickerVisible, setOrderDatePickerVisibility] =
    useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [isOrderDateSelected, setIsOrderDateSelected] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirmDate = (date) => {
    if (date) {
      var formatDate = moment(date).format("HH:mm");
      setIsDateSelected(true);

      setShowSpaDate(formatDate);

      hideDatePicker();
    }
  };

  const showOrderDatePicker = () => {
    setOrderDatePickerVisibility(true);
  };
  const hideOrderDatePicker = () => {
    setOrderDatePickerVisibility(false);
  };
  const handleOrderConfirmDate = (orderDate) => {
    if (orderDate) {
      var formatDate = moment(orderDate).format("HH:mm");
      setIsOrderDateSelected(true);
      setOrderDate(formatDate);

      hideOrderDatePicker();
    }
  };
  return (
    <SafeAreaView forceInset={{ top: "never" }} style={styles.container}>
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
      <ScrollView
        style={{
          backgroundColor: colors.backgroundColor,
          flexGrow: 1,
          marginBottom: "5%",
        }}
      >
        <View style={styles.selectView}>
          <Text style={styles.allPackage}>Order Summary</Text>
        </View>
        {route.route.params.treatmentName == "Couples Treatments" ? (
          <View>
            <Card containerStyle={styles.cardStyle}>
              <View style={styles.patientView}>
                <Image
                  style={styles.pencilImage}
                  source={require("../../assets/spa/pencil.png")}
                />
                <Text style={styles.patientText}>moshe</Text>
              </View>
              <Text style={styles.questionText}>
                when would you like to receive the treatment?
              </Text>

              {!isDateSelected ? (
                <View>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.currentDateContainer}
                  >
                    <Text style={styles.currentDateText}>{"Today"}</Text>
                    <Text style={styles.currentDateText}>{showSpaDate}</Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode={"time"}
                    date={date}
                    isDatePickerVisible={isDatePickerVisible}
                    setDate={(date) => handleConfirmDate(date)}
                    hideDatePicker={hideDatePicker}
                    showDatePicker={showDatePicker}
                  />
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.currentDateContainer}
                  >
                    <Text style={styles.currentDateText}>{"Today"}</Text>
                    <Text style={styles.currentDateText}>{showSpaDate}</Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode={"time"}
                    date={date}
                    isDatePickerVisible={isDatePickerVisible}
                    setDate={(date) => handleConfirmDate(date)}
                    hideDatePicker={hideDatePicker}
                    showDatePicker={showDatePicker}
                  />
                </View>
              )}
            </Card>

            <Card containerStyle={styles.cardStyle}>
              <View style={styles.patientView}>
                <Image
                  style={styles.pencilImage}
                  source={require("../../assets/spa/pencil.png")}
                />
                <Text style={styles.patientText}>dena</Text>
              </View>
              <Text style={styles.questionText}>
                when would you like to receive the treatment?
              </Text>
              {!isOrderDateSelected ? (
                <View>
                  <TouchableOpacity
                    onPress={showOrderDatePicker}
                    style={styles.currentDateContainer}
                  >
                    <Text style={styles.currentDateText}>{"Today"}</Text>
                    <Text style={styles.currentDateText}>{showSpaDate}</Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode={"time"}
                    date={orderDate}
                    isDatePickerVisible={isOrderDatePickerVisible}
                    setDate={(orderDate) => handleOrderConfirmDate(orderDate)}
                    hideDatePicker={hideOrderDatePicker}
                    showDatePicker={showOrderDatePicker}
                  />
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    onPress={showDatePicker}
                    style={styles.currentDateContainer}
                  >
                    <Text style={styles.currentDateText}>{"Today"}</Text>
                    <Text style={styles.currentDateText}>{showSpaDate}</Text>
                  </TouchableOpacity>
                  <DatePicker
                    mode={"time"}
                    date={date}
                    isDatePickerVisible={isDatePickerVisible}
                    setDate={(date) => handleConfirmDate(date)}
                    hideDatePicker={hideDatePicker}
                    showDatePicker={showDatePicker}
                  />
                </View>
              )}
            </Card>
          </View>
        ) : (
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.patientView}>
              <Image
                style={styles.pencilImage}
                source={require("../../assets/spa/pencil.png")}
              />
              <Text style={styles.patientText}>{route.user.name}</Text>
            </View>
            <Text style={styles.questionText}>
              when would you like to receive the treatment?
            </Text>

            {!isDateSelected ? (
              <View style={{ marginBottom: "-10%" }}>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.currentDateContainer}
                >
                  <Text style={styles.currentDateText}>{"Today"}</Text>
                  <Text style={styles.currentDateText}>{showSpaDate}</Text>
                </TouchableOpacity>
                <DatePicker
                  mode={"time"}
                  date={date}
                  isDatePickerVisible={isDatePickerVisible}
                  setDate={(date) => handleConfirmDate(date)}
                  hideDatePicker={hideDatePicker}
                  showDatePicker={showDatePicker}
                />
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  onPress={showDatePicker}
                  style={styles.currentDateContainer}
                >
                  <Text style={styles.currentDateText}>{"Today"}</Text>
                  <Text style={styles.currentDateText}>{showSpaDate}</Text>
                </TouchableOpacity>
                <DatePicker
                  mode={"time"}
                  date={date}
                  isDatePickerVisible={isDatePickerVisible}
                  setDate={(date) => handleConfirmDate(date)}
                  hideDatePicker={hideDatePicker}
                  showDatePicker={showDatePicker}
                />
              </View>
            )}
          </Card>
        )}
      </ScrollView>
      <SpaFooter
        nextButtonPress={() =>
          navigation.navigate("SpaOrderSummary", {
            date: showSpaDate,
          })
        }
        addTreatmentPress={() => navigation.navigate("Spa")}
        disabledStyle={true}
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
    marginTop: moderateScale(18),
  },
  addTreatmentTouchable: {
    alignSelf: "center",
    justifyContent: "center",
  },
  allPackage: {
    color: colors.primary,
    fontSize: 15,
    left: moderateScale(14),
    fontFamily: "Roboto-Regular",
  },
  nextButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: colors.backgroundColor,
    paddingBottom: "15%",
  },
  addTreatmentText: {
    alignSelf: "center",
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: "500",
    fontSize: 16,
  },
  pencilImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: "contain",
  },
  patientText: {
    padding: moderateScale(5),
    textDecorationLine: "underline",
    color: colors.spaTextColor,
    fontSize: moderateScale(12),
  },
  patientView: {
    flexDirection: "row",
    left: moderateScale(10),
  },
  cardStyle: {
    elevation: 2,

    width: moderateScale(335),
    alignSelf: "center",

    backgroundColor: colors.lowGrayShade,
    borderRadius: moderateScale(5),
  },
  questionText: {
    color: colors.darkGray,
    marginLeft: moderateScale(5),
    fontSize: 14,
    fontFamily: "Roboto-Regular",
  },
  nextButton: {
    alignItems: "center",
    width: moderateScale(150),
    marginLeft: moderateScale(20),
    padding: moderateScale(14),
    backgroundColor: colors.primary,
    borderRadius: 7,
  },
  pickerContainer: {
    flexDirection: "row",
    color: colors.primary,
    fontSize: 15,
    width: "90%",
    alignSelf: "center",
    paddingVertical: moderateScale(15),
    marginTop: "6%",
    paddingHorizontal: "2%",
    backgroundColor: colors.opacityWhite,
    borderColor: colors.gray,
    borderWidth: 1,
  },

  currentDateText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: moderateScale(15),
  },
  currentDateContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: moderateScale(10),
    width: "94%",
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginTop: moderateScale(18),
  },
});

const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
    spaCart: state.spaCart,
    order: state.order,
    user: state.user,
  };
};

export default connect(mapStateToProps)(spaOrder);
