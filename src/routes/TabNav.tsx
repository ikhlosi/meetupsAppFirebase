import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MeetupStack from "./MeetupStack";
import AboutStack from "./AboutStack";
import { Ionicons } from "@expo/vector-icons";

// Defining the type of the navigator: what screens it will have and what properties each screen will take. `undefined`: no properties
type TabParamList = {
  MeetupStack: undefined;
  AboutStack: undefined;
};

// Assigning the type to the newly created tab navigator. Now the TypeScript transpiler will throw errors if the screens we create below don't match the above type
const Tab = createBottomTabNavigator<TabParamList>();

const TabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="MeetupStack"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "MeetupStack") {
            iconName = focused ? "apps" : "apps-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "AboutStack") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="MeetupStack" component={MeetupStack} />
      <Tab.Screen name="AboutStack" component={AboutStack} />
    </Tab.Navigator>
  );
};

export default TabNav;
