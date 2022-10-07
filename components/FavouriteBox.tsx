import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Movie } from '../types'
interface Props {
  favList: Movie
}
export default function FavouriteBox({ favList }: Props) {
  return (
    <View>
      <Text style={styles.fav}>{favList.title}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  fav: {
    color: 'white',
  },
})
