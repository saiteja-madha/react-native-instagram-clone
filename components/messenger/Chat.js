import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { firebase, db } from "../../firebase";

export default Chat = ({ chatId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState("");
  const [chat, setChat] = useState(null);
  const [contact, setContact] = useState({});

  useEffect(
    () =>
      db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot((snap) => setCurrentUser(snap.data())),
    []
  );

  useEffect(() => {
    if (chatId) {
      const unsubscribe1 = db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .limit(1)
        .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())));

      const unsubscribe2 = db
        .collection("chats")
        .doc(chatId)
        .onSnapshot((snapshot) => setChat(snapshot.data()));

      return () => {
        unsubscribe1();
        unsubscribe2();
      };
    }
  }, [chatId]);

  useEffect(() => {
    if (chat) {
      const contactId = chat.members[0] === currentUser.email ? chat.members[1] : chat.members[0];
      const unsubscribe = db
        .collection("users")
        .doc(contactId.trim())
        .onSnapshot((snapshot) => setContact(snapshot.data()));

      return () => {
        unsubscribe();
      };
    }
  }, [chat, currentUser]);

  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: contact?.profile_picture }} />
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>{contact?.username} </Text>
        <Text style={styles.chatContent}>{messages[0]?.message} </Text>
      </View>
      <View>
        <Image style={styles.postIcon} source={require("../../assets/icons/camera.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContainer: {
    flex: 1,
    marginLeft: 15,
  },
  chatTitle: {
    color: "white",
    fontWeight: "600",
  },
  chatContent: {
    color: "white",
  },
  postIcon: {
    width: 25,
    height: 25,
  },
});
