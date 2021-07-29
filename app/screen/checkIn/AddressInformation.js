import React, { useState } from "react";
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
  const [value, setValue] = useState("+972");
  const [items, setItems] = useState(getCountries);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [isAddress, setIsAddress] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isCarNumber, setIsCarNumber] = useState(false);

  const _handleNextButton = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let checkEmail = reg.test(String(email).toLowerCase());
    if (checkEmail == true) {
      props.initEmail(email);
      props.initAddress(address);
      navigation.navigate("PrivacyPolicy1");
    } else {
      alert("Please enter the valid email");
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
        title={"CHECK IN"}
        headerImage={require("../../assets/TopHeader/sideIcon.png")}
        logoImage={require("../../assets/TopHeader/checkIn1.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView style={{ flex: 1, paddingBottom: "5%" }}>
        <ScrollView>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Personal Info</Text>
            <Text>2 Of 6</Text>
          </View>
          <View style={styles.formView}>
            <View style={styles.contentView}>
              <Text style={styles.text}>*</Text>
              <Text style={styles.text}>Address{""} (English)</Text>
            </View>
            <View style={styles.dropDownContainer}>
              <DropDownPicker
                open={open}
                items={getCountries}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
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
                    borderColor: isAddress ? colors.primary : colors.white,
                  },
                ]}
              />
              <View
                style={[
                  styles.addressContainer,
                  {
                    borderTopColor: isAddress ? colors.primary : colors.white,
                    borderBottomColor: isAddress
                      ? colors.primary
                      : colors.white,
                    borderRightColor: isAddress ? colors.primary : colors.white,
                  },
                ]}
              >
                <TextInput
                  multiline={true}
                  style={styles.numberTextInput}
                  placeholder="123 Main Street e.g."
                  placeholderTextColor="grey"
                  onChangeText={(text) => {
                    setAddress(text);
                    setIsAddress(true);
                  }}
                />
              </View>
            </View>
            <View style={styles.contentView}>
              <Text style={styles.text}>*</Text>
              <Text style={styles.text}>E-Mail </Text>
            </View>

            <TextInput
              placeholder="abc@gmail.com e.g"
              placeholderTextColor="grey"
              style={[
                styles.textInput,
                {
                  borderColor: isEmail ? colors.primary : colors.white,
                },
              ]}
              onChangeText={(text) => {
                setEmail(text);
                setIsEmail(true);
              }}
            />

            <View style={styles.contentView}>
              <Text style={styles.text}>*</Text>
              <Text style={styles.text}>Car Number</Text>
            </View>

            <TextInput
              style={[
                styles.textInput,
                {
                  borderColor: isCarNumber ? colors.primary : colors.white,
                },
              ]}
              placeholder="0000000000 e.g"
              placeholderTextColor="grey"
              onChangeText={(text) => {
                setCarNumber(text);
                setIsCarNumber(true);
              }}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              _handleNextButton();
            }}
            disabled={
              isEmail == false || isAddress == false || isCarNumber == false
                ? true
                : false
            }
            style={
              isEmail == false || isAddress == false || isCarNumber == false
                ? styles.disableNextButton
                : styles.enableNextButton
            }
          >
            <Text
              style={{
                color:
                  isEmail == false || isAddress == false || isCarNumber == false
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
  enableNextButton: {
    padding: moderateScale(15.5),
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
    fontSize: moderateScale(12.5),
    width: "20%",
    backgroundColor: "white",
    paddingHorizontal: moderateScale(13),
    fontWeight: "900",
  },
  numberTextInput: {
    width: "75%",
    backgroundColor: "white",
    paddingHorizontal: moderateScale(13),
    borderTopRightRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
    padding: moderateScale(2),
  },
  addressContainer: {
    borderRightWidth: 1.5,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    backgroundColor: "white",
    flexDirection: "row",
    width: "70.3%",
    borderTopRightRadius: moderateScale(5),
    borderBottomRightRadius: moderateScale(5),
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    initEmail(data) {
      dispatch({
        type: "INIT_EMAIL",
        payload: data,
      });
    },
    initAddress(data) {
      dispatch({
        type: "INIT_ADDRESS",
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
