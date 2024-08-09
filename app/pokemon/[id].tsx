import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { ThemedText } from "@/components/ThemedText";
import React, { memo, type PropsWithChildren, useMemo, useState } from "react";
import {
  formatHeight,
  formatWeight,
  getPokemonArtwork,
  getPokemonNumber,
} from "@/functions/pokemon";
import { RootView } from "@/components/layout/RootView";
import { Card } from "@/components/Card";
import { TypePill } from "@/components/pokemon/TypePill";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { Row } from "@/components/layout/Row";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { AnimatePresence } from "moti";
import { AppearFromBottom } from "@/components/animation/AppearFromBottom";
import { Audio } from "expo-av";
import { FadingImage } from "@/components/FadingImage";
import { type Route, TabView } from "react-native-tab-view";

type PokemonRoute = Route & {
  id: number;
  onNext: () => void;
  onPrevious: () => void;
};

const renderScene = ({ route }: { route: PokemonRoute }) => {
  return (
    <PokemonView
      id={route.id}
      onPrevious={route.onPrevious}
      onNext={route.onNext}
    />
  );
};

const lastPokemon = 151;
const firstPokemon = 1;

export default function PokemonScreen() {
  const [id, setId] = useState(
    parseInt((useLocalSearchParams() as { id: string }).id, 10),
  );

  const routeFor = (id: number) => {
    return {
      key: id.toString(),
      id: id,
      title: id.toString(),
      onNext: () => setIndex((i) => i + 1),
      onPrevious: () => setIndex((i) => i - 1),
    } satisfies PokemonRoute;
  };
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1);
  const routes = useMemo(
    () => [routeFor(id - 1), routeFor(id), routeFor(id + 1)],
    [id],
  );
  const onAnimationEnd = () => {
    if (
      index === 1 ||
      (index === 0 && id === firstPokemon + 1) ||
      (index === 2 && id === lastPokemon - 1)
    ) {
      return;
    }
    setId(id + (index - 1));
  };
  return (
    <TabView<PokemonRoute>
      renderTabBar={() => null}
      onIndexChange={setIndex}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      initialLayout={{ width: layout.width }}
      onSwipeEnd={onAnimationEnd}
    />
  );
}

type Props = { id: number; onPrevious: () => void; onNext: () => void };

const PokemonView = memo(function ({ id, onPrevious, onNext }: Props) {
  const colors = useThemeColors();

  if (Array.isArray(id)) {
    return <View>Error</View>;
  }

  const { data: pokemon } = useFetchQuery("/pokemon/:id", { id: id });
  const { data: species } = useFetchQuery("/pokemon-species/:id", { id: id });
  const mainType = pokemon?.types?.[0]["type"]["name"];
  const colorType = mainType ? (colors.type as any)[mainType] : colors.tint;
  const statsName = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];
  const bio = species?.flavor_text_entries
    ?.find(({ language }) => language.name === "en")
    ?.flavor_text.replaceAll("\n", " ");
  const specs =
    pokemon?.weight && pokemon?.moves && pokemon?.height
      ? [
          {
            name: "Weight",
            image: require("@/assets/images/weight.png"),
            spec: formatWeight(pokemon.weight),
          },
          {
            name: "Height",
            image: require("@/assets/images/rule.png"),
            spec: formatHeight(pokemon.height),
          },
          {
            name: "Moves",
            spec: pokemon?.moves
              .slice(0, 2)
              .map((m) => m.move.name)
              .join("\n"),
          },
        ]
      : [];

  const onCry = async () => {
    const cry = pokemon?.cries.latest;
    if (!cry) {
      return;
    }
    const { sound } = await Audio.Sound.createAsync(
      {
        uri: pokemon?.cries.latest,
      },
      { shouldPlay: true },
    );
    sound.playAsync();
  };

  return (
    <RootView style={styles.container} color={colorType}>
      {/* Header */}
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
          {/* Pokemon image and nav */}
          <Row style={styles.imageRow}>
            {id > firstPokemon ? (
              <Pressable onPress={onPrevious}>
                <Image
                  source={require("@/assets/images/chevron_left.png")}
                  width={24}
                  height={24}
                />
              </Pressable>
            ) : (
              <View style={{ width: 24 }}></View>
            )}
            <Pressable onPress={onCry} style={styles.image}>
              <FadingImage
                url={getPokemonArtwork(id)}
                width={200}
                height={200}
              />
            </Pressable>
            {id < lastPokemon ? (
              <Pressable onPress={onNext}>
                <Image
                  source={require("@/assets/images/chevron_right.png")}
                  width={24}
                  height={24}
                />
              </Pressable>
            ) : (
              <View style={{ width: 24 }}></View>
            )}
          </Row>

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
              {specs.length === 0 ? (
                <ActivityIndicator
                  color={colors.tint}
                  size="large"
                  style={{ alignSelf: "center" }}
                />
              ) : (
                <AnimatePresence>
                  {specs.map((spec, k) => (
                    <AppearFromBottom
                      style={
                        k > 0
                          ? {
                              borderLeftColor: colors.gray.light,
                              borderLeftWidth: 1,
                            }
                          : undefined
                      }
                      key={spec.name}
                      index={k}
                    >
                      <PokemonSpec {...spec} />
                    </AppearFromBottom>
                  ))}
                </AnimatePresence>
              )}
            </Row>
            <View style={styles.bio}>
              <ThemedText variant="body3">{bio}</ThemedText>
            </View>
            <TitleSection color={colorType}>Base stats</TitleSection>
            <View style={styles.stats}>
              {pokemon
                ? pokemon?.stats.map((stat) => (
                    <PokemonStat
                      key={stat.stat.name}
                      name={stat.stat.name}
                      value={stat.base_stat}
                      color={colorType}
                    />
                  ))
                : statsName.map((name) => (
                    <PokemonStat
                      key={name}
                      name={name}
                      value={0}
                      color={colorType}
                    />
                  ))}
            </View>
          </View>
        </Card>
      </View>
    </RootView>
  );
});

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
  imageRow: {
    position: "absolute",
    top: -140,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  image: {
    justifyContent: "center",
    alignSelf: "center",
  },
  pills: {
    flex: 0,
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  specs: {
    alignSelf: "stretch",
    height: 48,
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
