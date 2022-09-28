import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { TV } from "../types";

interface Props {
  Tv: TV;
}

export function TvBox({ Tv }: Props) {
  const { name, poster_path, first_air_date } = Tv;
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        }}
      />
      <View style={styles.wrap}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{first_air_date}</Text>
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
  name: {
    color: "white",
  },
  date: {
    color: "grey",
  },
  wrap: {
    marginLeft: 20,
  },
});
