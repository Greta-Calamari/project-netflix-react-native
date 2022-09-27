import { View, Text ,Image,StyleSheet,ScrollView,} from 'react-native'
import React from 'react'
const API_img = "https://image.tmdb.org/t/p/w500/"
const MovieBox = ({pagingEnabledtitle,title, poster_path,vote_average,release_date,overview}:any) => {
  return (
    <ScrollView  style={styles.scrollView}>
      <Image 
      style={styles.image}
      source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
        }}/>
      {/* <Text style={{color:"white"}} >
        {title}
      </Text>
      <Text>
        {release_date}
      </Text> */}
    </ScrollView>


        
  )
}
const styles = StyleSheet.create({
  
  image:{
    width:300,
    height:300,

  },
  scrollView: {
    marginHorizontal: 20,
  },
    
  
});

export default MovieBox