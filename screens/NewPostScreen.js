import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Platform } from "react-native";
import AddNewPost from "../components/newPost/AddNewPost";

export default NewPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewPost navigation={navigation} />
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
