import Reactotron from "reactotron-react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ lan: "exp://localhost:19000" })
  .useReactNative()
  .connect();
