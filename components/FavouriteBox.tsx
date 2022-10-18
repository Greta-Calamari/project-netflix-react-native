import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Movie } from '../types'
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
      return () => {}
    }, [navigation])
  )

  async function removeMovie(id: Movie) {
    const value = await StorageResources.storageGet('favmovies')
    const alteredValue = value.filter(function (e: { id: any }) {
      return e.id !== id
    })
    StorageResources.storageSave('favmovies', alteredValue)
    setFavorite(alteredValue)
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
      <>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          }}
        />
        <Text style={styles.fav}>{title}</Text>
        <Text style={styles.fav}>{name}</Text>
        <MaterialCommunityIcons
          onPress={() => {
            removeMovie(id)
          }}
          name="bookmark-minus-outline"
          style={styles.book}
        />
      </>
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
            numColumns={2}
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
    marginTop: 40,
    flex: 1,
  },
  fav: {
    color: 'white',
    textAlign: 'center',
    width: 150,
    marginTop: 10,
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
    top: 100,
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
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    width: 100,
  },
})
