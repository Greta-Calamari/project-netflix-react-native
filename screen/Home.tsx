import { StatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, FlatList, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Header from '../components/Header'
import { Watched, Movie, Tv, Searched, HomeStackParams } from '../types'
import MovieBox from '../components/MovieBox'
import { TvBox } from '../components/TvBox'
import { MovieResource, StorageResources, TvResources, WatchedResources } from '../api'
import LoaderBox from '../components/LoaderBox'
import WatchedBox from '../components/WatchedBox'
import { useNavigation } from '@react-navigation/native'
import SearchedMoviesBox from '../components/SearchedMoviesBox'
import SearchedResources from '../api/resources/Searched'

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
  }, [])

  // useEffect(() => {
  //   console.log(favorites)
  // }, [favorites])

  useEffect(() => {
    getSearchedMovieRequest(searchValue)
  }, [searchValue])

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
    StorageResources.storageSave('favmovies', [...favorites, item])
    setFavorites([...favorites, item])
  }

  const getSearchedMovieRequest = async (searchValue: string) => {
    setIsLoadingSearchedMovies(true)
    const searched = await SearchedResources.getSearched(searchValue)
    setSearchedMovies(searched)
    setIsLoadingSearchedMovies(false)
  }

  const renderItem = ({ item }: { item: Movie }) => <MovieBox movie={item} handleFavouritesClick={addToFavorites} />

  const renderItemTV = ({ item }: { item: Tv }) => <TvBox Tv={item} handleFavouritesClick={addToFavorites} />

  const renderItemContinue = ({ item }: { item: Watched }) => (
    <WatchedBox movieWatched={item} handleFavouritesClick={addToFavorites} />
  )

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

      {/* <View>
        <Pressable
          onPress={() => navigation.navigate('FavouriteBox', { favMovieArray: favorites, handleRemove: removeMovie })}
        >
          <Text style={styles.textWhite}>Vai ai tuoi preferiti</Text>
        </Pressable>
        <AntDesign name="hearto" style={styles.heart} />
      </View> */}

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
