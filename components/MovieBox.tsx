import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { Continue } from "../types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  movie: Continue;
}

export default function MovieBox({ movie }: Props) {
  const {
    title,
    poster_path,
    release_date,
    id,
    name,
    first_air_date,
    overview,
    vote_average,
  } = movie;
  const navigation = useNavigation();

  return (
    <View>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("Movie", {
            id,
            title,
            release_date,
            poster_path,
            name,
            first_air_date,
            overview,
            vote_average,
          })
        }
      >
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          }}
        />
      </TouchableHighlight>
    </View>
  );
}

// styles
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
