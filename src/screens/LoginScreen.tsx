import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../routes/AuthStack";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { globalStyles } from "../styles/global";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigation: NavigationProp<AuthStackParamList> = useNavigation();

  const handleLogin = () => {
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((err) => {
          console.log(err);
          setShowError(true);
        });
    }
  };

  const handleAnonymousLogin = () => {
    signInAnonymously(auth).catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        placeholder="Email address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      {showError && (
        <Text style={globalStyles.errorText}>Invalid credentials</Text>
      )}

      <View style={styles.buttonView}>
        <Button
          titleStyle={{ fontSize: 14 }}
          title="Register"
          type="clear"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <Button title="Login" onPress={() => handleLogin()} />
      <Button
        title="Use anonymously"
        onPress={() => handleAnonymousLogin()}
        color="secondary"
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
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
