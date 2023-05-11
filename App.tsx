import "react-native-gesture-handler";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import TabNav from "./src/routes/TabNav";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [fontLoaded] = useFonts({
    "cute-easter": require("./assets/fonts/CuteEasterPersonalUse-Wy8nV.ttf"),
    "pacifico-regular": require("./assets/fonts/PacificoRegular-BXvV.ttf"),
  });

  if (!fontLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TabNav />
      </PersistGate>
    </Provider>
  );
}
