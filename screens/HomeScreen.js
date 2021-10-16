import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import BottomTabs, { bottomTabIcons } from "../components/home/BottomTabs";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import Stories from "../components/home/Stories";
import { db } from "../firebase";

export default HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () =>
      db.collection("posts").onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
