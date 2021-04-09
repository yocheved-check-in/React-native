// import React, { useState, useCallback, useEffect } from "react";
// import { GiftedChat, Send } from "react-native-gifted-chat";
// import colors from "../config/colors";
// import { View, Image, StyleSheet } from "react-native";
// import initialMessages from "../messages";
// import {
//   renderInputToolbar,
//   renderActions,
//   renderComposer,
//   renderSend,
// } from "../InputToolbar";
// import { connect } from "react-redux";

// import {
//   renderAvatar,
//   renderBubble,
//   renderSystemMessage,
//   renderMessage,
//   renderMessageText,
//   renderCustomView,
// } from "./MessageContainer";

// class ChatScreen extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       text: "",
//       //messages: props.chatList.reverse(),
//     };

//     // console.log("messages " + JSON.stringify(this.state.messages));
//     // console.log("props.chatList " + JSON.stringify(props.chatList));
//   }

//   // componentWillReceiveProps(nextProps) {
//   //   if (props.chatList !== this.state.messages) {
//   //     this.setState({ messages: props.chatList });
//   //     //setIsLoading(true);
//   //   }
//   // }

//   static getDerivedStateFromProps(props, state) {
//     console.log("getDerivedStateFromProps " + JSON.stringify(props));
//     // this.setState((previousState) => ({
//     //   messages: (previousState.messages, this.state.messages),
//     // }));

//     // props.listChange(state.messages);
//     // console.log("getDerivedStateFromProps " + JSON.stringify(state.messages));
//     return null;
//     // if (props.chatList > state.messages) {
//     //   return {
//     //     messages: props.chatList,
//     //   };
//     // } else {
//     // return {
//     //   // props.listChange(state.messages);
//     // };
//     // }
//     // // Return null to indicate no change to state.
//     // return null;
//   }
//   // const { dispatch, Chats } = this.props;
//   // const chats = Chats;
//   // chats.sort((a, b) => {
//   //   return moment(a.sent_at).valueOf() - moment(b.sent_at).valueOf();
//   // });
//   // this.setState({
//   //   conversation: this.state.conversation.cloneWithRows(chats),
//   // });

//   // const [text, setText] = useState("");
//   // const [messages, setMessages] = useState(props.chatList.reverse());

//   // if (props.chatList !== messages) {
//   //   setMessages(props.chatList);
//   //   //setIsLoading(true);
//   // }

//   // useEffect(() => {
//   //   console.log("messages " + JSON.stringify(messages));
//   //   console.log("props.chatList " + JSON.stringify(props.chatList));
//   //   // setText("");
//   //   setMessages(props.chatList);
//   // }, [props.chatList]);

//   handleChange = (e) => {
//     console.log(e);
//     this.setState({ text: e });
//   };

//   // renderSend = (props) => (
//   //   <Send
//   //     {...props}
//   //     disabled={!props.text}
//   //     containerStyle={{
//   //       width: 44,
//   //       height: 44,
//   //       alignItems: "center",
//   //       justifyContent: "center",
//   //       marginHorizontal: 4,
//   //     }}
//   //   >
//   //     <Image
//   //       style={{ width: 32, height: 32 }}
//   //       source={require("../assets/chat/sendButton.png")}
//   //     />
//   //   </Send>
//   // );

//   onSend = (newMessages = []) => {
//     var newArr = this.props.chatList;

//     newArr.push(newMessages);
//     this.props.listChange(newArr);

//     console.log("newArr " + JSON.stringify(newArr));

//     // console.log("newMessages " + JSON.stringify(newMessages));

//     // //setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
//     // this.setState((previousState) => ({
//     //   messages: GiftedChat.append(previousState.messages, this.state.messages),
//     // }));
//     // this.props.listChange(this.state.messages);

//     // this.setState({
//     //   messages: [...this.state.messages, newMessages],
//     // });

//     // const newArray = this.state.messages.slice(); // Create a copy
//     // newArray.push(newMessages); // Push the object

//     // console.log("newArray " + JSON.stringify(newArray));

//     // this.setState({ messages: newArray }, function () {
//     //   console.log(this.state.messages);
//     // });
//     // //console.log(this.state.messages);

//     // //console.log("this.state.messages " + JSON.stringify(this.state.messages));

