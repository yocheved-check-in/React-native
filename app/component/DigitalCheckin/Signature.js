import Signature from "react-native-signature-canvas";
import React, { useRef, useState } from "react";
import colors from "../../config/colors";
import { t } from "../../services/i18n";
import {
  Image, View,StyleSheet
} from "react-native";
const Sign = ({ onSubmit, onBegin, onEnd }) => {
  const [signature, setSign] = useState(null);

  const ref = useRef();

  const handleSignature = (signature) => {
   
  };
  {
    signature ? (
      <Image
        resizeMode={"contain"}
        style={styles.signImage}
        source={{ uri: signature }}
      />
    ) : null
  }
  return (


    <View style={styles.container}>
      <View style={styles.mainView}>
        {signature ? (
          <Image
            resizeMode={"contain"}
            style={styles.imageStyle}
            source={{ uri: signature }}
          />
        ) : null}
      </View>
      <Signature
        onOK={handleSignature}
        penColor={colors.primary}
        borderRadius="15"
        clearText={t("CheckIn:clear")}
        confirmText={t("CheckIn:save")}
        descriptionText=""
        autoClear={true}
        onBegin={onBegin}
        onEnd={onEnd}
        imageType={"image/jpeg"}
      />
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
 signImage:{ 
   width: 335, 
   height: 114 
  },
  takeSnap:{
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  imageStyle:{ 
    width: 335, 
    height: 114,
     backgroundColor: "#fff" 
    },
  mainView:{
    width: 335,
    height: 114,
  
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15
  },

});

const webStyle = `.m-signature-pad 
     {
      background: #fff;
    }`;

export default Sign;
