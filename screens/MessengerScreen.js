import React from "react";
import { StyleSheet, Platform, SafeAreaView, ScrollView } from "react-native";
import Chat from "../components/chat/Chat";
import Header from "../components/chat/Header";
import Tabs from "../components/chat/Tabs";
import { CHATS } from "../data/chats";

export default MessengerScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Tabs />
      <ScrollView>
        {CHATS.map((chat, index) => (
          <Chat key={index} chat={chat} navigation={navigation} />
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
