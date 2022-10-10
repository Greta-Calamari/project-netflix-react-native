import { View, Text, StyleSheet, TouchableHighlight, Image, Pressable } from 'react-native'
import React from 'react'
import { Searched } from '../types'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
  searchedMovies: Searched
  handleFavouritesClick: any
}
export default function SearchedMociesBox({ searchedMovies, handleFavouritesClick }: Props) {
  const { title, poster_path, release_date, id, overview, vote_average, runtime, generes } = searchedMovies
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
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{release_date}</Text>
        <Pressable style={styles.add} onPress={() => handleFavouritesClick(searchedMovies)}>
          <MaterialCommunityIcons name="bookmark-plus-outline" style={styles.book} />
        </Pressable>
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
  book: {
    color: 'white',
    fontSize: 30,
  },
  add: {
    position: 'absolute',
    left: 100,
    bottom: 10,
  },
})
