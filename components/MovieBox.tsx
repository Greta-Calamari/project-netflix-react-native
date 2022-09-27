import { View, Text } from 'react-native'
import React from 'react'

const MovieBox = ({title, poster_path,vote_average,relese_date,overview}:any) => {
  return (
    <View>
      <Text style={{color:"white"}}>
        {title}
        {poster_path}
      </Text>
    </View>
  )
}

export default MovieBox