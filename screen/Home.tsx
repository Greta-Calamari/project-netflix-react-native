import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, Pressable, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Header from '../components/Header'
import { Watched, Movie, Tv, Searched } from '../types'
import MovieBox from '../components/MovieBox'
import { TvBox } from '../components/TvBox'
import { MovieResource, StorageResources, TvResources, WatchedResources } from '../api'
import LoaderBox from '../components/LoaderBox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WatchedBox from '../components/WatchedBox'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import SearchedMoviesBox from '../components/SearchedMoviesBox'
import { apiKey } from '../utils/config'

export default function Home() {
  const navigation = useNavigation()

  const [movies, setMovies] = useState<Movie[]>([])
  const [tvShows, setTvShows] = useState<Tv[]>([])
  const [continues, setContinue] = useState<Watched[]>([])
  const [isLoadingMovies, setIsLoadingMovies] = useState(true)
  const [isLoadingTvShows, setIsLoadingTvShows] = useState(true)
  const [isLoadingWatched, setisLoadingWatched] = useState(true)
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [refreshFlatlist, setRefreshFlatList] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isLoadingSearchedMovies, setIsLoadingSearchedMovies] = useState(true)
  const [searchedMovies, setSearchedMovies] = useState<Searched[]>([])

  useEffect(() => {
    getMovies()
    getTvShows()
    getWatched()
    getMyMovie()
    getSearchedMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    console.log(favorites)
  }, [favorites])

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

  const getMyMovie = async () => {
    const jsonValue = await StorageResources.storageGet('name')
    if (!jsonValue) return undefined
    return JSON.parse(jsonValue)
  }
  const addToFavorites = async (item: Movie) => {
    StorageResources.storageSave('name', [...favorites, item])
    setFavorites([...favorites, item])
  }

  const removeMovie = async (index: number) => {
    setRefreshFlatList(!refreshFlatlist)
    StorageResources.storageRemove('name')
    setFavorites([...favorites.splice(index, -1)])
  }

  const getSearchedMovieRequest = async (searchValue: string) => {
    const url = `http://api.themoviedb.org/3/search/movie?query=${searchValue}?&api_key=${apiKey}`
    setIsLoadingSearchedMovies(true)
    const response = await fetch(url)
    const responseJson = await response.json()
    if (responseJson) {
      setSearchedMovies(responseJson.results)
    }
    setIsLoadingSearchedMovies(false)

    // console.log(responseJson.results)
  }

  // const getMovieRequest = async (searchValue: string) => {
  //   setIsLoadingSearchedMovies(true)
  //   const searched = await SearchedResources.getSearched()
  //   setSearchedMovies(searched)
  //   setIsLoadingSearchedMovies(false)
  // }

  const renderItem = ({ item }: { item: Movie }) => <MovieBox movie={item} handleFavouritesClick={addToFavorites} />

  const renderItemTV = ({ item }: { item: Tv }) => <TvBox Tv={item} />

  const renderItemContinue = ({ item }: { item: Watched }) => <WatchedBox movieContinue={item} />

  const renderItemSearchedMovies = ({ item }: { item: Searched }) => (
    <SearchedMoviesBox searchedMovies={item} handleFavouritesClick={addToFavorites} />
  )

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

        <TextInput
          style={styles.input}
          value={searchValue}
          onChangeText={(searchValue) => setSearchValue(searchValue)}
        />

        <Ionicons name="md-search" size={24} style={styles.lens} />
      </View>
      <View>
        <Pressable
          onPress={() => navigation.navigate('FavouriteBox', { favMovieArray: favorites, handleRemove: removeMovie })}
        >
          <Text style={styles.textWhite}>Vai ai tuoi preferiti</Text>
        </Pressable>
        <AntDesign name="hearto" style={styles.heart} />
      </View>

      <View>
        <Text style={styles.textWhite}>Search Movie</Text>
        {isLoadingSearchedMovies && <LoaderBox />}
        {!isLoadingSearchedMovies && (
          <FlatList
            data={searchedMovies}
            keyExtractor={(item) => item.id}
            renderItem={renderItemSearchedMovies}
            horizontal
          />
        )}
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
  heart: {
    color: 'red',
    fontSize: 24,
    position: 'absolute',
    left: 180,
    top: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    color: 'white',
    width: 200,
    position: 'relative',
    bottom: 10,
  },
  lens: {
    color: 'white',
    textAlignVertical: 'center',
    marginRight: 10,
    position: 'relative',
    top: 10,
  },
})
