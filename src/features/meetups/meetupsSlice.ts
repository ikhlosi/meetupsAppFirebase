import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";
import { MeetupItemWithoutIdAndFav } from "../../screens/AllMeetups";

// The type of a Meetup item
export interface MeetupItem extends MeetupItemWithoutIdAndFav {
  id: string;
  favorite: boolean;
}

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
    // Specifying the type of the payload (by specifying the type of `action`)
    meetupAdded: (state, action: PayloadAction<MeetupItem>) => {
      state.push(action.payload);
    },
    meetupToggleFavorite: (state, action: PayloadAction<string>) =>
      state.map((meetupLocation) => {
        if (meetupLocation.id === action.payload) {
          return { ...meetupLocation, favorite: !meetupLocation.favorite };
        }
        return meetupLocation;
      }),
    meetupRemoved: (state, action: PayloadAction<string>) => {
      return state.filter((location) => location.id !== action.payload);
    },
  },
});

export const { meetupAdded, meetupToggleFavorite, meetupRemoved } =
  meetupsSlice.actions;

export default meetupsSlice.reducer;
