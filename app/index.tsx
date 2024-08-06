import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PokemonCard } from "@/components/PokemonCard";
import React from "react";
import { Card } from "@/components/Card";

export default function HomeScreen() {
  const { data } = useFetchQuery("/pokemon");
  const colors = useThemeColors();
  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  const pokemons = data.results;
  return (
    <View style={styles.container}>
      <Card elevation={1}></Card>
      <FlatList
        data={pokemons}
        numColumns={3}
        contentContainerStyle={[styles.list, styles.gap]}
        columnWrapperStyle={styles.gap}
        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
        keyExtractor={(pokemon) => pokemon.url}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gap: {
    gap: 8,
  },
  list: {
    backgroundColor: "#FFF",
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
});
