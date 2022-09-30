import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProps } from "../types";

export default function Play() {
  const route = useRoute();
  const navigation = useNavigation<NavigationProps>();
  return (
    <View>
      <Text>Play</Text>
    </View>
  );
}
