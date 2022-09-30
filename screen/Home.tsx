import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Continue } from "../types";
import MovieBox from "../components/MovieBox";
import { TvBox } from "../components/TvBox";
import ContinueBox from "../components/ContinueBox";

export default function Home() {
  const apiKey = "6ab6d103cf2ba85d668cee4e2de24983";
  const apiPathPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
  const apiPathTv = `http://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc&with_genres=18`;
  const apiContinue = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=Kagemusha,+a+Sombra+do+Samurai`;

  useEffect(() => {
    getMovies();
    getTV();
    getContinue();
  }, []);

  const [movies, setMovies] = useState<Continue[]>([]);
  async function getMovies() {
    const result = await fetch(apiPathPopular);
    const getResult = await result.json();
    setMovies(getResult.results);
    // console.log(getResult.results);
  }

  const [tv, setTV] = useState<Continue[]>([]);
  async function getTV() {
    const result = await fetch(apiPathTv);
    const getResult = await result.json();
    setTV(getResult.results);
  }

  const [continues, setContinue] = useState<Continue[]>([]);
  async function getContinue() {
    const result = await fetch(apiContinue);
    const getResult = await result.json();
    setContinue(getResult.results);
  }

  const renderItem = ({ item }: { item: Continue }) => (
    <MovieBox movie={item} />
  );

  const renderItemTV = ({ item }: { item: Continue }) => <TvBox Tv={item} />;

  const renderItemContinue = ({ item }: { item: Continue }) => (
    <ContinueBox movieContinue={item} />
  );
  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
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
          horizontal
        ></FlatList>
      </View>

      <View>
        <Text style={styles.textWhite}>Tv Show</Text>
        <FlatList
          data={tv}
          keyExtractor={(item) => item.id}
          renderItem={renderItemTV}
          horizontal
        ></FlatList>
      </View>

      <View>
        <Text style={styles.textWhite}>Continue Watching</Text>
        <FlatList
          data={continues}
          keyExtractor={(item) => item.id}
          renderItem={renderItemContinue}
          horizontal
        ></FlatList>
      </View>

      <View>
        <Header />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  textWhite: {
    color: "white",
    fontSize: 20,
    margin: 10,
  },
});
