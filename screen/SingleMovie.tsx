import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Continue } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function SingleMovie({
  route,
  navigation,
}: NativeStackHeaderProps) {
  const {
    id,
    title,
    release_date,
    poster_path,
    name,
    first_air_date,
    overview,
    vote_average,
  } = route.params;

  useEffect(() => {
    getDetail();
  }, []);

  //   call single movie
  const apiKey = "6ab6d103cf2ba85d668cee4e2de24983";
  const apiPathSingle = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const [movieDetailData, setMovieDetailData] = useState<Continue[]>([]);
  async function getDetail() {
    const result = await fetch(apiPathSingle);
    const getResult = await result.json();
    setMovieDetailData(getResult.results);
    // console.log(getResult.results);
  }

  return (
    <View>
      {/* {title === title ? <Text>{title}</Text> : <Text>{name}</Text>} */}
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={[
            styles.background,
            {
              transform: [{ rotateY: "180deg" }, { rotateZ: "180deg" }],
            },
          ]}
        />
        <MaterialCommunityIcons
          name="bookmark-minus-outline"
          style={styles.book}
        />
        <MaterialIcons name="keyboard-arrow-left" style={styles.chevron} />
      </View>
    </View>
  );
}
// styles

//full width
let width = Dimensions.get("window").width;

//full height
let height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 600,
  },
  container: {
    position: "relative",
  },

  book: {
    position: "absolute",
    right: 20,
    top: 30,
    color: "white",
    fontSize: 30,
  },
  chevron: {
    position: "absolute",
    left: 20,
    top: 30,
    color: "white",
    fontSize: 30,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 400,
  },
});
