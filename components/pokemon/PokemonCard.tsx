import type { APIResult } from "@/hooks/useFetchQuery";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { getPokemonArtwork, getPokemonId } from "@/functions/pokemon";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Link } from "expo-router";

type Props = {
  id: string;
  name: string;
};

export function PokemonCard({ id, name }: Props) {
  return (
    <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild>
      <Pressable style={{ flex: 1 / 3 }}>
        <Card style={styles.card}>
          <ThemedText color="medium" variant="caption" style={styles.id}>
            #{id.padStart(3, "0")}
          </ThemedText>
          <Image
            source={{ uri: getPokemonArtwork(id) }}
            width={72}
            height={72}
          />
          <ThemedText variant="body3">{name}</ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  id: {
    alignSelf: "flex-end",
  },
});
