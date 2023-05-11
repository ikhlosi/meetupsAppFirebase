import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MeetupStack from "./MeetupStack";
import AboutStack from "./AboutStack";

// Defining the type of the navigator: what screens it will have and what properties each screen will take. `undefined`: no properties
type TabParamList = {
  MeetupStack: undefined;
  AboutStack: undefined;
};

// Assigning the type to the newly created tab navigator. Now the TypeScript transpiler will throw errors if the screens we create below don't match the above type
const Tab = createBottomTabNavigator<TabParamList>();

const TabNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="MeetupStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="MeetupStack" component={MeetupStack} />
        <Tab.Screen name="AboutStack" component={AboutStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNav;
