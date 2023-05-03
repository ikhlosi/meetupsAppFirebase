import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MeetupStack from "./MeetupStack";
import AboutStack from "./AboutStack";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeStack"
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
