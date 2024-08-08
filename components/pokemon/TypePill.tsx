import { StyleSheet, View, type ViewProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";

type Props = ViewProps & {
  name: string;
};

export function TypePill({ name, style, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View
      style={[style, styles.pill, { backgroundColor: colors.type[name] }]}
      {...rest}
    >
      <ThemedText color="white" variant="subtitle3">
        {name}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flex: 0,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 8,
  },
});
