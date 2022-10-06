import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Actor, Genres, NavigationProps, SingleMovieRouteProps, Tv } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { MovieResource, TvResources } from "../api";
import ActorProfileBox from "../components/ActorProfileBox";

export default function SingleTv() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();
  const [tvDetailData, setTvDetailData] = useState<Tv>();
  const [movieGenres , setMovieGenre] = useState<Genres[]>([])
  const [actors, setActors] = useState<Actor[]>([]);
  const {
    name,
    poster_path,
    first_air_date,
    overview,
    runtime,
    id,
    vote_average,
    generes,
  } = route.params as SingleMovieRouteProps;

  useEffect(() => {
    getDetail()
    getActors()
    getGenre()
  }, []);


  async function getDetail() {
    const result = await TvResources.getTvdata(id)
    setTvDetailData(result)
    }

  async function getActors() {
    const result = await TvResources.getCastData(id)
    setActors(result)
    }
  
    async function getGenre() {
      const result = await TvResources.getMovieGenre(id)
      setMovieGenre(result)
    }
    
  const renderActor = ({ item }: { item: Actor }) => (
      <ActorProfileBox actor={item} />
    )
  const renderGeneres = ({ item }:any )=> (
      <GenreNames name={item.name} id={""} />
    )
  const GenreNames = ({name}:Genres) => (
      <View>
        <Text style={styles.subGenre}>{name}</Text>
      </View>
    )

  return (
    <ScrollView style={styles.window}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          }}
        />
        <LinearGradient
          colors={["rgba(23, 29, 33, 1)", "transparent"]}
          style={[
            styles.background,
            {
              transform: [{ rotateY: "180deg" }, { rotateZ: "180deg" }],
            },
          ]}
        />
        <MaterialCommunityIcons
          name="bookmark-minus-outline"
          style={styles.book}
        />
        <MaterialIcons
          name="keyboard-arrow-left"
          style={styles.chevron}
          onPress={() => navigation.goBack()}
        />
      </View>
      <LinearGradient
        colors={["rgba(0,0,0,1)", "transparent"]}
        style={[
          styles.background,
          {
            transform: [{ rotateY: "180deg" }, { rotateZ: "180deg" }],
          },
        ]}
      />
      <View style={styles.subContainer}>
        <Text style={styles.movieTitle}>{name}</Text>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.subDate}>{first_air_date}</Text>
        <Text style={styles.subDate}>{runtime}</Text>
        <View>
          <FlatList
          data={movieGenres}
          renderItem={renderGeneres}
          keyExtractor={(item) => item.id}
          horizontal
          >

          </FlatList>
        </View>
      </View>
      <View style={styles.subContainer2}>
        <Text style={styles.star}>{vote_average}</Text>
        <View style={styles.def}></View>
        <View style={styles.rating}>
          <Rating
            type="star"
            ratingCount={vote_average}
            imageSize={30}
            tintColor="rgb(23, 29, 33)"
            readonly={true}
            fractions={2}
          />
        </View>
        <View style={styles.def}></View>
      </View>

      <View style={styles.subContainer2}>
        <Text style={styles.subOverview}>{overview}</Text>
      </View>

      <View>
        <Text style={styles.cast}>Cast</Text>
        <View style={styles.wrapActors}>
        <FlatList
        data={actors}
        renderItem={renderActor}
        keyExtractor={(item) => item.id}
        horizontal
        >
        </FlatList>

        </View>
        
      </View>

      <View style={styles.btnCont}>
        <Pressable style={styles.button}>
          <Text style={styles.textBtn}>Watch Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
let width = Dimensions.get("window").width;

let height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  window: {
    backgroundColor: "rgb(23, 29, 33)",
  },
  image: {
    width: width,
    height: 600,
  },
  container: {
    position: "relative",
  },

  book: {
    position: "absolute",
    right: 20,
    top: 70,
    color: "white",
    fontSize: 30,
  },
  chevron: {
    position: "absolute",
    left: 20,
    top: 70,
    color: "white",
    fontSize: 30,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
  movieTitle: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  subContainer: {
    position: "relative",
    bottom: 100,
    flexDirection: "row",
    justifyContent: "center",
  },
  subDate: {
    color: "grey",
  },
  subContainer2: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    bottom: 90,
  },
  star: {
    fontSize: 30,
    color: "#FDC432",
  },
  subOverview: {
    color: "grey",
    margin: 10,
  },
  button: {
    backgroundColor: "#E11A38",
    padding: 20,
    width: 200,
    flexDirection: "row",
    justifyContent: "center",
  },

  textBtn: {
    color: "white",
    fontSize: 20,
  },
  btnCont: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    marginTop:20,
    bottom: 20,
  },
  cast: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    position: "relative",
    bottom: 90,
  },
  rating: {
    marginTop: 6,
  },
  def: {
    height: 40,
    marginTop: 5,
    width: 20,
    backgroundColor: "rgb(23, 29, 33)",
    zIndex: 1000,
  },
  wrapActors:{
    marginTop:-70,
    marginBottom:20,

  },
  subGenre:{
    marginLeft:10,
    color:"grey",
  }
});
