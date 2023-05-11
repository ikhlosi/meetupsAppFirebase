import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { MeetupItem } from "../../screens/AllMeetups";

const initialState: MeetupItem[] = [
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
];

const meetupsSlice = createSlice({
  name: "meetups",
  initialState,
  reducers: {
    meetupAdded: (state, action) => {
      state.push(action.payload);
    },
    meetupToggleFavorite: (state, action) => {
      state.forEach((meetupLocation) => {
        if (meetupLocation.id === action.payload) {
          const currentFavoriteValue = meetupLocation.favorite;
          meetupLocation.favorite = !currentFavoriteValue;
        }
      });
    },
    meetupRemoved: (state, action) => {
      return state.filter((location) => location.id !== action.payload);
    },
  },
});

export const { meetupAdded, meetupToggleFavorite, meetupRemoved } =
  meetupsSlice.actions;

export default meetupsSlice.reducer;
