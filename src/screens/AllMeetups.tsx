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
import {
  MeetupItem,
  meetupAdded,
  meetupRemoved,
  meetupToggleFavorite,
} from "../features/meetups/meetupsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

// Typing the props of AllMeetups component
interface AllMeetupsProps {
  // `MeetupStackParamList` is the type that describes the parameters for the `MeetupStack` navigator, while "AllMeetups" is the name of the screen in the stack navigator
  navigation: StackNavigationProp<MeetupStackParamList, "AllMeetups">;
}

// The type of a Meetup item, without the `id` and `favorite` properties
export interface MeetupItemWithoutIdAndFav {
  title: string;
  address: string;
  description: string;
}

// Typing the props with the above defined type `AllMeetupsProps`
const AllMeetups = ({ navigation }: AllMeetupsProps) => {
  // The `state` arg will be correctly typed thanks to our custom hook
  const locations = useAppSelector((state) => state.meetups);

  const dispatch = useAppDispatch();

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
    dispatch(
      meetupAdded({
        ...location,
        id: uuid.v4().toString(),
        favorite: false,
      })
    );
  };

  // The type for `modalVisible` is inferred, so it is not necessary to write: `useState<boolean>(false)`
  const [modalVisible, setModalVisible] = useState(false);

  const goToDetails = (item: MeetupItem) => {
    navigation.navigate("MeetupDetails", { item: item });
  };

  const toggleFavorite = (id: string) => {
    dispatch(meetupToggleFavorite(id));
  };

  const removeLocation = (id: string) => {
    dispatch(meetupRemoved(id));
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
            <View style={styles.cardContainer}>
              <View style={styles.titleInfoContainer}>
                <Text>{item.title}</Text>
                <View style={styles.iconsContainer}>
                  <Ionicons
                    name="information-circle"
                    size={24}
                    color="cornflowerblue"
                    onPress={() => goToDetails(item)}
                  />
                  <Ionicons
                    name={
                      item.favorite ? "heart-outline" : "heart-dislike-outline"
                    }
                    size={24}
                    color="indianred"
                    onPress={() => toggleFavorite(item.id)}
                  />
                </View>
              </View>
              <View style={styles.trashContainer}>
                <Ionicons
                  name="trash"
                  size={24}
                  color="black"
                  onPress={() => removeLocation(item.id)}
                />
              </View>
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleInfoContainer: {
    flex: 1,
    alignItems: "center",
  },
  trashContainer: {
    flex: 0,
  },
});
