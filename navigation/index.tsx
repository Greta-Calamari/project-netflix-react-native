import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screen/Home";
import Play from "../screen/Play";
import Saved from "../screen/Saved";
import User from "../screen/User";
import SingleMovie from "../screen/SingleMovie";
import SingleTv from "../screen/SingleTv";

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Play"
          component={Play}
          options={{ title: "Player" }}
        />
        <Stack.Screen
          name="Saved"
          component={Saved}
          options={{ title: "Saved" }}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{ title: "User" }}
        />
        <Stack.Screen
          name="SingleMovie"
          component={SingleMovie}
          options={{ title: "SingleMovie" }}
        />
        <Stack.Screen
          name="SingleTv"
          component={SingleTv}
          options={{ title: "SingleTv" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const Stack = createNativeStackNavigator();
