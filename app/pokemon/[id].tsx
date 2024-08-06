import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { getPokemonArtwork, getPokemonNumber } from "@/functions/pokemon";

export default function PokemonScreen() {
  const { id } = useLocalSearchParams();
  const colors = useThemeColors();

  if (Array.isArray(id)) {
    return <View>Error</View>;
  }

  const { data: pokemon } = useFetchQuery("/pokemon/:id", { id: id });
  const mainType = pokemon?.types?.[0]["type"]["name"];
  const bgColor =
    mainType && mainType in colors.type ? colors.type[mainType] : colors.tint;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/arrow_back.png")}
          width={32}
          height={32}
        />
        <ThemedText
          color="white"
          variant="headline"
          style={{ textTransform: "capitalize" }}
        >
          {pokemon?.name}
        </ThemedText>
        {pokemon?.id && (
          <ThemedText
            variant="subtitle2"
            color="white"
            style={{ marginLeft: "auto" }}
          >
            {getPokemonNumber(pokemon?.id)}
          </ThemedText>
        )}
      </View>
      <View style={styles.body}>
        <View style={styles.imagePlaceholder}>
          {pokemon?.id ? (
            <Image
              source={{ uri: getPokemonArtwork(id) }}
              width={200}
              height={200}
            />
          ) : (
            <ActivityIndicator color={colors.tint} size="large" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const debug = {
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 2,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  body: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "red",
  },
  header: {
    flex: 0,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  headerActions: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    justifyContent: "center",
  },
});
