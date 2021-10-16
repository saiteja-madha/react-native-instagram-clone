import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { db, firebase } from "../../firebase";

export default Header = ({ navigation, chatId }) => {
  const [targetMail, setTargetMail] = useState(null);
  const [target, setTarget] = useState(null);

  useEffect(
    () =>
      db
        .collection("chats")
        .doc(chatId)
        .onSnapshot((snap) => {
          const chatData = snap.data();
          const targetEmail =
            chatData?.members[0] === firebase.auth().currentUser.email ? chatData?.members[1] : chatData?.members[0];
          setTargetMail(targetEmail);
        }),
    [chatId]
  );

  useEffect(() => {
    if (targetMail) {
      return db
        .collection("users")
        .doc(targetMail)
        .onSnapshot((snap) => setTarget(snap.data()));
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.icons} source={require("../../assets/icons/back.png")} />
        </TouchableOpacity>
        <Image style={styles.profilePic} source={{ uri: target?.profile_picture }} />
        <Text style={styles.text}>{target?.username}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image style={[styles.icons, styles.rightIcons]} source={require("../../assets/icons/call.png")} />
        <Image style={[styles.icons, styles.rightIcons]} source={require("../../assets/icons/video.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 10,
  },
  icons: {
    width: 30,
    height: 30,
  },
  rightIcons: {
    marginHorizontal: 10,
  },
  profilePic: {
    width: 30,
    height: 30,
    marginLeft: 20,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FF8501",
  },
});
