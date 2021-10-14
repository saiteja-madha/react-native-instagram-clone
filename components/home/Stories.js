import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { STORIES } from "../../data/stories";
import { firebase, db } from "../../firebase";

export default Stories = () => {
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.storiesWrapper}>
          <View style={styles.story}>
            <Image style={styles.selfStory} source={{ uri: currentUser?.profile_picture }} />
            <Image style={styles.storyAdd} source={require("../../assets/icons/add.png")} />
            <Text style={styles.storyText}>Your Story</Text>
          </View>
          {STORIES.map((story, index) => (
            <View key={index} style={styles.story}>
              <Image style={styles.storyImage} source={{ uri: story.image }} />
              <Text style={styles.storyText}>
                {story.user.length > 11 ? story.user.slice(0, 8).toLowerCase() + "..." : story.user.toLowerCase()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 13,
  },
  storiesWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  story: {
    display: "flex",
    alignItems: "center",
    marginLeft: 15,
  },
  storyAdd: {
    position: "absolute",
    bottom: "25%",
    right: "2%",
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  selfStory: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  storyImage: {
    width: 65,
    height: 65,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FF8501",
  },
  storyText: {
    color: "white",
    fontSize: 12,
    marginTop: 5,
  },
});
