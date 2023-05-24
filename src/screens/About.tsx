import { Text, View } from "react-native";
import React from "react";
import { useAuthStateContext } from "../contexts/AuthUserProvider";

const About = () => {
  const { user } = useAuthStateContext();
  return (
    <View>
      <Text>About screen</Text>
      {user?.isAnonymous ? (
        <Text>Anonymous user</Text>
      ) : (
        <View>
          <Text>Displayname: {user?.displayName}</Text>
          <Text>email: {user?.email}</Text>
        </View>
      )}
    </View>
  );
};

export default About;
