import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import PassportCamera from "./PassportCamera";
import colors from "../../config/colors";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Camera } from "expo-camera";

import { t } from "../../services/i18n";

function PassportImage({ onSubmit }) {
  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);

  const startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setShowCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const closeCamera = (photo) => {
    photo ? onSubmit(photo) : onSubmit();
  };

  const captureImage = (photo) => {
    setShowCamera(false);
    setPhoto(photo);
  };

  return (
    <>
      {!showCamera ? (
        <View style={styles.container}>
          {!photo ? (
            <>
              <Icon
                name="camera"
                size={75}
                color={colors.primary}
                onPress={startCamera}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeCamera}
                underlayColor="#fff"
              >
                <Text style={styles.submitText}>X</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={startCamera} style={{ width: "90%" }}>
                <Image
                  source={{ uri: photo }}
                  resizeMode={"stretch"}
                  style={styles.photo}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={closeCamera}
                underlayColor="#fff"
              >
                <Text style={styles.submitText}>{t("CheckIn:submit")}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : null}
      {showCamera ? (
        <PassportCamera
          style={styles.camera}
          onCapture={(photo) => captureImage(photo)}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 250,
    backgroundColor: colors.opacityWhite,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  camera: {
    position: "absolute",
    flex: 1,
  },
  photo: {
    height: 180,
    width: "90%",
    alignSelf: "center",
    marginBottom: 5,
  },
  submitButton: {
    marginTop: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 35,
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    height: 22,
    width: "7%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
    position: "absolute",
  },
});
export default PassportImage;
