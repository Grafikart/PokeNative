import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { RootView } from "@/components/layout/RootView";
import { useBackgroundColor } from "@/components/layout/ColoredView";

export default function HomeScreen() {
  const { data } = useFetchQuery("/pokemon");
  const colors = useThemeColors();
  useBackgroundColor(colors.tint);
  if (!data) {
    return (
      <RootView>
        <ActivityIndicator size="large" color={colors.tint} />
      </RootView>
    );
  }

  const pokemons = data.results;
  return (
    <RootView>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          width={24}
          height={24}
        />
        <ThemedText variant="headline" color="white">
          Pokédex
        </ThemedText>
      </View>
      <Card style={styles.wrapper}>
        <FlatList
          data={pokemons}
          numColumns={3}
          contentContainerStyle={[styles.list, styles.gap]}
          columnWrapperStyle={styles.gap}
          renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
          keyExtractor={(pokemon) => pokemon.url}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: 12,
    marginTop: 0,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  gap: {
    gap: 8,
  },
  wrapper: {
    flex: 1,
    alignItems: "stretch",
    overflow: "hidden",
  },
  list: {
    backgroundColor: "#FFF",
    padding: 12,
  },
});
