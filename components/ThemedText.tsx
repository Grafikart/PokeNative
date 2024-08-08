import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColors";
import type { Colors } from "@/constants/Colors";

export type ThemedTextProps = TextProps & {
  color?: keyof (typeof Colors)["light"]["gray"];
  variant?:
    | "body3"
    | "caption"
    | "headline"
    | "subtitle1"
    | "subtitle2"
    | "subtitle3";
};

export function ThemedText({
  color = "dark",
  variant = "body3",
  style,
  ...rest
}: ThemedTextProps) {
  const colors = useThemeColors();

  return (
    <Text
      style={[{ color: colors.gray[color] }, styles[variant], style]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
});
