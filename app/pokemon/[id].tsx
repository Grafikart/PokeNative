import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { ThemedText } from "@/components/ThemedText";
import React, { type PropsWithChildren } from "react";
import {
  formatHeight,
  formatWeight,
  getPokemonArtwork,
  getPokemonNumber,
} from "@/functions/pokemon";
import { RootView } from "@/components/layout/RootView";
import { useBackgroundColor } from "@/components/layout/ColoredView";
import { Card } from "@/components/Card";
import { TypePill } from "@/components/pokemon/TypePill";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { Row } from "@/components/layout/Row";
import { PokemonStat } from "@/components/pokemon/PokemonStat";

export default function PokemonScreen() {
  const { id } = useLocalSearchParams();
  const colors = useThemeColors();

  if (Array.isArray(id)) {
    return <View>Error</View>;
  }

  const { data: pokemon } = useFetchQuery("/pokemon/:id", { id: id });
  const { data: species } = useFetchQuery("/pokemon-species/:id", { id: id });
  const mainType = pokemon?.types?.[0]["type"]["name"];
  const colorType = mainType ? (colors.type as any)[mainType] : undefined;

  useBackgroundColor(colorType);

  return (
    <RootView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={router.back}>
          <Image
            source={require("@/assets/images/arrow_back.png")}
            width={32}
            height={32}
          />
        </Pressable>
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
        <Image
          style={styles.pokeball}
          source={require("@/assets/images/pokeball-big.png")}
          width={208}
          height={208}
        />
        <Card style={styles.card}>
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
          <View style={styles.stack}>
            {/* Types */}
            <View style={styles.pills}>
              {pokemon?.types.map((type) => (
                <TypePill name={type.type.name} key={type.type.name} />
              ))}
            </View>

            {/* Specs */}
            <TitleSection color={colorType}>About</TitleSection>
            <Row style={styles.specs} separator>
              <PokemonSpec
                spec={formatWeight(pokemon?.weight)}
                name="Weight"
                image={require("@/assets/images/weight.png")}
              />
              <PokemonSpec
                spec={formatHeight(pokemon?.height)}
                name="Height"
                image={require("@/assets/images/rule.png")}
              />
              <PokemonSpec
                name="Moves"
                spec={pokemon?.moves
                  .slice(0, 2)
                  .map((m) => m.move.name)
                  .join("\n")}
              />
            </Row>
            <View style={styles.bio}>
              <ThemedText variant="body3">
                {species?.flavor_text_entries?.[0].flavor_text.replaceAll(
                  "\n",
                  " ",
                )}
              </ThemedText>
            </View>
            <TitleSection color={colorType}>Base stats</TitleSection>
            <View style={styles.stats}>
              {pokemon?.stats.map((stat) => (
                <PokemonStat
                  name={stat.stat.name}
                  value={stat.base_stat}
                  color={colorType}
                />
              ))}
            </View>
          </View>
        </Card>
      </View>
    </RootView>
  );
}

function TitleSection({
  color,
  children,
}: PropsWithChildren<{ color: string }>) {
  return (
    <ThemedText
      style={{ color: color, textAlign: "center" }}
      variant="subtitle1"
    >
      {children}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
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
  body: {
    flex: 0,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  pokeball: {
    position: "absolute",
    top: -80,
    right: 8,
  },
  card: {
    marginTop: 140,
    paddingTop: 60,
    padding: 20,
    zIndex: 2,
    alignItems: "stretch",
  },
  imagePlaceholder: {
    position: "absolute",
    top: -140,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
  },
  pills: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  specs: {
    alignSelf: "stretch",
  },
  stack: {
    flex: 0,
    gap: 16,
  },
  bio: {
    flex: 0,
    height: 60,
    justifyContent: "center",
  },
  stats: {
    alignSelf: "stretch",
  },
});
