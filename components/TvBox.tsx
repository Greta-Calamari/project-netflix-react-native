import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import React from "react";
import { Tv } from "../types";
import { useNavigation } from "@react-navigation/native";

interface Props {
  Tv: Tv;
}

export function TvBox({ Tv }: Props) {
  const {
    name,
    poster_path,
    first_air_date,
    overview,
    runtime,
    id,
    vote_average,
    generes,
  } = Tv;
  const navigation = useNavigation();

  return (
    <View>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate("SingleTv", {
            id,
            poster_path,
            name,
            first_air_date,
            overview,
            vote_average,
            runtime,
            generes,
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
