import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { FavouriteStackParams, Movie, NavigationProps } from '../types'
import { FlatList } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StorageResources } from '../api'
import LoaderBox from './LoaderBox'
import navigation from '../navigation'
import { useFocusEffect } from '@react-navigation/native'

export default function FavouriteBox() {
  const [favoritesFilm, setFavorite] = useState<Movie[]>([])
  const [isLoadingFav, setIsLoadingFav] = useState(true)

  useFocusEffect(
    React.useCallback(() => {
      setIsLoadingFav(true)
      getFav()
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      }
    }, [navigation])
  )

  async function removeMovie(id: Movie) {
    const value = await StorageResources.storageGet('favmovies')
    const alteredValue = value.filter(function (e: { id: any }) {
      return e.id !== id
    })
    StorageResources.storageSave('favmovies', alteredValue)
  }

  async function getFav() {
    const favorites = await StorageResources.storageGet('favmovies')
    setFavorite(favorites)
    setIsLoadingFav(false)
  }

  const renderItemFav = ({ item }: any) => (
    <FavMovie name={item.name} title={item.title} poster_path={item.poster_path} id={item.id} />
  )
  const FavMovie = ({ title, poster_path, name, id }: any) => (
    <View style={styles.wrap}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        }}
      />
      {title && <Text style={styles.fav}>{title}</Text>}
      {!title && <Text style={styles.fav}>{name}</Text>}
      <MaterialCommunityIcons onPress={() => removeMovie(id)} name="bookmark-minus-outline" style={styles.book} />
    </View>
  )
  return (
    <View style={styles.container1}>
      <Text style={styles.title}>Preferiti</Text>

      <View style={styles.container}>
        {isLoadingFav && <LoaderBox />}
        {!isLoadingFav && (
          <FlatList
            data={favoritesFilm}
            keyExtractor={(item) => item.id}
            renderItem={renderItemFav}
            horizontal
          ></FlatList>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container1: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    marginTop: 100,
    flex: 1,
  },
  fav: {
    color: 'white',
    marginLeft: 15,
    marginTop: 10,
    width: 150,
  },
  chevron: {
    position: 'absolute',
    left: 20,
    top: 70,
    color: 'white',
    fontSize: 30,
  },
  image: {
    width: 150,
    height: 200,
    borderRadius: 20,
  },
  wrap: {
    position: 'relative',
    top: 150,
    marginTop: 30,
    marginLeft: 30,
  },
  title: {
    position: 'relative',
    top: 130,
    color: 'white',
    fontSize: 30,
    marginLeft: 30,
  },
  book: {
    color: 'white',
    fontSize: 30,
    marginLeft: 30,
  },
})
