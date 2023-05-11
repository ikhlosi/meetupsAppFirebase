import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import About from "../screens/About";
import Header from "../shared/Header";
import { ParamListBase } from "@react-navigation/native";

// Defining the type of the navigator: what screens it will have and what properties each screen will take. `undefined`: the screen has no properties
interface AboutStackParamList extends ParamListBase {
  About: undefined;
}

// Assigning the type to the newly created tab navigator. Now the TypeScript transpiler will throw errors if the screens we create below don't match the above type
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
