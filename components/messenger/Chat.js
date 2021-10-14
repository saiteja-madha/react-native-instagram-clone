import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default Chat = ({ chat, navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.thumbnail} source={{ uri: chat.icon }} />
      <View style={styles.chatContainer}>
        <Text style={styles.chatTitle}>{chat.name} </Text>
        <Text style={styles.chatContent}>{chat.lastMsg} </Text>
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
