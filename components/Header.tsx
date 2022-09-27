import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
  });
  return (
    fontsLoaded && (
      <View style={styles.container}>
        <View style={styles.in}>
          <MaterialIcons name="home-filled" style={styles.text} />
          <Text style={styles.text} onPress={() => navigation.navigate("Home")}>
            Home
          </Text>
          <Ionicons
            name="play-circle-outline"
            style={styles.text2}
            onPress={() => navigation.navigate("Play")}
          />
          <MaterialIcons
            name="bookmarks"
            style={styles.text2}
            onPress={() => navigation.navigate("Saved")}
          />

          <Ionicons
            name="md-person-outline"
            style={styles.text2}
            onPress={() => navigation.navigate("User")}
          />
        </View>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DA1A37",
    position: "absolute",
    bottom: 8,
    left: 30,
    borderRadius: 50,
    width: 300,
    height: 60,
  },
  in: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    borderRadius: 50,
    backgroundColor: "#C0223A",
    width: 70,
    marginTop: 10,
    height: 40,
  },
  text: {
    color: "white",
    textAlignVertical: "center",
    fontSize: 18,
  },
  text2: {
    color: "white",
    textAlignVertical: "center",
    marginLeft: 30,
    fontSize: 24,
  },
});
