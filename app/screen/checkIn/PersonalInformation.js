import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import CountryCode from "../../config/CountryCodes";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAvoidingView } from "react-native";

function selectCountry(props) {
  const getCountries = CountryCode;
  const [open, setOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("+972");
  const [items, setItems] = useState(getCountries);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationality, setNationality] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [isIdNumber, setIsIdNumber] = useState(false);
  const [isNationality, setIsNationality] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);

  const _handleNextButton = () => {
    props.initPhoneNumber(phoneNumber);
    props.initIdNumber(idNumber);
    props.initCountryCode(dropdownValue);
    navigation.navigate("PersonalInformation2");
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
        title={"CHECK IN"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        logoImage={require("../../assets/TopHeader/checkIn1.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1, paddingBottom: "5%" }}>
        <ScrollView style={{ flexGrow: 1 }}>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Personal Info</Text>
            <Text>2 Of 6</Text>
          </View>
          <View style={styles.formView}>
            <View style={styles.contentView}>
              <Text style={styles.text}>*</Text>
              <Text style={styles.text}>Mobile Number</Text>
            </View>
            <View style={styles.dropDownContainer}>
              <DropDownPicker
                open={open}
                items={getCountries}
                value={dropdownValue}
                setOpen={setOpen}
                setValue={setDropdownValue}
                setItems={setItems}
                containerStyle={{ width: "31%" }}
                dropDownMaxHeight={500}
                dropDownStyle={{
                  backgroundColor: "#fff",
                }}
                placeholder=""
                labelStyle={styles.labelStyle}
                style={[
                  styles.dropDownStyle,
                  {
                    borderColor: isPhoneNumber ? colors.primary : colors.white,
                  },
                ]}
              />
              <View
                style={[
                  styles.numberContainer,
                  {
                    borderTopColor: isPhoneNumber
                      ? colors.primary
                      : colors.white,
                    borderBottomColor: isPhoneNumber
                      ? colors.primary
                      : colors.white,
                    borderRightColor: isPhoneNumber
                      ? colors.primary
                      : colors.white,
                  },
                ]}
              >
                <Text style={styles.countryCode}>{dropdownValue}</Text>
                <TextInput
                  style={styles.numberTextInput}
                  placeholder="0000000000 e.g"
                  placeholderTextColor="grey"
                  keyboardType={"numeric"}
                  onChangeText={(text) => {
                    setPhoneNumber(text);
                    setIsPhoneNumber(true);
                  }}
                />
              </View>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.text}>*</Text>
              <Text style={styles.text}>Nationality {""}(English)</Text>
            </View>

            <TextInput
              placeholder="Canadian e.g"
              placeholderTextColor="grey"
              style={[
                styles.textInput,
                {
                  borderColor: isNationality ? colors.primary : colors.white,
                },
              ]}
              onChangeText={(text) => {
                setNationality(text);
                setIsNationality(true);
              }}
            />

            <View style={styles.contentView}>
              <Text style={styles.text}>*</Text>
              <Text style={styles.text}>ID Number</Text>
            </View>

            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: isIdNumber ? colors.primary : colors.white,
                },
              ]}
              placeholder="0000000000 e.g"
              placeholderTextColor="grey"
              keyboardType={"numeric"}
              onChangeText={(text) => {
                setIdNumber(text);
                setIsIdNumber(true);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              _handleNextButton();
            }}
            disabled={
              isPhoneNumber == false ||
              isIdNumber == false ||
              isNationality == false
                ? true
                : false
            }
            style={
              isPhoneNumber == false ||
              isIdNumber == false ||
              isNationality == false
                ? styles.disableNextButton
                : styles.enableNextButton
            }
          >
            <Text
              style={{
                color:
                  isPhoneNumber == false ||
                  isIdNumber == false ||
                  isNationality == false
                    ? colors.primary
                    : colors.white,
              }}
            >
              NEXT
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  disableNextButton: {
    padding: moderateScale(15.5),
    color: colors.primary,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 8,
    alignItems: "center",
    fontSize: moderateScale(12),
    borderWidth: moderateScale(2),
    width: moderateScale(165),
    borderColor: colors.primary,
    marginTop: "13%",
  },

  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    top: 0,
    position: "absolute",
  },
  headingView: {
    width: "92%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(16),
  },

  headingText: {
    color: colors.darkGray,
    marginHorizontal: moderateScale(30),
    fontSize: 17,
    fontWeight: "900",
  },
  formView: {
    width: "80%",
    alignSelf: "center",
    marginTop: moderateScale(5),
  },
  textInput: {
    color: colors.spaTextColor,
    fontSize: moderateScale(14),
    backgroundColor: "white",
    paddingHorizontal: moderateScale(13),
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(1.5),
    borderRadius: moderateScale(5),
    marginTop: moderateScale(10),
  },
  text: {
    marginHorizontal: moderateScale(1),
    color: colors.spaTextColor,
    fontWeight: "900",
    fontSize: moderateScale(13),
  },
  contentView: {
    flexDirection: "row",
    marginTop: moderateScale(15),
  },
  enableNextButton: {
    padding: moderateScale(15.5),
    // color: colors.primary,
    backgroundColor: colors.primary,
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 8,
    alignItems: "center",
    fontSize: moderateScale(12),
    borderWidth: moderateScale(2),
    width: moderateScale(165),
    borderColor: colors.primary,
    marginTop: "13%",
  },
  dropDownContainer: {
    flexDirection: "row",
    marginTop: moderateScale(10),
    height: moderateScale(50),
    width: "100%",
  },
  labelStyle: {
    alignSelf: "flex-start",
  },
  dropDownStyle: {
    height: moderateScale(50),
    borderRadius: 0,
    borderTopLeftRadius: moderateScale(5),
    borderBottomLeftRadius: moderateScale(5),
    borderWidth: 1.5,
  },
  countryCode: {
    color: colors.spaTextColor,
    fontSize: moderateScale(13),
    width: "18%",
    textAlign: "center",
    paddingTop: moderateScale(12),
  },
  numberTextInput: {
    width: "80%",
    paddingHorizontal: moderateScale(13),
    borderTopRightRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
    paddingBottom: moderateScale(15),
  },
  numberContainer: {
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    backgroundColor: "white",
    flexDirection: "row",
    width: "70%",
    borderTopRightRadius: moderateScale(4.7),
    borderBottomRightRadius: moderateScale(5),
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    initPhoneNumber(data) {
      dispatch({
        type: "INIT_PHONE_NUMBER",
        payload: data,
      });
    },
    initIdNumber(data) {
      dispatch({
        type: "INIT_ID_NUMBER",
        payload: data,
      });
    },
    initCountryCode(data) {
      dispatch({
        type: "INIT_DROPDOWN_NUMBER",
        payload: data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    spaData: state.spaData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(selectCountry);
