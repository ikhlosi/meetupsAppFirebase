import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllMeetups, { MeetupItem } from "../screens/AllMeetups";
import MeetupDetails from "../screens/MeetupDetails";
import Header from "../shared/Header";
import { ParamListBase } from "@react-navigation/native";

export interface MeetupStackParamList extends ParamListBase {
  AllMeetups: undefined;
  MeetupDetails: { item: MeetupItem };
}

const Stack = createStackNavigator<MeetupStackParamList>();

const MeetupStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "pacifico-regular",
          fontSize: 20,
          color: "#333",
          letterSpacing: 1,
        },
      }}
    >
      <Stack.Screen
        name="AllMeetups"
        component={AllMeetups}
        options={() => {
          return {
            header: () => <Header title={"All Meetups"} />,
          };
        }}
      />
      <Stack.Screen
        name="MeetupDetails"
        component={MeetupDetails}
        options={{
          title: "Meetup Details",
        }}
      />
    </Stack.Navigator>
  );
};

export default MeetupStack;
