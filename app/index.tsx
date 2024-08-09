import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { RootView } from "@/components/layout/RootView";
import { getPokemonId } from "@/functions/pokemon";
import { SearchBar } from "@/components/SearchBar";
import { Row } from "@/components/layout/Row";
import { SortButton } from "@/components/SortButton";

export default function HomeScreen() {
  const [sortKey, setSortKey] = useState<"id" | "name">("id");
  const [search, setSearch] = useState("");
  const { data, fetchNextPage, isFetching } =
    useInfiniteFetchQuery("/pokemon?limit=21");
  const colors = useThemeColors();
  if (!data) {
    return (
      <RootView>
        <ActivityIndicator size="large" color={colors.tint} />
      </RootView>
    );
  }

  const pokemons = data.pages.flatMap((page) =>
    page.results.map((r) => ({ ...r, id: getPokemonId(r.url) })),
  );
  const filteredPokemons = [
    ...(search
      ? pokemons.filter(
          (pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
            pokemon.id.toString() === search,
        )
      : pokemons),
  ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

  const onEnd = () => {
    fetchNextPage();
  };

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
      <Row style={styles.searchBar}>
        <SearchBar search={search} onChange={setSearch} />
        <SortButton sortKey={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.wrapper}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          contentContainerStyle={[styles.list, styles.gap]}
          columnWrapperStyle={styles.gap}
          onEndReached={search ? undefined : onEnd}
          renderItem={({ item: pokemon }) => (
            <PokemonCard id={pokemon.id.toString()} name={pokemon.name} />
          )}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
          keyExtractor={(pokemon) => pokemon.id.toString()}
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
  searchBar: {
    gap: 16,
    marginBottom: 24,
  },
});
