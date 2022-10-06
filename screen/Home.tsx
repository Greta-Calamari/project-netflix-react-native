import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Continue, Movie, Tv } from "../types";
import MovieBox from "../components/MovieBox";
import { TvBox } from "../components/TvBox";
import ContinueBox from "../components/ContinueBox";
import { MovieResource ,TvResources, continueResources} from "../api";

export default function Home() {

  useEffect(() => {
    getMovies();
    getTV();
    getContinue();
  }, []);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [tv, setTV] = useState<Tv[]>([]);
  const [continues, setContinue] = useState<Continue[]>([]);

  async function getMovies() {
    const popularMovies = await MovieResource.getPopulars()
    setMovies(popularMovies);
  }


  async function getTV() {
    const tvShows = await TvResources.getTv()
    setTV(tvShows);
  }

  async function getContinue() {
    const continueMovie = await continueResources.getContinueData()
    setContinue(continueMovie);
  }

  const renderItem = ({ item }: { item: Movie }) => (
    <MovieBox movie={item} />
  );

  const renderItemTV = ({ item }: { item: Tv }) => <TvBox Tv={item} />;

  const renderItemContinue = ({ item }: { item:Continue }) => (
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
        <Text style={styles.textWhite}>Movie Watching</Text>
        <FlatList
          data={continues}
          keyExtractor={(item) => item.id}
          renderItem={renderItemContinue}
          horizontal
        ></FlatList>
      </View>

      <View>
        <Header/>
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
