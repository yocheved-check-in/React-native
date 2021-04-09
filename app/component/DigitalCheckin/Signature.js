import Signature from "react-native-signature-canvas";
import React, { useRef } from "react";
import colors from "../../config/colors";
import { t } from "../../services/i18n";

const Sign = ({ onSubmit, onBegin, onEnd }) => {
  const ref = useRef();

  const handleSignature = (signature) => {
    onSubmit(signature);
  };

  return (
    <Signature
      onOK={handleSignature}
      penColor={colors.primary}
      borderRadius="15"
      clearText={t("CheckIn:clear")}
      confirmText={t("CheckIn:save")}
      descriptionText=""
      webStyle={webStyle}
      autoClear={true}
      imageType={"image/svg+xml"}
      onBegin={onBegin}
      onEnd={onEnd}
    />
  );
};

const webStyle = `.m-signature-pad 
     {
      background: #FFFCFF;
    }`;

export default Sign;
