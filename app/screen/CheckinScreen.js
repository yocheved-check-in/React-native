import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import CheckinButton from "../component/DigitalCheckin/CheckinButton";
import UserDetails from "../component/DigitalCheckin/UserDetails";
import * as Animatable from "react-native-animatable";
import PassportImage from "../component/DigitalCheckin/PassportImage";
import Sign from "../component/DigitalCheckin/Signature";
import colors from "../config/colors";
import { AntDesign as Icon } from "@expo/vector-icons";
import i18n, { t } from "../services/i18n";

function CheckinScreen() {
  const [showReg, setShowReg] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showSig, setShowSig] = useState(false);
  const [animation, setAnimation] = useState("zoomIn");
  const [scrollEnabled, setscrollEnabled] = useState(true);
  const ref = useRef();

  const regSubmit = () => {
    setAnimation("zoomOut");
    wait(showRegButton);
  };

  const sigSubmit = (signature) => {
    setAnimation("zoomOut");
    wait(showSigButton);
  };

  const photoSubmit = (photo) => {
    setAnimation("zoomOut");
    wait(showPhotoButton);
  };

  const showRegButton = () => {
    setShowReg(false);
    setShowPhoto(true);
    setAnimation("zoomIn");
  };

  const showSigButton = () => {
    setShowSig(false);
    setAnimation("zoomIn");
  };

  const showPhotoButton = () => {
    setShowPhoto(false);
    setShowSig(true);
    setAnimation("zoomIn");
  };

  const wait = (func) => {
    setTimeout(function () {
      {
        func();
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.jpg")}
        style={styles.background}
      />
      <TouchableOpacity>
        <Icon
          name="leftcircleo"
          size={50}
          color={colors.white}
          style={{ top: 50, left: i18n.isRTL ? -30 : 30 }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: colors.white,
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          marginTop: 90,
          marginBottom: 20,
          width: "80%",
          justifyContent: "center",
          alignSelf: "center",
          // height: "20%",
        }}
      >
        {t("CheckIn:welcomeText")}
      </Text>

      <ScrollView
        //stickyHeaderIndices={[0]}
        centerContent={true}
        scrollEnabled={scrollEnabled}
        contentContainerStyle={styles.scrollView}
      >
        {!showReg && (
          <CheckinButton
            icon="user"
            text={t("CheckIn:registration")}
            pressed={() => {
              if (!showPhoto && !showSig) setShowReg(true);
            }}
            style={styles.button}
          />
        )}
        {showReg && (
          <Animatable.View animation={animation} duration={700}>
            <UserDetails onSubmit={regSubmit} />
          </Animatable.View>
        )}

        {!showPhoto && (
          <CheckinButton
            icon="passport"
            text={t("CheckIn:passport")}
            pressed={() => {
              if (!showSig && !showReg) setShowPhoto(true);
            }}
            style={styles.button}
          />
        )}

        {showPhoto && (
          <Animatable.View
            animation={animation}
            duration={700}
            style={styles.camera}
          >
            <PassportImage onSubmit={photoSubmit} />
          </Animatable.View>
        )}

        {!showSig && (
          <CheckinButton
            icon="signature"
            text={t("CheckIn:signature")}
            pressed={() => {
              if (!showPhoto && !showReg) setShowSig(true);
            }}
            style={styles.button}
          />
        )}

        {showSig && (
          <Animatable.View animation={animation} duration={700}>
            <View style={styles.sig}>
              <Sign
                onSubmit={sigSubmit}
                onEnd={() => setscrollEnabled(true)}
                onBegin={() => setscrollEnabled(false)}
              />
            </View>
          </Animatable.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
    flexGrow: 1,
    width: "100%",
    flex: 1,
  },

  background: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },

  sig: {
    width: "80%",
    height: 250,
    alignSelf: "center",
    marginTop: 35,
  },

  title: {
    color: "red",
    fontSize: 50,
    fontWeight: "bold",
  },

  camera: {
    marginTop: 35,
  },

  scrollView: {
    flexGrow: 1,
    paddingBottom: 80,
    paddingTop: 30,
  },
});
export default CheckinScreen;
