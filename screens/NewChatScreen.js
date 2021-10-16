import React from "react";
import { SafeAreaView, StyleSheet, Platform } from "react-native";
import AddNewChat from "../components/newChat/AddNewChat";

export default NewChatScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <AddNewChat navigation={navigation} />
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
