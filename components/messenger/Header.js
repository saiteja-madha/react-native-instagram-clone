import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { firebase, db } from "../../firebase";

export default Header = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(
    () =>
      db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot((snap) => setCurrentUser(snap.data())),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: 30, height: 30 }} source={require("../../assets/icons/back.png")} />
        </TouchableOpacity>
        <Text style={styles.text}>{currentUser?.username} </Text>
      </View>
      <View style={styles.rightContainer}>
        <Image style={styles.icon} source={require("../../assets/icons/video.png")} />
        <TouchableOpacity onPress={() => navigation.push("NewChatScreen")}>
          <Image style={styles.icon} source={require("../../assets/icons/create.png")} />
        </TouchableOpacity>
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
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginLeft: 20,
  },
  icon: {
    width: 30,
    height: 30,
    margin: 10,
  },
});
