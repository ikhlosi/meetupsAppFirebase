import "react-native-gesture-handler";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import TabNav from "./src/routes/TabNav";

export default function App() {
  const [fontLoaded] = useFonts({
    "cute-easter": require("./assets/fonts/CuteEasterPersonalUse-Wy8nV.ttf"),
    "pacifico-regular": require("./assets/fonts/PacificoRegular-BXvV.ttf"),
  });

  if (!fontLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return <TabNav />;
}
