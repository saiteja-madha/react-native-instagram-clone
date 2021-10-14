import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { firebase } from "../../firebase";

const handleSignOut = () =>
  firebase
    .auth()
    .signOut()
    .then(() => console.log("❌ Signed out"))
    .catch((err) => console.log(err));

export default Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image style={styles.logo} source={require("../../assets/header-logo.png")} />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => navigation.push("NewPostScreen")}>
          <Image style={styles.icon} source={require("../../assets/icons/plus.png")} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push("MessengerScreen")}>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>11</Text>
          </View>
          <Image style={styles.icon} source={require("../../assets/icons/messenger.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  unreadBadge: {
    backgroundColor: "#FF3250",
    position: "absolute",
    left: 20,
    bottom: 18,
    width: 25,
    height: 18,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    color: "white",
  },
});
