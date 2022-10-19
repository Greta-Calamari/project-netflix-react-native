import { View, Text, StyleSheet, Image, TouchableHighlight, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Tv } from '../types'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

interface Props {
  Tv: Tv
  handleFavouritesClick: any
}

export function TvBox({ Tv, handleFavouritesClick }: Props) {
  const { name, poster_path, first_air_date, overview, runtime, id, vote_average, generes } = Tv
  const navigation = useNavigation()
  const [myColor, setmyColor] = useState('white')
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setmyColor('white')
      }
    }, [navigation])
  )

  return (
    <View>
      <TouchableHighlight
        onPress={() =>
          navigation.navigate('SingleTv', {
            id,
            poster_path,
            name,
            first_air_date,
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
      <View>
        <Pressable
          onPress={() => {
            handleFavouritesClick(Tv), setmyColor('red')
          }}
        >
          <MaterialCommunityIcons name="bookmark-plus-outline" color={myColor} style={styles.book} />
        </Pressable>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{first_air_date}</Text>
      </View>
    </View>
  )
}
// style
const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 20,
  },
  name: {
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
    backgroundColor: '#292b2b79',
    color: 'white',
  },
  bookFav: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontSize: 30,
    backgroundColor: '#292b2b79',
    color: 'red',
  },
})
