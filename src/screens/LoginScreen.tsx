import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, Input } from "@rneui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../routes/AuthStack";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation: NavigationProp<AuthStackParamList> = useNavigation();

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
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <View style={styles.buttonView}>
        <Button
          titleStyle={{ fontSize: 14 }}
          title="Register"
          type="clear"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <Button title="Login" />
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
