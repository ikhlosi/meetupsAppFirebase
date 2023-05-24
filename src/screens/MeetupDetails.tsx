import { Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../styles/global";
import Card from "../shared/Card";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { RouteProp } from "@react-navigation/native";
import { MeetupStackParamList } from "../routes/MeetupStack";

interface MeetupDetailsProps {
  route: RouteProp<MeetupStackParamList, "MeetupDetails">;
}

const MeetupDetails = ({ route }: MeetupDetailsProps) => {
  const { id, favorite, ...locationDetails } = route.params.item;

  return (
    <View style={globalStyles.container}>
      <Card>
        {Object.keys(locationDetails).map((key, i) => (
          <View key={i}>
            <Text style={globalStyles.titleText}>
              {capitalizeFirstLetter(key)}
            </Text>
            {/* To tell TypeScript that we are certain that `key` is definitely one of the keys of the `locationDetails` object. This is called "type assertion" in TypeScript */}
            <Text>{locationDetails[key as keyof typeof locationDetails]}</Text>
          </View>
        ))}
      </Card>
    </View>
  );
};

export default MeetupDetails;
