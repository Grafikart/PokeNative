import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColors } from "@/hooks/useThemeColors";

export type ThemedTextProps = TextProps & {
  color?: "medium" | "dark";
  variant?: "body3" | "caption";
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
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
});
