import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Continue } from "../types";
interface Props {
  movie: Continue;
}
export default function SingleMovie(
  { movie }: Props,
  { navigation }: NativeStackHeaderProps
) {
  const { id, title } = movie;

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
    console.log(setMovieDetailData);
  }

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}