//     // this.props.listChange(this.state.messages);
//     // // console.log("chatList " + this.props.chatList);
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <GiftedChat
//           messages={this.props.chatList}
//           text={this.state.text}
//           onInputTextChanged={this.handleChange}
//           onSend={this.onSend}
//           id={Math.round(Math.random() * 100000000)}
//           user={{
//             _id: 1,
//             name: "Aaron",
//             avatar: "https://placeimg.com/150/150/any",
//           }}
//           alignTop
//           alwaysShowSend
//           scrollToBottom
//           //showUserAvatar
//           renderAvatarOnTop
//           renderUsernameOnMessage
//           bottomOffset={26}
//           onPressAvatar={console.log}
//           //renderInputToolbar={renderInputToolbar}
//           renderActions={renderActions}
//           //renderComposer={renderComposer}
//           renderSend={renderSend}
//           //renderAvatar={renderAvatar}
//           //renderBubble={renderBubble}
//           //renderSystemMessage={renderSystemMessage}
//           //renderMessage={renderMessage}
//           //renderMessageText={renderMessageText}
//           //renderMessageImage
//           // renderCustomView={renderCustomView}
//           isCustomViewBottom
//           messagesContainerStyle={{ backgroundColor: "indigo" }}
//           parsePatterns={(linkStyle) => [
//             {
//               pattern: /#(\w+)/,
//               style: linkStyle,
//               onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
//             },
//           ]}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     //backgroundColor: colors.primary,
//     width: "100%",
//     flex: 1,
//   },
// });

// const mapStateToProps = (state) => {
//   return { chatList: state.chatMessagesList };
// };

// const mapDitpatchToProps = (dispatch) => {
//   return {
//     listChange(list) {
//       dispatch({
//         type: "ADD_TO_CHAT_MESSAGES",
//         payload: list,
//       });
//     },
//   };
// };

// export default connect(mapStateToProps, mapDitpatchToProps)(ChatScreen);

import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import initialMessages from "../messages";
import { connect } from "react-redux";
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "./InputToolbar";
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from "./MessageContainer";
import { APP_ID, APP_SECRET, APP_KEY, APP_CLUSTER, APP_CHANNEL } from "@env";
import { WebView } from "react-native-webview";
import { channel, pusher } from "../services/Pusher";
import Pusher from "pusher-js/react-native";
import { SafeAreaView } from "react-native";

const Chats = (props) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(props.chatList);
  }, [props.chatList]);

  const onSend = (newMessages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    //channel.trigger("client-chat", { message: newMessages });
    //channel.send("Chat", { newMessages });
    // pusher.trigger("CheckIn", "Chat", {
    //   message: "hello world",
    // });
    // pusher.trigger("CheckIn", "Chat", {
    //   message: "hello world",
    // });

    props.listChange(newMessages);
  };

  return (
    <SafeAreaView style={{ width: "100%", height: "100%" }}>
      <WebView
        source={{ uri: "http://checkin.parvaty.com/web/messenger?user_id=1#" }}
      />
    </SafeAreaView>
  );

  // return (
  //   <GiftedChat
  //     messages={props.chatList}
  //     inverted={false}
  //     text={text}
  //     onInputTextChanged={setText}
  //     onSend={onSend}
  //     user={{
  //       _id: 2,
  //       name: "Aaron",
  //       avatar: "https://placeimg.com/150/150/any",
  //       position: "left",
  //     }}
  //     alignTop
  //     alwaysShowSend
  //     scrollToBottom
  //     showUserAvatar
  //     renderAvatarOnTop
  //     renderUsernameOnMessage
  //     bottomOffset={26}
  //     onPressAvatar={console.log}
  //     //renderInputToolbar={renderInputToolbar}
  //     //renderActions={renderActions}
  //     //renderComposer={renderComposer}
  //     renderSend={renderSend}
  //     //renderAvatar={renderAvatar}
  //     renderBubble={renderBubble}
  //     //renderSystemMessage={renderSystemMessage}
  //     renderMessage={renderMessage}
  //     //renderMessageText={renderMessageText}
  //     //renderMessageImage
  //     //renderCustomView={renderCustomView}
  //     //isCustomViewBottom
  //     //messagesContainerStyle={{ backgroundColor: "indigo" }}
  //     parsePatterns={(linkStyle) => [
  //       {
  //         pattern: /#(\w+)/,
  //         style: linkStyle,
  //         onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
  //       },
  //     ]}
  //   />
  // );
};

const mapStateToProps = (state) => {
  return { chatList: state.chatMessagesList };
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
