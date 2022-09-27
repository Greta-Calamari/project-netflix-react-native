import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Movie } from "../types";
import MovieBox from "../components/MovieBox";

export default function Home() {
  // const apiSeacrh="https://api.themoviedb.org/3/search/movie?api_key=6ab6d103cf2ba85d668cee4e2de24983&language=en-US&page=1&include_adult=false"
  const apiKey = "6ab6d103cf2ba85d668cee4e2de24983";
  const apiPath = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  // Chiamo API
  const [movies, setMovies] = useState<Movie[]>([]);
  // useEffect(() => {
  //  fetch(apiPath)
  //     .then((response) => response.json())
  //     .then((res) => setMovies(res.results))
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    const result = await fetch(apiPath);
    const getResult = await result.json();
    setMovies(getResult.results);
    console.log(getResult.results);
  }

  const renderItem = ({ item }: { item: Movie }) => <MovieBox movie={item} />;

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          marginTop: 80,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "white", fontSize: 30, marginLeft: 10 }}>
          Net
          <Text style={{ color: "#E11A38" }}>flix</Text>
        </Text>
        <Ionicons
          name="md-search"
          size={24}
          style={{
            color: "white",
            textAlignVertical: "center",
            marginRight: 10,
          }}
        />
      </View>
      <View>
        <Text style={styles.textWhite}>Popular Movie</Text>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        ></FlatList>
      </View>
      <Header />
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  textWhite: {
    color: "white",
    fontSize: 30,
  },
});
