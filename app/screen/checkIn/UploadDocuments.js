import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Image,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import TopHeader from "../../component/TopHeader";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { moderateScale } from "react-native-size-matters";
import { Card } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";

function UploadDocument(props) {
  const [idCard, setIdCard] = useState("");
  const [coronaCertificate, setCoronaCertificate] = useState("");
  const [showIdImage, setShowIdImage] = useState(false);
  const [showCovidImage, setShowCovidImage] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showCertificateProgressBar, setShowCertificateProgressBar] =
    useState(false);
  const [loader, setLoader] = useState(false);

  const pickImage = async (isId) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],

      quality: 1,
    });
    if (!result.cancelled) {
      if (isId) {
        setIdCard(result.uri);
        props.initIdImage(idCard);
        setShowIdImage(true);
        setShowProgressBar(true);
      } else {
        setCoronaCertificate(result.uri);
        props.initCoronaCertificate(coronaCertificate);
        setShowCovidImage(true);
        setShowCertificateProgressBar(true);
      }
    }
  };

  const pickImageFromCamera = async (isId) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      if (isId) {
        setIdCard(result.uri);
        props.initIdImage(idCard);
        setShowIdImage(true);
        setShowProgressBar(true);
      } else {
        setCoronaCertificate(result.uri);
        props.initCoronaCertificate(coronaCertificate);
        setShowCovidImage(true);
        setShowCertificateProgressBar(true);
      }
    }
  };
  const _handleNextButton = () => {
    setTimeout(() => {
      addOrderSummary();
    }, 100);
  };

  / Implement Add ORder Summary Api /;
  const addOrderSummary = () => {
    setLoader(true);
    let mobileNumber = props.countryCode + props.phoneNumber;
    let formData = new FormData();
    let docPhoto = {
      uri: idCard,
      type: "image/jpeg",
      name: "photo.jpg",
    };
    let covidImage = {
      uri: coronaCertificate,
      type: "image/jpeg",
      name: "photo.jpg",
    };
    formData.append("docImg", docPhoto);
    formData.append("OrderNumber", props.order.id);
    formData.append("signImg", props.signImg);
    formData.append("covidImg", covidImage);
    formData.append("langId", "12");
    formData.append("firstName", props.firstName);
    formData.append("lastName", props.lastName);
    formData.append("docNumber", props.docNumber);
    // formData.append("docNumber", props.docNumber);
    formData.append("email", props.email);
    formData.append("phoneNumber", mobileNumber);
    formData.append("address", props.address);

    return fetch("http://checkin.parvaty.com/api/precheckin", {
      method: "POST",
      body: formData,

      headers: {
        Accept: "application/json, text/plain, */*", // It can be used to overcome cors errors
        "Content-Type": "multipart/form-data",
      },
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == true) {
          navigation.navigate("checkinSuccessFully");

          setLoader(false);
          return response;
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        alert(error);
        setLoader(false);
      });
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
        {...navigation}
        rightImage={require("../../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      {loader ? (
        <ActivityIndicator
          size="large"
          style={styles.loader}
          color={colors.primary}
        />
      ) : null}
      <View style={{ flex: 0.07 }}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Uploading Documents</Text>
          <Text>6 Of 6</Text>
        </View>
      </View>
      <View style={{ flex: 0.17 }}>
        <Text style={styles.text}>
          * Passport / ID card {showIdImage ? "(1 Image is selected)" : null}
        </Text>

        <View style={styles.cardView}>
          <Card containerStyle={styles.cardStyle}>
            <TouchableOpacity
              onPress={() => pickImageFromCamera(true)}
              style={styles.contentContainer}
            >
              <Image
                source={require("../../assets/checkIn/camera.png")}
                style={styles.cameraImage}
              />
              <Text style={styles.cardText}>Scan</Text>
            </TouchableOpacity>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <TouchableOpacity
              onPress={() => pickImage(true)}
              style={styles.contentContainer}
            >
              <Image
                source={require("../../assets/checkIn/upload.png")}
                style={styles.cameraImage}
              />
              <Text style={styles.cardText}>Upload</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </View>

      <View style={{ flex: 0.17 }}>
        <Text style={styles.text}>
          * Corona Virus Certification{" "}
          {showCovidImage ? "(1 Image is selected)" : null}
        </Text>

        <View style={styles.cardView}>
          <Card containerStyle={styles.cardStyle}>
            <TouchableOpacity
              onPress={() => pickImageFromCamera(false)}
              style={styles.contentContainer}
            >
              <Image
                source={require("../../assets/checkIn/camera.png")}
                style={styles.cameraImage}
              />
              <Text style={styles.cardText}>Scan</Text>
            </TouchableOpacity>
          </Card>
          <Card containerStyle={styles.cardStyle}>
            <TouchableOpacity
              onPress={() => pickImage(false)}
              style={styles.contentContainer}
            >
              <Image
                source={require("../../assets/checkIn/upload.png")}
                style={styles.cameraImage}
              />
              <Text style={styles.cardText}>Upload</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </View>
      <View style={{ flex: 0.6, justifyContent: "center" }}>
        <TouchableOpacity
          disabled={
            showProgressBar == false || showCertificateProgressBar == false
              ? true
              : false
          }
          style={
            showProgressBar == false || showCertificateProgressBar == false
              ? styles.disableNextButton
              : styles.enableNextButton
          }
          onPress={() => _handleNextButton()}
        >
          <Text
            style={{
              color:
                showProgressBar == false || showCertificateProgressBar == false
                  ? colors.primary
                  : colors.white,
            }}
          >
            NEXT
          </Text>
        </TouchableOpacity>
      </View>
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
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(16),
    alignSelf: "center",
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
    marginTop: moderateScale(25),
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
    marginTop: moderateScale(25),
  },
  headingText: {
    color: colors.darkGray,
    marginHorizontal: moderateScale(22),
    fontSize: moderateScale(16),
    fontWeight: "900",
  },

  cardStyle: {
    elevation: 10,
    height: moderateScale(55),
    borderRadius: moderateScale(5),
    width: "43%",
    margin: 0,
    alignItems: "center",
  },
  text: {
    color: colors.spaTextColor,
    fontWeight: "900",
    fontSize: moderateScale(13),
    width: "80%",
    alignSelf: "center",
  },
  contentView: {
    marginTop: moderateScale(15),
    width: "82%",
    alignSelf: "center",
    marginLeft: moderateScale(20),
  },
  cameraImage: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: "contain",
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: moderateScale(10),
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    color: colors.spaTextColor,
    marginLeft: moderateScale(5),
    fontSize: moderateScale(13),
    marginBottom: moderateScale(2),
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    zIndex: 1,
    marginTop: "50%",
  },
});
const mapDispatchToProps = (dispatch) => {
  return {
    initUploadPhoto(data) {
      dispatch({
        type: "INIT_UPLOAD_PHOTO",
        payload: data,
      });
    },
    initIdImage(data) {
      dispatch({
        type: "INIT_ID_IMAGE",
        payload: data,
      });
    },
    initCoronaCertificate(data) {
      dispatch({
        type: "INIT_CORONA_CERTIFICATE",
        payload: data,
      });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    firstName: state.checkInFirstName,
    lastName: state.checkInLastName,
    email: state.checkInEmail,
    signImg: state.signature,
    docImg: state.CheckInIdImage,
    covidImg: state.checkInCoronaCertificate,
    docNumber: state.checkInIDNumber,
    address: state.checkInAddress,
    phoneNumber: state.checkInPhoneNumber,
    order: state.order,
    countryCode: state.checkInCountryCode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadDocument);
