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

  async function removeMovie(film: Movie) {
    const favorites = await StorageResources.storageGet('favmovies')
    const noMoreFavorites = favorites.filter(function (e: { id: any }) {
      // if (movie.isInFavourite === true) return (movie.isInFavourite = false)
      return e.id !== film
    })
    StorageResources.storageSave('favmovies', noMoreFavorites)
    setFavorite(noMoreFavorites)
  }

  async function getFav() {
    const favorites = await StorageResources.storageGet('favmovies')
    setFavorite(favorites)
    setIsLoadingFav(false)
    favorites.isInFavourite = true
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
        <View>
          <MaterialCommunityIcons
            onPress={() => {
              removeMovie(id)
            }}
            name="bookmark-minus-outline"
            style={styles.book}
          />
        </View>
        <View>
          {title && <Text style={styles.fav}>{title}</Text>}
          {!title && <Text style={styles.fav}>{name}</Text>}
        </View>
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
    marginTop: 140,
    marginLeft: 30,
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
    margin: 10,
  },
  title: {
    position: 'relative',
    top: 120,
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  book: {
    position: 'absolute',
    bottom: 20,
    right: 5,
    color: 'white',
    backgroundColor: '#292b2b52',
    fontSize: 30,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    width: 100,
  },
})
