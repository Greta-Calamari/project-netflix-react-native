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
  Movie,
  NavigationProps,
  SingleMovieRouteProps,
} from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { width } from "../utils/utils";
import { MovieResource } from "../api";

export default function SingleMovie(this: any) {
  const [actors, setActors] = useState<Actor[]>([]);
  const [movieDetailData, setMovieDetailData] = useState<Movie>();
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
    getDetail();
    getActors();
  }, []);


  const apiPathSingle = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const apiPathActor = `https://api.themoviedb.org/3/movie/${id}/casts?api_key=${apiKey}&language=en-US`;

  async function getDetail() {
    const result = await MovieResource.getMovieData(id);
    setMovieDetailData(result);
  }

  async function getActors() {
    const result = await axios.get(apiPathActor)
    setActors(result.data.cast)
  }

  const ActorProfile = ({ original_name , character}:Actor) => (
      <View>
         <Text style={styles.casts}>{character}</Text>
         <Text></Text>
      </View>
  );

  const renderActor = ({ item }:any) => (
    <ActorProfile  original_name={item.original_name} character={item.character} id={""} />
  );


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
        <Text style={styles.subDate}>{runtime}</Text>
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
        <FlatList
        data={actors}
        renderItem={renderActor}
        keyExtractor={(item) => item.id}
        horizontal
        >
        </FlatList>
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
  casts:{
    color:"white"
  }
});
