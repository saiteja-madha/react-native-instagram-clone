import React from "react";
import { View, TextInput, StyleSheet, Text, Pressable, TouchableOpacity, Alert } from "react-native";

import { Formik } from "formik";
import * as Yup from "yup";
import validator from "email-validator";

import { firebase } from "../../firebase";

export default LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string().required().min(8, "Your password must be atleast 8 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("🔥 Logged in as ", email);
    } catch (err) {
      Alert.alert("Oops!", "Incorrect password or user does not exist\nWhat do you want to do next?", [
        {
          text: "Sign Up",
          onPress: () => navigation.push("SignupScreen"),
          style: "default",
        },
        {
          text: "Try Again",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validationSchema={LoginFormSchema}
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
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
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
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6BB0F5" }}>Forgot Password?</Text>
            </View>
            <Pressable style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.buttonText}>Log In </Text>
            </Pressable>
            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push("SignupScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
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
