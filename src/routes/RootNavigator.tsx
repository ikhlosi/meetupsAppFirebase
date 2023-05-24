import { StyleSheet } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useAuthStateContext } from "../contexts/AuthUserProvider";
import TabNav from "./TabNav";

const RootNavigator = () => {
  const userContext = useAuthStateContext();

  if (userContext.initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {userContext.user ? <TabNav /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
