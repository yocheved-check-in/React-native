import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import colors from "../../config/colors";
import { Formik } from "formik";
import * as yup from "yup";
import { AntDesign as Icon } from "@expo/vector-icons";
import { Fumi } from "react-native-textinput-effects";
import { t } from "../../services/i18n";

function UserDetails({ onSubmit }) {
  const validationSchema = yup.object().shape({
    firstName: yup.string().required().label("firstName"),
    lastName: yup.string().required().label("lastName"),
    phoneNumber: yup.number().required().label("phoneNumber"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ firstName: "", lastName: "", phoneNumber: "" }}
        onSubmit={(values, actions) => {
          onSubmit();
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        style={styles.form}
      >
        {(formikProps) => (
          <React.Fragment>
            <Fumi
              label={t("CheckIn:firstName")}
              iconClass={Icon}
              iconName={"user"}
              iconColor={colors.primary}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              style={styles.input}
              onChangeText={formikProps.handleChange("firstName")}
            />
            <Text style={styles.error}>{formikProps.errors.firstName}</Text>

            <Fumi
              style={styles.input}
              label={t("CheckIn:lastName")}
              iconClass={Icon}
              iconName={"user"}
              iconColor={colors.primary}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={formikProps.handleChange("lastName")}
            />

            <Text style={styles.error}>{formikProps.errors.lastName}</Text>

            <Fumi
              style={styles.input}
              label={t("CheckIn:phoneNumber")}
              iconClass={Icon}
              iconName={"phone"}
              iconColor={colors.primary}
              iconSize={20}
              iconWidth={40}
              inputPadding={16}
              onChangeText={formikProps.handleChange("phoneNumber")}
            />
            <Text style={styles.error}>{formikProps.errors.phoneNumber}</Text>

            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={formikProps.handleSubmit}
                underlayColor="#fff"
              >
                <Text style={styles.submitText}>{t("CheckIn:submit")}</Text>
              </TouchableOpacity>
            )}
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    width: "80%",
    borderRadius: 20,
   
    backgroundColor: colors.opacity,
    justifyContent: "center",
    alignSelf: "center",
  },

  icon: {
    padding: 10,
  },

  input: {
    backgroundColor: colors.opacityWhite,
    marginBottom: 20,
    borderColor: colors.gray,
    borderRadius: 15,
    borderWidth: 1,
  },

  error: {
    color: "red",
    marginTop: -20,
  },

  form: {
    justifyContent: "center",
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 35,
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
export default UserDetails;
