import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-elements";
import Body from "../components/chat/Body";
import Footer from "../components/chat/Footer";
import Header from "../components/chat/Header";

export default ChatScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header navigation={navigation} chatId={route?.params?.chatId} />
        <Divider style={{ marginTop: 10 }} width={0.3} color={"gray"} orientation={"vertical"} />
      </View>
      <Body chatId={route?.params?.chatId} />
      <Footer chatId={route?.params?.chatId} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
