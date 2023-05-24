import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/base";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../routes/AuthStack";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { globalStyles } from "../styles/global";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigation: NavigationProp<AuthStackParamList> = useNavigation();

  const handleRegister = async () => {
    if (
      name &&
      email &&
      password &&
      repeatPassword &&
      password === repeatPassword
    ) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        if (!auth.currentUser) {
          throw new Error("No currentUser!");
        }

        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        console.log("User registered!");
      } catch (err) {
        console.error(err);
        setShowError(true);
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
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Input
        placeholder="Repeat password"
        secureTextEntry
        value={repeatPassword}
        onChangeText={(text) => setRepeatPassword(text)}
      />

      {showError && (
        <Text style={globalStyles.errorText}>Could not register</Text>
      )}
      <View style={styles.buttonView}>
        <Button
          titleStyle={{ fontSize: 14 }}
          title="Login"
          type="clear"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <Button title="Register" onPress={async () => await handleRegister()} />
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
