import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { firebase, db } from "../../firebase";

const uploadChatSchema = Yup.object().shape({
  content: Yup.string().max(2200, "Content has reached a maximum character limit"),
});

export default Footer = ({ chatId }) => {
  const uploadChat = async (content) => {
    await db.collection("chats").doc(chatId).collection("messages").add({
      author_id: firebase.auth().currentUser.email,
      message: content,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <Formik
      initialValues={{ content: "" }}
      onSubmit={(values, { resetForm }) => {
        uploadChat(values.content);
        resetForm();
      }}
      validationSchema={uploadChatSchema}
    >
      {({ handleBlur, handleChange, handleSubmit, values }) => (
        <>
          <View style={styles.container}>
            <TouchableOpacity style={styles.leftContainer}>
              <Image style={styles.cameraIcon} source={require("../../assets/icons/camera-filled.png")} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
              <TextInput
                style={{ color: "white", fontSize: 16 }}
                placeholder="Message"
                multiline={true}
                placeholderTextColor="gray"
                onChangeText={handleChange("content")}
                onBlur={handleBlur("content")}
                value={values.content}
              />
            </View>
            <View style={styles.rightContainer}>
              <TouchableOpacity>
                <Image style={styles.rightIcons} source={require("../../assets/icons/mic.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit}>
                <Image style={styles.rightIcons} source={require("../../assets/icons/share.png")} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#313131",
    marginBottom: 10,
    padding: 10,
    borderRadius: 50,
  },
  leftContainer: {
    position: "relative",
    backgroundColor: "#278BDC",
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "relative",
    top: 7,
    left: 7,
    width: 20,
    height: 20,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  rightIcons: {
    width: 25,
    height: 25,
    marginRight: 7,
    marginLeft: 7,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
