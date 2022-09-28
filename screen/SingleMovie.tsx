import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Continue } from "../types";

export default function SingleMovie({
  route,
  navigation,
}: NativeStackHeaderProps) {
  const {
    id,
    title,
    release_date,
    poster_path,
    name,
    first_air_date,
    overview,
    vote_average,
  } = route.params;

  useEffect(() => {
    getDetail();
  }, []);

  //   call single movie
  const apiKey = "6ab6d103cf2ba85d668cee4e2de24983";
  const apiPathSingle = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const [movieDetailData, setMovieDetailData] = useState<Continue[]>([]);
  async function getDetail() {
    const result = await fetch(apiPathSingle);
    const getResult = await result.json();
    setMovieDetailData(getResult.results);
    // console.log(getResult.results);
  }

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
