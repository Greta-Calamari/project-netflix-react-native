import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Actor,
  Genres,
  Movie,
  NavigationProps,
  SingleMovieRouteProps,
} from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import { FlatList } from "react-native-gesture-handler";
import { width } from "../utils/utils";
import { MovieResource } from "../api";
import ActorProfileBox from "../components/ActorProfileBox";

export default function SingleMovie() {
  const [actors, setActors] = useState<Actor[]>([]);
  const [movieDetailData, setMovieDetailData] = useState<Movie>();
  const [movieGenres , setMovieGenre] = useState<Genres[]>([])
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();
  const {
    id,
    title,
    release_date,
    poster_path,
    overview,
    vote_average,
    generes,
    runtime,
  } = route.params as SingleMovieRouteProps;

  useEffect(() => {
    getDetail()
    getActors()
    getGenre()
  }, []);
  
  
  async function getDetail() {
    const result = await MovieResource.getMovieData(id);
    setMovieDetailData(result);
  }

  async function getActors() {
    const result = await MovieResource.getCastData(id)
    setActors(result)
  }
  async function getGenre() {
    const result = await MovieResource.getMovieGenre(id)
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
  );
  // const App = () => {
  //   const renderItem = ({ item }) => (
  //     <Item title={item.title} />
  //   );
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
        <Text style={styles.movieTitle}>{title}</Text>
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.subDate}>{release_date}</Text>
        <View>
          <FlatList
          data={movieGenres}
          renderItem={renderGeneres}
          keyExtractor={(item) => item.id}
          horizontal
          >

          </FlatList>
        </View>
        <Text style={styles.subDate}></Text>
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
    marginRight: 10,
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
    marginBottom: 30,
  },
  cast: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
    position: "relative",
    bottom: 70,
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
  casts:{
    color:"white"
  },
  wrapActors:{
    marginTop:-50,
    marginBottom:30,

  },
  subGenre:{
    marginLeft:10,
    color:"grey",
  }
});
