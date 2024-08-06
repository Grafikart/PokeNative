import type { APIResult } from "@/hooks/useFetchQuery";
import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { getPokemonArtwork, getPokemonId } from "@/functions/pokemon";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";

type Props = {
  pokemon: APIResult<"/pokemon">;
};

export function PokemonCard({ pokemon }: Props) {
  const id = "#" + getPokemonId(pokemon.url).padStart(2, "0");
  return (
    <Card style={styles.card}>
      <ThemedText color="medium" variant="caption" style={styles.id}>
        {id}
      </ThemedText>
      <Image
        source={{ uri: getPokemonArtwork(pokemon.url) }}
        style={{ width: 72, height: 72 }}
      />
      <ThemedText variant="body3">{pokemon.name}</ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    flex: 1 / 3,
  },
  id: {
    alignSelf: "flex-end",
  },
});
