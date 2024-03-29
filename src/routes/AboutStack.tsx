import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import About from "../screens/About";
import Header from "../shared/Header";
import { ParamListBase } from "@react-navigation/native";

interface AboutStackParamList extends ParamListBase {
  About: undefined;
}

const Stack = createStackNavigator<AboutStackParamList>();

const AboutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={About}
        options={() => {
          return { header: () => <Header title={"About"} /> };
        }}
      />
    </Stack.Navigator>
  );
};

export default AboutStack;
