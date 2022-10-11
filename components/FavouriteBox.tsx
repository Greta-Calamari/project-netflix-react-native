import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FavouriteStackParams, NavigationProps } from '../types'
import { FlatList } from 'react-native-gesture-handler'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
  setNewColor: any
}
export default function FavouriteBox({ setNewColor }: Props) {
  const route = useRoute()
  const navigation = useNavigation<NavigationProps>()
  const { favMovieArray, handleRemove, refreshFlatlist } = route.params as FavouriteStackParams

  const combined = () => {
    handleRemove()
  }
  const renderItemFav = ({ item }: any) => (
    <FavMovie name={item.name} title={item.title} poster_path={item.poster_path} />
  )
  const FavMovie = ({ title, poster_path, name }: any) => (
    <View style={styles.wrap}>
      <Image
        style={styles.image}
        source={{
          uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        }}
      />
      {title && <Text style={styles.fav}>{title}</Text>}
      {!title && <Text style={styles.fav}>{name}</Text>}
      <MaterialCommunityIcons onPress={() => combined()} name="bookmark-minus-outline" style={styles.book} />
    </View>
  )
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferiti</Text>
      <FlatList
        data={favMovieArray}
        keyExtractor={(item) => item.id}
        renderItem={renderItemFav}
        extraData={refreshFlatlist}
      ></FlatList>
      <MaterialIcons name="keyboard-arrow-left" style={styles.chevron} onPress={() => navigation.goBack()} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
