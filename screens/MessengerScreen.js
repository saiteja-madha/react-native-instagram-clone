import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Chat from "../components/messenger/Chat";
import Header from "../components/messenger/Header";
import Tabs from "../components/messenger/Tabs";
import { firebase, db } from "../firebase";

export default MessengerScreen = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [conversations, setConversations] = useState([]);

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
        .collection("users")
        .doc(currentUser?.email)
        .onSnapshot((snapshot) => {
          setConversations(snapshot.data()?.conversations);
        }),
    [currentUser]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Tabs />
      <ScrollView>
        {conversations?.map((chatId, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate("ChatScreen", { chatId })}>
            <Chat navigation={navigation} chatId={chatId} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
