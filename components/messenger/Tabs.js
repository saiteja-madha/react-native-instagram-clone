import React from "react";
import { View, Text, StyleSheet, Platform, Image } from "react-native";

export default Tabs = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.textWrapper, styles.activeTab]}>
        <Text style={styles.text}>Chats </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Rooms </Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>Requests </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textWrapper: {
    paddingBottom: 10,
    flex: 0.33,
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  activeTab: {
    borderBottomColor: "white",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
