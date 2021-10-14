import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { firebase, db } from "../../firebase";

export const bottomTabIcons = [
  {
    name: "Home",
    active: require("../../assets/icons/home-active.png"),
    inactive: require("../../assets/icons/home.png"),
  },
  {
    name: "Search",
    active: require("../../assets/icons/search-active.png"),
    inactive: require("../../assets/icons/search.png"),
  },
  {
    name: "Reels",
    active: require("../../assets/icons/reel-active.png"),
    inactive: require("../../assets/icons/reel.png"),
  },
  {
    name: "Like",
    active: require("../../assets/icons/like-active.png"),
    inactive: require("../../assets/icons/like.png"),
  },
];

export default BottomTabs = ({ icons }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(
    () =>
      db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot((snap) => setCurrentUser(snap.data())),
    []
  );

  const Icon = ({ icon }) => (
    <TouchableOpacity
      onPress={() => {
        setActiveTab(icon.name);
      }}
    >
      <Image
        style={[
          styles.icon,
          icon.name === "Profile" ? styles.profilePic() : null,
          activeTab === "Profile" && icon.name === activeTab ? styles.profilePic(activeTab) : null,
        ]}
        source={activeTab === icon.name ? icon.active : icon.inactive}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <Divider width={1} orientation="vertical" />
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
        <TouchableOpacity onPress={() => setActiveTab("Profile")}>
          <Image
            style={[styles.icon, styles.profilePic(), activeTab === "Profile" ? styles.profilePic(activeTab) : null]}
            source={{
              uri: currentUser?.profile_picture,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "white",
  }),
});
