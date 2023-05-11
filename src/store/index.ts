import { combineReducers, configureStore } from "@reduxjs/toolkit";

import meetupsReducer from "../features/meetups/meetupsSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  meetups: meetupsReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Wrap rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Install persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
