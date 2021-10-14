import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Image } from "react-native";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { firebase, db } from "../../firebase";

const PLACEHOLDER_IMAGE = "https://i.stack.imgur.com/y9DpT.jpg";

const uploadPostSchema = Yup.object().shape({
  imageUrl: Yup.string().url().required("A URL required"),
  caption: Yup.string().max(2200, "Caption has reached a maximum character limit"),
});

export default FormikPostUploader = ({ navigation }) => {
  const [thumbnail, setThumbnail] = useState(PLACEHOLDER_IMAGE);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(
    () =>
      db
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot((snap) => setCurrentUser(snap.data())),
    []
  );

  const uploadPostToFirebase = async (imageUrl, caption) => {
    try {
      await db.collection("posts").add({
        image_url: imageUrl,
        username: currentUser.username,
        profile_picture: currentUser.profile_picture,
        owner_email: currentUser.email,
        caption,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likes_by_users: [],
        comments: [],
      });
      console.log("🚀 Your post is submitted");
      navigation.goBack();
    } catch (ex) {
      console.log("Error adding doc: ", ex.message);
    }
  };

  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => uploadPostToFirebase(values.imageUrl, values.caption)}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
        <>
          <View style={{ margin: 20, justifyContent: "space-between", flexDirection: "row" }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: validUrl.isUri(thumbnail) ? thumbnail : PLACEHOLDER_IMAGE }}
            />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TextInput
                style={{ color: "white", fontSize: 20 }}
                placeholder="Write a caption"
                placeholderTextColor="gray"
                multiline={true}
                onChangeText={handleChange("caption")}
                onBlur={handleBlur("caption")}
                value={values.caption}
              />
            </View>
          </View>

          <Divider width={0.2} orientation="vertical" />

          <TextInput
            onChange={(e) => setThumbnail(e.nativeEvent.text)}
            style={{ color: "white", fontSize: 18 }}
            placeholder="Enter image Url"
            placeholderTextColor="gray"
            onChangeText={handleChange("imageUrl")}
            onBlur={handleBlur("imageUrl")}
            value={values.imageUrl}
          />

          {errors.imageUrl && <Text style={{ color: "red", fontSize: 10 }}> {errors.imageUrl}</Text>}
          <Button onPress={handleSubmit} title="Share" disabled={!isValid}></Button>
        </>
      )}
    </Formik>
  );
};
