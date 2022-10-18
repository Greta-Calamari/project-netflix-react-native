import { View, Text, TouchableHighlight, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { NavigationProps, Searched } from '../types'

interface Props {
  searchedMovies: Searched
  handleFavouritesClick: any
}
export default function SingleSearched({ searchedMovies }: Props) {
  const route = useRoute()
  const navigation = useNavigation<NavigationProps>()
  const { id, title, release_date, poster_path, overview, vote_average, runtime, generes } = searchedMovies
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
