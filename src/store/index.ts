import { combineReducers, configureStore } from "@reduxjs/toolkit";

import meetupsReducer from "../features/meetups/meetupsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  meetups: meetupsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Inferring the type of the state and calling this type `RootState`.
export type RootState = ReturnType<typeof store.getState>;

// Getting the type of the store's `dispatch` and calling it `AppDispatch`
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
