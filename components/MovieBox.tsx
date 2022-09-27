import { Text, Image, StyleSheet, View } from "react-native";
import React from "react";
import { Movie } from "../types";

interface Props {
  movie: Movie;
}

export default function MovieBox({ movie }: Props) {
  const { title, poster_path, date } = movie;
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        }}
      />
      <Text>{title}</Text>
      <Text>{date}</Text>
    </View>
  );
}

// style
const styles = StyleSheet.create({
  image: {
    width: 600,
    height: 600,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
