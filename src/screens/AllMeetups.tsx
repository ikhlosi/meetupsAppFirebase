import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Card from "../shared/Card";
import uuid from "react-native-uuid";
import { globalStyles } from "../styles/global";
import { Modal } from "react-native";
import MeetupForm from "./MeetupForm";
import { StackNavigationProp } from "@react-navigation/stack";
import { MeetupStackParamList } from "../routes/MeetupStack";

type AllMeetupsProps = {
  navigation: StackNavigationProp<MeetupStackParamList, "AllMeetups">;
};

export interface MeetupItemWithoutIdAndFav {
  title: string;
  address: string;
  description: string;
}

export interface MeetupItem extends MeetupItemWithoutIdAndFav {
  id: string;
  favorite: boolean;
}

const AllMeetups = ({ navigation }: AllMeetupsProps) => {
  const [locations, setLocations] = useState<MeetupItem[]>([
    {
      id: uuid.v4().toString(),
      title: "First Demo",
      address: "Meetupstr 1, 1000 MeetupCity",
      description: "Great meetup place which you shouldn't miss!",
      favorite: false,
    },
    {
      id: uuid.v4().toString(),
      title: "Second Demo",
      address: "Meetupstr 2, 1000 MeetupCity",
      description: "I would go there if I was you.",
      favorite: false,
    },
  ]);

  const addLocation = (location: MeetupItemWithoutIdAndFav) => {
    setModalVisible(false);
    if (locations.some((loc) => loc.address === location.address)) {
      Alert.alert(
        "Error",
        `A meetup with this address already exists: ${location.address}`,
        [
          {
            text: "Ok",
          },
        ]
      );
      return;
    }

    setLocations((prev) => {
      return [
        ...prev,
        { ...location, id: uuid.v4().toString(), favorite: false },
      ];
    });
  };

  const [modalVisible, setModalVisible] = useState(false);

  const goToDetails = (item: MeetupItem) => {
    navigation.navigate("MeetupDetails", { item: item });
  };

  const toggleFavorite = (id: string) => {
    const updatedLocations = locations.map((location) => {
      if (location.id === id) {
        return { ...location, favorite: !location.favorite };
      }
      return location;
    });
    setLocations(updatedLocations);
  };

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalVisible}>
        <View style={styles.modalContent}>
          <Ionicons
            name="close"
            size={24}
            color="black"
            onPress={() => setModalVisible(false)}
            style={[styles.modalToggle, styles.modalClose]}
          />
          <MeetupForm addLocation={addLocation} />
        </View>
      </Modal>
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <Card>
            <Text>{item.title}</Text>
            <View style={styles.iconsContainer}>
              <Ionicons
                name="information-circle"
                size={24}
                color="cornflowerblue"
                onPress={() => goToDetails(item)}
              />
              <Ionicons
                name={item.favorite ? "heart-outline" : "heart-dislike-outline"}
                size={24}
                color="indianred"
                onPress={() => toggleFavorite(item.id)}
              />
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      <View style={styles.modalToggle}>
        <Entypo
          name="add-to-list"
          size={24}
          color="black"
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
};

export default AllMeetups;

const styles = StyleSheet.create({
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalClose: {
    marginBottom: 0,
    marginTop: 20,
  },
  modalContent: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
  },
});
