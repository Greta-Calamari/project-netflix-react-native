import { View, Text, StyleSheet, TextInput, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Movie } from '../types'
import SearchedResources from '../api/resources/Searched'
import LoaderBox from './LoaderBox'
import SingleMovieScreen from '../screen/SingleMovieScreen'
import MovieBox from './MovieBox'

export default function SearchedMoviesBox() {
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [isLoadingSearchedMovies, setIsLoadingSearchedMovies] = useState(true)

  useEffect(() => {
    getSearchedMovieRequest(searchValue)
  }, [searchValue])

  const getSearchedMovieRequest = async (searchValue: string) => {
    setIsLoadingSearchedMovies(true)
    const searched = await SearchedResources.getSearched(searchValue)
    setSearchedMovies(searched)
    setIsLoadingSearchedMovies(false)
  }

  const renderItemSearchedMovies = ({ item }: { item: Movie }) => (
    <MovieBox movie={item} handleFavouritesClick={undefined} />
  )

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          value={searchValue}
          onChangeText={(searchValue) => setSearchValue(searchValue)}
        />
      </SafeAreaView>

      <Text style={styles.textWhite}>Search Movie</Text>
      <View style={styles.cont}>
        {isLoadingSearchedMovies && <LoaderBox />}
        {!isLoadingSearchedMovies && (
          <FlatList
            data={searchedMovies}
            keyExtractor={(item) => item.id}
            renderItem={renderItemSearchedMovies}
            numColumns={2}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    color: 'white',
  },
  date: {
    color: 'grey',
  },
  wrap: {
    marginLeft: 20,
    width: 100,
  },

  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    color: 'white',
    width: 200,
    position: 'relative',
    top: 45,
    left: 180,
  },
  lens: {
    color: 'white',
    textAlignVertical: 'center',
    marginRight: 10,
    position: 'relative',
    top: 10,
    left: 136,
  },
  textWhite: {
    color: 'white',
    fontSize: 20,
    position: 'relative',
    top: 15,
    left: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cont: {
    marginTop: 50,
    marginLeft: 20,
  },
})
