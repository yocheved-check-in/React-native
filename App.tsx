import React, { Component } from "react";
import {
  I18nManager as RNI18nManager,
  View,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";

import i18n from "./app/services/i18n";
import { Updates } from "expo";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "./app/screen/ChatScreen";
import ourReducer from "./app/config/reducer";
import DrawerNavigator from "./app/navigation/DrawerNavigator";
import { channel } from "./app/services/Pusher";
import initialMessages from "./app/messages";
import { connect } from "react-redux";
import LoginScreen from "./app/screen/LoginScreen";
import MainNavigator from "./app/navigation/MainNavigator";

const store = createStore(ourReducer);

const creteNewMessage = (text, id) => {
  var message = [
    {
      createdAt: new Date(),
      text: text,
      user: {
        _id: 1,
        name: "Server",
        avatar: "https://placeimg.com/150/150/any",
        position: "right",
      },
      _id: id,
    },
  ];

  console.log(message);
  return message;
};

const guidGenerator = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export class App extends React.Component<> {
  state = { isI18nInitialized: false };

  constructor(props) {
    super();

    channel.bind("Chat", function (data) {
      var id = guidGenerator();
      console.log(data);
      var message = creteNewMessage(data, id);
      props.listChange(message);
    });

    // channel.bind("pusher:subscription_succeeded", function () {
    //   var triggered = channel.trigger("client-Chat", { your: "data" });
    // });

    // channel.bind("pusher:subscription_succeeded", function () {
    //   var triggered = channel.trigger("client-Chat", { hi: "data" });
    // });
  }

  componentDidMount() {
    i18n
      .init()
      .then(() => {
        const RNDir = RNI18nManager.isRTL ? "RTL" : "LTR";
        if (i18n.dir !== RNDir) {
          const isLocaleRTL = i18n.dir === "RTL";
          RNI18nManager.forceRTL(isLocaleRTL);
          Updates.reloadFromCache();
        }
        this.setState({ isI18nInitialized: true });
      })
      .catch((error) => console.warn(error));
  }

  render() {
    const { list } = this.props;

    if (this.state.isI18nInitialized) {
      console.log(this.props.user);
      if (Object.keys(this.props.user).length > 0) {
        return (
          <Provider store={store}>
            <StatusBar translucent backgroundColor="transparent" />
            <NavigationContainer>
              <DrawerNavigator />
            </NavigationContainer>
          </Provider>
        );
      } else {
        return (
          // <Provider store={store}>
          //   <StatusBar translucent backgroundColor="transparent" />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
          // </Provider>
        );
      }
    }

    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { chatList: state.chatMessagesList, user: state.user };
};

const mapDitpatchToProps = (dispatch) => {
  return {
    listChange(list = []) {
      dispatch({
        type: "ADD_TO_CHAT_MESSAGES",
        payload: list,
      });
    },
  };
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const ConnectedApp = connect(mapStateToProps, mapDitpatchToProps)(App);

export default Root = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);
