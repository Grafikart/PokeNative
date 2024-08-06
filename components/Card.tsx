import { StyleSheet, View, type ViewProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

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
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 8,
  },
});
