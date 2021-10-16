import React, { useEffect, useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { firebase, db } from "../../firebase";

const uploadPostSchema = Yup.object().shape({
  username: Yup.string().required("A URL required").min(2, "Minimum of 2 characters"),
  content: Yup.string().max(2200, "Content has reached a maximum character limit"),
});

export default FormikPostUploader = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(
    () =>
      db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot((snap) => setCurrentUser(snap.data())),
    []
  );

  const startConversation = async (username, content) => {
    try {
      const snapshot = await db.collection("users").where("username", "==", username).limit(1).get();
      if (snapshot.empty) {
        Alert.alert("Oops!", "No user found with that username");
        return;
      }

      snapshot.forEach(async (targetDoc) => {
        // check if chat already exists

        try {
          const exists = await db
            .collection("chats")
            .where("members", "array-contains", targetDoc.data().email)
            .where("members", "array-contains", firebase.auth().currentUser.email)
            .limit(1)
            .get();

          if (!exists.empty) {
            Alert.alert("Oops!", "A conversation already exists with this user");
            return;
          }

          // create a new doc in "chats" collection
          const createdDoc = await db.collection("chats").add({
            members: [currentUser.email, targetDoc.data().email],
            started_by: currentUser.email,
            started_at: firebase.firestore.FieldValue.serverTimestamp(),
          });

          createdDoc.collection("messages").add({
            author_id: currentUser.email,
            message: content,
            username: currentUser.username,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });

          // save the created docId in target users collection
          const targetJsonData = targetDoc.data().conversations || [];
          targetJsonData.push(createdDoc.id);
          targetDoc.ref.set({ conversations: targetJsonData }, { merge: true });

          // save the created docId in current users collection
          const userDoc = await db.collection("users").doc(currentUser.email).get();
          const userJsonData = userDoc.data().conversations || [];
          userJsonData.push(createdDoc.id);
          userDoc.ref.set({ conversations: userJsonData }, { merge: true });
        } catch (ex) {
          console.log(ex);
        }
      });

      navigation.goBack();
    } catch (ex) {
      Alert.alert("Unexpected Error occurred", ex.message);
    }
  };

  return (
    <Formik
      initialValues={{ username: "", content: "" }}
      onSubmit={(values) => startConversation(values.username, values.content)}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <TextInput style={styles.toText}>To: </TextInput>

            <TextInput
              style={styles.text}
              placeholder="username"
              placeholderTextColor="gray"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
            />
          </View>

          <TextInput
            style={{ color: "white", fontSize: 16, marginBottom: 20 }}
            placeholder="Enter message content"
            multiline={true}
            placeholderTextColor="gray"
            onChangeText={handleChange("content")}
            onBlur={handleBlur("content")}
            value={values.content}
          />

          <Button onPress={handleSubmit} title="Start" disabled={!isValid}></Button>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    borderWidth: 2,
  },
  textContainer: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  toText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 5,
  },
  contentText: {},
});
