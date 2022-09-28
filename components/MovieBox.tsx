import { Text, Image, StyleSheet, View } from "react-native";
import React from "react";
import { Movie } from "../types";

interface Props {
  movie: Movie;
}

export default function MovieBox({ movie }: Props) {
  const { title, poster_path, release_date } = movie;

  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        }}
      />
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
});
