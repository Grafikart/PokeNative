import { StyleSheet, View, type ViewProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Shadows } from "@/constants/Shadow";

type Props = ViewProps & {
  elevation?: number;
};

export function Card({ elevation = 2, style, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View
      style={[styles.card, style, { backgroundColor: colors.gray.white }]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderRadius: 8,
    ...Shadows.dp2,
  },
});
