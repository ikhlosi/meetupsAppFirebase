import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/base";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../routes/AuthStack";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigation: NavigationProp<AuthStackParamList> = useNavigation();

  const handleRegister = () => {
    if (name != "" && email != "" && password != "" && repeatPassword != "") {
      if (password === repeatPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCreds) => {
            console.log(
              `userCreds: ${JSON.stringify(
                userCreds
              )}\nauth.currentUser: ${JSON.stringify(auth.currentUser)}`
            );
            if (!auth.currentUser) {
              throw new Error("No currentUser!");
            }
            updateProfile(auth.currentUser, {
              displayName: name,
            })
              .then(() => console.log("User registered!"))
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => console.log(err));

        // updateProfile(auth.currentUser, {
        //   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
        // }).then(() => {
        //   // Profile updated!
        //   // ...
        // }).catch((error) => {
        //   // An error occurred
        //   // ...
        // });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Input
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Input
        placeholder="Repeat password"
        value={repeatPassword}
        onChangeText={(text) => setRepeatPassword(text)}
      />

      <View style={styles.buttonView}>
        <Button
          titleStyle={{ fontSize: 14 }}
          title="Login"
          type="clear"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <Button title="Register" onPress={() => handleRegister()} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    alignSelf: "center",
    fontWeight: "600",
    paddingBottom: 24,
  },
  buttonView: {
    alignItems: "flex-end",
  },
});
