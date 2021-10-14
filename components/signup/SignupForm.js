import React from "react";
import { View, TextInput, StyleSheet, Text, Pressable, TouchableOpacity, Alert } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import validator from "email-validator";

import { firebase, db } from "../../firebase";

export default SignupForm = ({ navigation }) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string().required().min(2, "A username is required"),
    password: Yup.string().required().min(8, "Your password must be atleast 6 characters"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignUp = async (username, email, password) => {
    try {
      const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
      db.collection("users")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        });

      console.log("🔥 New User Signed Up", username, email);
    } catch (error) {
      Alert.alert("Oops!", "Failed to signup\nTry again later");
      console.log(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) => onSignUp(values.username, values.email, values.password)}
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (
          <>
            <View
              style={[
                styles.inputField,
                styles.textBoxValidation(values.email.length < 1 || validator.validate(values.email)),
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Phone number, email or mobile"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                styles.textBoxValidation(1 > values.password.length || values.password.length >= 3),
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="username"
                autoCapitalize="none"
                textContentType="username"
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            <View
              style={[
                styles.inputField,
                styles.textBoxValidation(1 > values.password.length || values.password.length >= 6),
              ]}
            >
              <TextInput
                placeholderTextColor="#444"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: "flex-end", marginBottom: 30 }} />
            <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.buttonText}>Sign Up </Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: "#6BB0F5" }}> Log In</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  textBoxValidation: (isValid) => ({
    borderColor: isValid ? "#CCC" : "red",
  }),
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#FFF",
    fontSize: 18,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});
