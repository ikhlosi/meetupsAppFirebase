import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
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
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuthStateContext } from "../contexts/AuthUserProvider";

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
export interface MeetupItem extends MeetupItemWithoutIdAndFav {
  id: string;
  favorite: boolean;
}

// Typing the props with the above defined type `AllMeetupsProps`
const AllMeetups = ({ navigation }: AllMeetupsProps) => {
  const [locations, setLocations] = useState<MeetupItem[]>([]);

  const { user } = useAuthStateContext();

  useEffect(() => {
    // Get collection `meetups`
    const dbRef = collection(db, "locations");

    const unsubscribe = onSnapshot(
      dbRef,
      (qs) =>
        setLocations(
          qs.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as MeetupItem)
          )
        ),
      (err) => {
        console.error(`Error while fetching locations: ${err}`);
      }
    );
    return () => unsubscribe();
  }, []);

  const addLocation = async (location: MeetupItemWithoutIdAndFav) => {
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
    const docRef = await addDoc(collection(db, "locations"), {
      ...location,
      favorite: false,
    });
  };

  // The type for `modalVisible` is inferred, so it is not necessary to write: `useState<boolean>(false)`
  const [modalVisible, setModalVisible] = useState(false);

  const goToDetails = (item: MeetupItem) => {
    navigation.navigate("MeetupDetails", { item: item });
  };

  const toggleFavorite = async (id: string) => {
    const docRef = doc(db, "locations", id);
    const docSnapShot = await getDoc(docRef);
    if (!docSnapShot.exists()) {
      throw new Error("Document doesn't exist");
    }
    const meetupLocation = docSnapShot.data() as MeetupItem;
    await updateDoc(docRef, { favorite: !meetupLocation.favorite });
  };

  const removeLocation = async (id: string) => {
    await deleteDoc(doc(db, "locations", id));
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
                    onPress={async () => await toggleFavorite(item.id)} // TODO: maybe no async/await
                  />
                </View>
              </View>
              <View style={styles.trashContainer}>
                <Ionicons
                  name="trash"
                  size={24}
                  color="black"
                  onPress={async () => await removeLocation(item.id)} // TODO: maybe no async/await
                />
              </View>
            </View>
          </Card>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
      {!user?.isAnonymous && (
        <View style={styles.modalToggle}>
          <Entypo
            name="add-to-list"
            size={24}
            color="black"
            onPress={() => setModalVisible(true)}
          />
        </View>
      )}
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
