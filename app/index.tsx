import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PokemonCard } from "@/components/PokemonCard";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          style={styles.pokeball}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    paddingTop: 4,
  },
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
  pokeball: {},
});
