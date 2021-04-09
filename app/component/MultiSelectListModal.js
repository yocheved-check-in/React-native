import React, { Component } from "react";
import { View, StyleSheet, Modal, TouchableOpacity, Text } from "react-native";
import colors from "../config/colors";
import CustomMultiPicker from "./multipleSelect";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { Button } from "react-native-elements";

function MultiSelectListModal({ data, setVisble, title, visible }) {
  state = { selectedLists: [] };

  onSelectionsChange = (selectedLists) => {
    // selectedLists is array of { label, value }
    this.setState({ selectedLists });
    console.log(selectedLists);
  };

  const show = (bool) => {
    setVisble(bool);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.container}>
            {/* <View style={styles.innerView}> */}
            <CustomMultiPicker
              options={data}
              search={true} // should show search bar?
              multiple={true} //
              placeholder={"Search"}
              placeholderTextColor={colors.primary}
              returnValue={"label"} // label or value
              callback={(res) => {
                console.log(res);
              }} // callback, array of selected items
              rowBackgroundColor={"#eee"}
              rowHeight={40}
              rowRadius={5}
              labelStyle={{ color: colors.primary, fontWeight: "bold" }}
              searchIconName={"ios-search"}
              iconColor={colors.primary}
              iconSize={25}
              selectedIconName={"ios-checkmark-circle-outline"}
              unselectedIconName={"ios-radio-button-off"}
              //scrollViewHeight={200}
            />
            {/* </View> */}
          </View>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => show(false)}
          >
            <Icon name="close" size={20} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.modalText}>{title}</Text>
          <Button
            titleStyle={{ fontWeight: "bold" }}
            buttonStyle={styles.chooseButton}
            title="Choose"
          />
        </View>
      </View>
    </Modal>
  );
}

export default MultiSelectListModal;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    marginBottom: 10,
    justifyContent: "center",
  },

  chooseButton: {
    width: "95%",
    alignSelf: "center",
    marginTop: 30,
  },

  closeIcon: {
    top: 10,
    left: 10,
    position: "absolute",
  },

  description: {
    lineHeight: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  plusContainer: {
    margin: 20,
    height: 200,
  },

  centeredView: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: "60%",
  },

  textStyle: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    position: "absolute",
    top: 0,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    paddingTop: 10,
  },
});
