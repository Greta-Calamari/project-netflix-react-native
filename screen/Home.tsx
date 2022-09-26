import { StatusBar } from 'expo-status-bar';
import React ,{useState,useEffect} from 'react';
import {Text,View} from 'react-native'
import MovieBox from '../components/MovieBox';

import axios from 'axios'


import { Ionicons } from '@expo/vector-icons';

import styled from 'styled-components/native'
import Header from '../components/Header';




// styles
const Container =styled.View`
flex:1;
background-color:black;

`




export default function Home() {
  const apiKey = '6ab6d103cf2ba85d668cee4e2de24983';
  const apiPath = "https://api.themoviedb.org/3/movie/popular?api_key=6ab6d103cf2ba85d668cee4e2de24983"
  const img = "https://image.tmdb.org/t/p/w500/"
  const apiSeacrh="https://api.themoviedb.org/3/search/movie?api_key=6ab6d103cf2ba85d668cee4e2de24983&language=en-US&page=1&include_adult=false"
  

  const [movies,setMovies]=useState<any[]>([])

  useEffect(()=>{
    fetch(apiPath)
    .then((response)=>response.json())
    .then(data=>{
      console.log(data)
      setMovies(data.results)
    })
  },[])

  
  return (
    <>
      <StatusBar 
      translucent 
      backgroundColor='transparent' 
      
      />
      <Container>
        <View style={{marginTop:80, flexDirection:"row",justifyContent:"space-between"}}>
          <Text style={{color:"white",fontSize:30,marginLeft:10,}}>
              Net
          <Text style={{color:"#E11A38",}}>
             flix
          </Text>        
          </Text>
          <Ionicons  name="md-search" size={24} style={{color:"white", textAlignVertical:"center",marginRight:10,}} />
          

        </View>
          <Text>
              {movies.length > 0 ?(
                
                <Text style={{color:"white"}}>
                  {movies.map((movieReq)=>
                  <MovieBox key={movieReq.id} {...movieReq}/>)}
                </Text>
            
              ):(
                <Text style={{color:"white"}}>Sorry !! No Movies Found</Text>
              )}
          </Text> 

             


          
          <Header/>
          
      </Container>
        
    </>
  )
}

