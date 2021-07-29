import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import colors from "../../config/colors";
import { FontAwesome as Icon } from "@expo/vector-icons";

export default function App({ onCapture }) {
  var { camera } = Camera;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync();
    console.log(photo);
    onCapture(photo.uri);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    

    if (!result.cancelled) {
      onCapture(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.cameraSelect}
        ref={(r) => {
          camera = r;
        }}
      >
        <TouchableOpacity
          onPress={takePicture}
          style={styles.takeSnap}
        >
          <Icon name="camera" size={40} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.Pickimage}
        >
          <Icon name="photo" size={25} color={colors.primary} />
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.opacity,
    alignItems: "center",
  },
  cameraSelect:{
    width: "80%",
    height: 250,
  },
  takeSnap:{
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  pickImage:{
    position: "absolute",
    bottom: 10,
    right: 10,
  }
});
