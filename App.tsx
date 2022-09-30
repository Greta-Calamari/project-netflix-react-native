import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation/index";
import Reactotron from "reactotron-react-native";
if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
