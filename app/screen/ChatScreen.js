import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TopHeader from "../component/TopHeader";
import { WebView } from "react-native-webview";
import colors from "../config/colors";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";

const Chats = (props) => {
  const [messages, setMessages] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setMessages(props.chatList);
  }, [props.chatList]);

  return (
    <SafeAreaView style={styles.container}>
      <TopHeader
        title={"Chat"}
        headerImage={require("../assets/TopHeader/sideIcon.png")}
        rightImage={require("../assets/TopHeader/back-arrow.png")}
        leftImagePress={() => navigation.goBack()}
      />
      {loader ? (
        <ActivityIndicator
          size="large"
          style={styles.loader}
          color={colors.primary}
        />
      ) : null}
      <WebView
        source={{
          uri:
            "http://checkin.parvaty.com/web/messenger?user_id=" + props.user.id,
        }}
        onLoad={() => setLoader(false)}
        onLoadProgress={() => setLoader(true)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
const mapStateToProps = (state) => {
  return { chatList: state.chatMessagesList, user: state.user };
};

const mapDitpatchToProps = (dispatch) => {
  return {
    listChange(list) {
      dispatch({
        type: "ADD_TO_CHAT_MESSAGES",
        payload: list,
      });
    },
  };
};

export default connect(mapStateToProps, mapDitpatchToProps)(Chats);
