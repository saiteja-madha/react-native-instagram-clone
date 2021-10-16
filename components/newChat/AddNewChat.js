import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import FormikChatUploader from "./FormikChatUploader";

export default AddNewChat = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <FormikChatUploader navigation={navigation} />
    </View>
  );
};

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image style={{ width: 30, height: 30 }} source={require("../../assets/icons/back.png")} />
    </TouchableOpacity>
    <Text style={styles.headerText}>New Conversation </Text>
    <View />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
  },
});
