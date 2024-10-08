import type { APIResult } from "@/hooks/useFetchQuery";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { getPokemonArtwork, getPokemonId } from "@/functions/pokemon";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

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
            #{id.toString().padStart(3, "0")}
          </ThemedText>
          <Image
            source={{ uri: getPokemonArtwork(id) }}
            width={72}
            height={72}
          />
          <ThemedText variant="body3">{name}</ThemedText>
          <View style={styles.shadow} />
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "relative",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 7,
    height: 44,
    zIndex: -1,
    backgroundColor: Colors.light.gray.background,
  },
});
