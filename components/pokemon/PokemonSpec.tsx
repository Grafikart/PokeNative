import {
  Image,
  type ImageSourcePropType,
  StyleSheet,
  View,
  type ViewProps,
} from "react-native";
import React, { type PropsWithChildren } from "react";
import { ThemedText } from "@/components/ThemedText";

type Props = ViewProps & {
  spec?: string;
  name: string;
  image?: ImageSourcePropType;
};

export function PokemonSpec({
  style,
  spec,
  name,
  image,
  children,
  ...rest
}: Props) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children ?? (
        <View style={styles.row}>
          {image && <Image source={image} width={16} height={16} />}
          <ThemedText variant="body3">{spec}</ThemedText>
        </View>
      )}
      <ThemedText
        variant="caption"
        style={{ textAlign: "center" }}
        color="medium"
      >
        {name}
      </ThemedText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  row: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
