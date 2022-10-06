import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, FlatList,ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import { Watched, Movie, Tv } from "../types";
import MovieBox from "../components/MovieBox";
import { TvBox } from "../components/TvBox";
import ContinueBox from "../components/WatchedBox";
import { MovieResource ,TvResources, continueResources} from "../api";


export default function Home() {

  useEffect(() => {
    getMovies();
    getTvShows();
    getWatched();
  }, []);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTvShows] = useState<Tv[]>([]);
  const [continues, setContinue] = useState<Watched[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getMovies() {
    setIsLoading(true)
    const popularMovies = await MovieResource.getPopulars()
    setMovies(popularMovies);
    setIsLoading(false)
  }


  async function getTvShows() {
    const tvShows = await TvResources.getTvShows()
    setTvShows(tvShows);
  }

  async function getWatched() {
    const continueMovie = await continueResources.getWatched()
    setContinue(continueMovie);
  }


  const renderItem = ({ item }: { item: Movie }) => (
    <MovieBox movie={item} />
  )
  
  

  const renderItemTV = ({ item }: { item: Tv }) => ( 
    <TvBox Tv={item}/>
  )

  const renderItemContinue = ({ item }: { item:Watched }) => ( 
    <ContinueBox movieContinue={item}/>
  )
    
 
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
        {isLoading ? <ActivityIndicator /> : 
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            horizontal
          >
          </FlatList>
          
        }
      </View>

      <View>
        <Text style={styles.textWhite}>Tv Show</Text>
        {
          isLoading ? <ActivityIndicator /> :

        <FlatList
          data={tvShows}
          keyExtractor={(item) => item.id}
          renderItem={renderItemTV}
          horizontal
        ></FlatList>
        }
      </View>

      <View>
        <Text style={styles.textWhite}>Movie Watching</Text>
        {
          isLoading ? <ActivityIndicator /> :
        <FlatList
          data={continues}
          keyExtractor={(item) => item.id}
          renderItem={renderItemContinue}
          horizontal
        ></FlatList>

        }
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
