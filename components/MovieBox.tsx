import { Text, Image, StyleSheet, View, TouchableHighlight, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Movie } from '../types'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { StorageResources } from '../api'

interface Props {
  movie: Movie
  handleFavouritesClick: any
}

export default function MovieBox({ movie, handleFavouritesClick }: Props) {
  const { title, poster_path, release_date, id, overview, vote_average, runtime, generes, isInFavourite } = movie
  const navigation = useNavigation()

  return (
    <View>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('SingleMovie', {
            title,
            poster_path,
            release_date,
            id,
            overview,
            vote_average,
            runtime,
            generes,
          })
        }
      >
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          }}
        />
      </TouchableHighlight>
      <Pressable onPress={() => handleFavouritesClick(movie)}>
        {isInFavourite && <MaterialCommunityIcons name="bookmark-plus-outline" style={styles.bookFav} />}
        {!isInFavourite && <MaterialCommunityIcons name="bookmark-plus-outline" style={styles.book} />}
      </Pressable>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{release_date}</Text>
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
    marginLeft: 30,
    width: 100,
  },
  book: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 30,
    backgroundColor: '#292b2b52',
    color: 'white',
  },
  bookFav: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 30,
    color: 'red',
    backgroundColor: '#292b2b52',
  },
})
