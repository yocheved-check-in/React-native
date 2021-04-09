import { registerRootComponent } from "expo";
import { AppRegistry } from "react-native";
import React from "react";
import App from "./App";
import Pusher from "pusher-js/react-native";
import initialMessages from "./app/messages";
import { Provider } from "react-redux";
import configStore from "./app/config/store";

import { name as appname } from "./app.json";

const store = configStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appname, () => RNRedux);

// // Enable pusher logging - don't include this in production
// Pusher.logToConsole = true;
// // //new Pusher('app_key', { authEndpoint: '/pusher_auth.php' });
// pusher = new Pusher("5ca0f1ca2721d1342557", {
//   cluster: "ap2",
// });

// var channel = pusher.subscribe("CheckIn");

// ReactDOM.render(
//   // Provider passes the store to the component nested within it
//   <Provider store={store}>
//     <BrowserRouter>registerRootComponent(App);</BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );
// ReactDOM.render(
//   // Provider passes the store to the component nested within it
//   <Provider store={store}>
//     <BrowserRouter>registerRootComponent(App);</BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );

// registerRootComponent(App);

// channel.bind("Chat", function (data) {
//   var newArr = initialMessages.reverse();
//   var message = creteNewMessage(JSON.stringify(data));
//   newArr.push(message);
//   console.log(newArr);
//   alert(JSON.stringify(data));
// });

// const RNRedux = () => (
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

registerRootComponent(
  //   <Provider store={store}>
  App
  //   </Provider>
);

// AppRegistry.registerComponent(appName, () => AppRoot);
// const creteNewMessage = (text) => {
//   var message = {
//     createdAt: new Date(),
//     text: text,
//     user: {
//       _id: 1,
//       name: "Aaron",
//       avatar: "https://placeimg.com/150/150/any",
//     },
//     _id: "e0e65fbb-ddfc-465e-b958-ebc03634205e",
//   };

//   console.log(message);
//   return message;
// };
// channel.bind("pusher:subscription_succeeded", function (members) {
//   alert("successfully subscribed!");
// });

// channel.bind("pusher:subscription_succeeded", function (members) {
//   alert("successfully subscribed!");
// });

// // pusher.trigger("CheckIn", "Chat", {
// //   message: "hello world",
// // });
// pusher.trigger("CheckIn", "client-Chat", { data: "hello world" });

// channel.bind("pusher_internal:subscription_succeeded", function () {
//   var triggered = channel.trigger("client-Chat", { your: "data" });
// });

// var context = { title: "Pusher" };

// var handler = function () {
//   console.log("My name is " + context.title);
// };
// channel.bind("new-comment", handler, callback);

// var callback = function (data) {
//   console.log(data);
// };

// const mapStateToProps = (state) => {
//   return {
//     chatList: state.chatMessagesList,
//   };
// };

// const mapDitpatchToProps = (dispatch) => {
//   return {
//     addMessageToChat(list) {
//       dispatch({
//         type: "ADD_TO_SPA_CART",
//         payload: list,
//       });
//     },
//   };
// };

// export default connect(mapStateToProps, mapDitpatchToProps)(SpaItemScreen);
