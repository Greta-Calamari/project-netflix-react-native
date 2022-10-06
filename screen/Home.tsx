import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Header from '../components/Header'
import { Watched, Movie, Tv } from '../types'
import MovieBox from '../components/MovieBox'
import { TvBox } from '../components/TvBox'
import ContinueBox from '../components/WatchedBox'
import { MovieResource, TvResources, WatchedResources } from '../api'
import LoaderBox from '../components/LoaderBox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FavouriteBox from '../components/FavouriteBox'

export default function Home() {
  useEffect(() => {
    getMovies()
    getTvShows()
    getWatched()
    getMyObject()
  }, [])

  const [movies, setMovies] = useState<Movie[]>([])
  const [tvShows, setTvShows] = useState<Tv[]>([])
  const [continues, setContinue] = useState<Watched[]>([])
  const [isLoadingMovies, setIsLoadingMovies] = useState(true)
  const [isLoadingTvShows, setIsLoadingTvShows] = useState(true)
  const [isLoadingWatched, setisLoadingWatched] = useState(true)
  const [favorites, setFavorites] = useState<Movie[]>([])

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

  const getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      // read error
    }

    console.log('Done.')
  }
  const addToFavorites = async (item: Movie) => {
    await AsyncStorage.setItem('id', JSON.stringify([...favorites, item]))
    setFavorites([...favorites, item])
    console.log(favorites)
  }

  const renderItem = ({ item }: { item: Movie }) => <MovieBox movie={item} handleFavouritesClick={addToFavorites} />

  const renderItemTV = ({ item }: { item: Tv }) => <TvBox Tv={item} />

  const renderItemContinue = ({ item }: { item: Watched }) => <ContinueBox movieContinue={item} />

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
        <Ionicons
          name="md-search"
          size={24}
          style={{
            color: 'white',
            textAlignVertical: 'center',
            marginRight: 10,
          }}
        />
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
          <FlatList data={tvShows} keyExtractor={(item) => item.id} renderItem={renderItemTV} horizontal></FlatList>
        )}
      </View>

      <View>
        <Text style={styles.textWhite}>Movie Watching</Text>
        {isLoadingWatched && <LoaderBox />}
        {!isLoadingWatched && (
          <FlatList
            data={continues}
            keyExtractor={(item) => item.id}
            renderItem={renderItemContinue}
            horizontal
          ></FlatList>
        )}
      </View>

      <View>
        <Text style={styles.textWhite}>Preferiti</Text>

        <FavouriteBox favList={favorites} />
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
