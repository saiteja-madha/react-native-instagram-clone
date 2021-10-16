import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { firebase, db } from "../../firebase";

export default Body = ({ chatId }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(
    () =>
      db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot((snap) => setCurrentUser(snap.data())),
    []
  );

  useEffect(
    () =>
      db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))),
    [chatId]
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {messages.map((message) => (
          <Message key={message.id} message={message} currentUser={currentUser} />
        ))}
      </ScrollView>
    </View>
  );
};

const Message = ({ message, currentUser }) => (
  <View style={{ alignItems: "baseline" }}>
    <View style={[styles.messageWrapper, message.author_id === currentUser?.email ? styles.messageReceiver : null]}>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageWrapper: {
    position: "relative",
    backgroundColor: "#313131",
    borderRadius: 50,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    minWidth: 120,
    marginBottom: 15,
  },
  messageReceiver: {
    backgroundColor: "#278BDC",
    marginLeft: "auto",
  },
  message: {
    color: "white",
    fontSize: 14,
  },
  messageTimestamp: {
    position: "absolute",
  },
});
