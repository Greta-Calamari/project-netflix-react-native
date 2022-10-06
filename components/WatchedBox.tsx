import { Text, Image, StyleSheet, View, TouchableHighlight } from "react-native";
import React from "react";
import { Watched } from "../types";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  movieContinue: Watched;
}

export default function ContinueBox({ movieContinue }: Props) {
  const { 
    name,
    title,
    poster_path,
    release_date,
    first_air_date,
    overview,
    runtime,
    id,
    vote_average,
    generes,} = movieContinue;
  const navigation = useNavigation();


  return (
    <View>
      <View style={styles.overlay}>
        <AntDesign name="playcircleo" style={styles.play} />
        <View></View>
        <TouchableHighlight
        onPress={() =>
          navigation.navigate("SingleWatched", {
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
      </View>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{release_date}</Text>
      </View>
    </View>
  );
}


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
    width:100,

  },
  overlay: {
    position: "relative",
  },

  play: {
    color: "white",
    fontSize: 50,
    position: "absolute",
    right: 60,
    top: 59,
  },
  // elisse: {
  //   position: "absolute",
  //   right: 60,
  //   top: 60,
  //   width: 50,
  //   height: 30,
  //   borderTopLeftRadius: 50 / 2,
  //   borderTopRightRadius: 50 / 2,
  //   borderTopColor: "#F02B2B",
  //   borderBottomWidth: 0,
  //   borderTopLeftColor: "transparent",
  //   borderRightColor: "transparent",
  //   borderLeftColor: "transparent",
  //   borderWidth: 5,
  // },
});
