import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native'
import Header from '../components/Header'
import { Movie } from '../types'
import MovieBox from '../components/MovieBox'
import { MovieResource, StorageResources, TvResources, WatchedResources } from '../api'
import LoaderBox from '../components/LoaderBox'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation()
  const [movies, setMovies] = useState<Movie[]>([])
  const [tvShows, setTvShows] = useState<Movie[]>([])
  const [continues, setContinue] = useState<Movie[]>([])
  const [isLoadingMovies, setIsLoadingMovies] = useState(true)
  const [isLoadingTvShows, setIsLoadingTvShows] = useState(true)
  const [isLoadingWatched, setisLoadingWatched] = useState(true)
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    getMovies()
    getTvShows()
    getWatched()
  }, [])

  async function getMovies() {
    setIsLoadingMovies(true)
    const popularMovies = await MovieResource.getPopulars()
    setMovies(popularMovies)
    setIsLoadingMovies(false)
  }

  async function getTvShows() {
    setIsLoadingTvShows(true)
    const tvShows = await TvResources.getTvShows()
    setTvShows(tvShows)
    setIsLoadingTvShows(false)
  }

  async function getWatched() {
    setisLoadingWatched(true)
    const watchedMovie = await WatchedResources.getWatched()
    setContinue(watchedMovie)
    setisLoadingWatched(false)
  }

  const addToFavorites = async (item: Movie) => {
    if (favorites.includes(item)) return null
    item.isInFavourite = true
    StorageResources.storageSave('favmovies', [...favorites, item])
    setFavorites([...favorites, item])
  }

  const renderItem = ({ item }: { item: Movie }) => <MovieBox movie={item} handleFavouritesClick={addToFavorites} />

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          marginTop: 80,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30, marginLeft: 10 }}>
          Net
          <Text style={{ color: '#E11A38' }}>flix</Text>
        </Text>
      </View>

      <View>
        <Text style={styles.textWhite}>Popular Movie</Text>
        {isLoadingMovies && <LoaderBox />}
        {!isLoadingMovies && (
          <FlatList data={movies} keyExtractor={(item) => item.id} renderItem={renderItem} horizontal />
        )}
      </View>

      <View>
        <Text style={styles.textWhite}>Tv Show</Text>
        {isLoadingTvShows && <LoaderBox />}
        {!isLoadingTvShows && (
          <FlatList data={tvShows} keyExtractor={(item) => item.id} renderItem={renderItem} horizontal></FlatList>
        )}
      </View>

      <View>
        <Text style={styles.textWhite}>Movie Watching</Text>
        {isLoadingWatched && <LoaderBox />}
        {!isLoadingWatched && (
          <FlatList data={continues} keyExtractor={(item) => item.id} renderItem={renderItem} horizontal></FlatList>
        )}
      </View>

      <View>
        <Header />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  textWhite: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
})
