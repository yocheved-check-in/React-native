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
  Image,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { CATEGORY } from "../../config/enums";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import { Icon } from "react-native-elements";

function AddCheckInName(props) {
  const [isValidFirstName, setValidFirstName] = useState(false);
  const [isValidLastName, setValidLastName] = useState(false);
  const [checkFirstName, setCheckFirstName] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [onTextChange, setOnTextChange] = useState(false);
  const [firstName, setFirstName] = useState(false);
  const [lastName, setLastName] = useState(false);

  const onTextInputChange = (text) => {
    setLastName(text);
    setOnTextChange(true);
    if (text.trim().length >= 3) {
      setCheckFirstName(false);
      setValidFirstName(true);
    } else {
      setCheckFirstName(true);
      setValidFirstName(false);
    }
  };
  const onLastNameTextChange = (text) => {
    setFirstName(text);
    if (text.trim().length >= 3) {
      setCheckLastName(false);
      setValidLastName(true);
    } else {
      setCheckLastName(true);
      setValidLastName(false);
    }
  };

  const _handleNextButton = () => {
    if (isValidFirstName == true && isValidLastName == true) {
      props.initCheckInFirstName(firstName),
        props.initCheckInLastName(lastName);
      navigation.navigate("PersonalInformation");
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
        headerImage={require("../../assets/sideicon.png")}
        logoImage={require("../../assets/TopHeader/checkIn1.png")}
        type={CATEGORY.ROOM_SERVICE}
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />

      <View style={styles.headingView}>
        <Text style={styles.headingText}>Personal Info</Text>
        <Text>1 Of 6</Text>
      </View>
      <View style={styles.formView}>
        <View style={styles.contentView}>
          <Text
            style={[
              styles.text,
              {
                color: checkFirstName ? colors.pinkColor : colors.spaTextColor,
              },
            ]}
          >
            *
          </Text>
          <Text style={styles.text}>First Name {""}(English)</Text>
        </View>
        <Card
          containerStyle={[
            styles.cardStyle,
            {
              borderColor: checkFirstName ? colors.pinkColor : colors.white,
            },
          ]}
        >
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Jacob e.g"
              placeholderTextColor="grey"
              style={styles.textInput}
              onChangeText={(text) => onTextInputChange(text)}
            />
            {isValidFirstName ? (
              <Icon
                style={styles.iconStyle}
                name="check-circle"
                type="font-awesome-5"
                color={colors.primary}
                size={30}
              />
            ) : null}

            {checkFirstName ? (
              <Text style={styles.errorText}>
                Name Must Be At Least 3 Characters
              </Text>
            ) : null}
          </View>
        </Card>
        <View style={styles.contentView}>
          <Text style={styles.text}>*</Text>
          <Text style={styles.text}>Last Name {""}(English)</Text>
        </View>

        <Card
          containerStyle={[
            styles.cardStyle,
            {
              borderColor: checkLastName ? colors.pinkColor : colors.white,
            },
          ]}
        >
          <View style={styles.textInputView}>
            <TextInput
              placeholder="Smith e.g"
              placeholderTextColor="grey"
              style={styles.textInput}
              onChangeText={(text) => onLastNameTextChange(text)}
            />
            {isValidLastName ? (
              <Icon
                style={styles.iconStyle}
                name="check-circle"
                type="font-awesome-5"
                color={colors.primary}
                size={30}
              />
            ) : null}

            {checkLastName ? (
              <Text style={styles.errorText}>
                Name Must Be At Least 3 Characters
              </Text>
            ) : null}
          </View>
        </Card>
      </View>

      <TouchableOpacity
        disabled={
          isValidFirstName == true && isValidLastName == true ? false : true
        }
        onPress={() => {
          _handleNextButton();
        }}
        style={
          isValidFirstName == true && isValidLastName == true
            ? styles.enableNextButton
            : styles.disableNextButton
        }
      >
        <Text
          style={{
            color:
              isValidFirstName == true && isValidLastName == true
                ? colors.white
                : colors.primary,
          }}
        >
          NEXT
        </Text>
      </TouchableOpacity>
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
  cardStyle: {
    elevation: 6,
    width: "100%",
    alignSelf: "center",
    height: moderateScale(50),
    padding: 1,
    borderRadius: moderateScale(5),
    marginTop: moderateScale(10),
    borderWidth: moderateScale(1.5),
  },
  textInput: {
    color: colors.spaTextColor,
    fontSize: 15,
    paddingHorizontal: moderateScale(13),
  },
  text: {
    marginHorizontal: moderateScale(1),
    color: colors.spaTextColor,
    fontWeight: "900",
    fontSize: moderateScale(13),
  },
  contentView: {
    flexDirection: "row",
    marginTop: moderateScale(10),
  },
  languageText: {
    marginTop: moderateScale(15),
    marginHorizontal: moderateScale(1),
    color: colors.spaTextColor,
  },
  iconStyle: {
    marginTop: moderateScale(8),
    marginRight: moderateScale(5),
  },
  errorText: {
    fontSize: moderateScale(9.5),
    marginRight: moderateScale(5),
    color: colors.pinkColor,
    textAlignVertical: "center",
  },
  textInputView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    initCheckInFirstName(data) {
      dispatch({
        type: "INIT_CHECKIN_FIRSTNAME",
        payload: data,
      });
    },
    initCheckInLastName(data) {
      dispatch({
        type: "INIT_CHECKIN_LASTNAME",
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

export default connect(mapStateToProps, mapDispatchToProps)(AddCheckInName);
