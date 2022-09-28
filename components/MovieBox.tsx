import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { Movie } from "../types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  movie: Movie;
}

export default function MovieBox({ movie }: Props) {
  const { title, poster_path, release_date } = movie;
  const navigation = useNavigation();

  return (
    <View>
      <TouchableHighlight onPress={() => navigation.navigate("Movie")}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          }}
        />
      </TouchableHighlight>
      <View style={styles.wrap}>
        <Text style={styles.title} onPress={() => navigation.navigate("Movie")}>
          {title}
        </Text>
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
