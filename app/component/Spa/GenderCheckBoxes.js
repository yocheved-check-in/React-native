import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { CheckBox } from "react-native-elements";

function GenderCheckBoxes(props) {
  const [femalehecked, setFemalehecked] = useState(false);
  const [malehecked, setMalehecked] = useState(false);

  return (
    <View style={styles.container}>
      <CheckBox
        title="Female"
        checkedIcon={
          <Image
            resizeMode="contain"
            style={styles.cbIconStyle}
            source={require("../../assets/spa/femaleBlue.png")}
          />
        }
        size={20}
        uncheckedIcon={
          <Image
            resizeMode="contain"
            style={styles.cbIconStyle}
            source={require("../../assets/spa/femaleGray.png")}
          />
        }
        checked={femalehecked}
        onPress={() => setFemalehecked(!femalehecked)}
      />
      <CheckBox
        title="Male"
        checkedIcon={
          <Image
            resizeMode="contain"
            style={styles.cbIconStyle}
            source={require("../../assets/spa/maleBlue.png")}
          />
        }
        size={20}
        uncheckedIcon={
          <Image
            resizeMode="contain"
            style={styles.cbIconStyle}
            source={require("../../assets/spa/maleGray.png")}
          />
        }
        checked={malehecked}
        onPress={() => setMalehecked(!malehecked)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  cbIconStyle: {
    width: 35,
    height: 35,
  },
});
export default GenderCheckBoxes;
