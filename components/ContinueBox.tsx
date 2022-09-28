import { Text, Image, StyleSheet, View } from "react-native";
import React from "react";
import { Continue } from "../types";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  movieContinue: Continue;
}

export default function ContinueBox({ movieContinue }: Props) {
  const { title, poster_path, release_date } = movieContinue;

  return (
    <View>
      <View style={styles.overlay}>
        <AntDesign name="playcircleo" style={styles.play} />
        <View style={styles.elisse}></View>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          }}
        />
      </View>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{release_date}</Text>
      </View>
    </View>
  );
}

// style
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 20,
    opacity: 0.4,
  },
  title: {
    color: "white",
  },
  date: {
    color: "grey",
  },
  wrap: {
    marginLeft: 20,
  },
  overlay: {
    position: "relative",
  },

  play: {
    color: "white",
    fontSize: 50,
    position: "absolute",
    right: 120,
    top: 80,
  },
  elisse: {
    position: "absolute",
    right: 155,
    top: 80,
    width: 15,
    height: 30,
    border: 2,
    backgroundColor: "#F02B2B",
  },
});
