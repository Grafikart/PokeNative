import { StyleSheet, View, type ViewProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/layout/Row";
import { ThemedText } from "@/components/ThemedText";
import { ratioToPercent } from "@/functions/style";

type Props = {
  name: string;
  value: number;
  color: string;
};

export function PokemonStat({ name, value, color }: Props) {
  return (
    <Row separator style={styles.row}>
      <View style={styles.name}>
        <ThemedText variant="subtitle3" style={{ color }}>
          {statShortName(name)}
        </ThemedText>
      </View>
      <Row style={styles.stat}>
        <ThemedText variant="body3">
          {value.toString().padStart(3, "0")}
        </ThemedText>
        <View style={styles.bar}>
          <View
            style={[
              styles.barInner,
              { backgroundColor: color, width: ratioToPercent(value, 255) },
            ]}
          />
          <View
            style={[
              styles.barInner,
              styles.barBackground,
              { backgroundColor: color },
            ]}
          />
        </View>
      </Row>
    </Row>
  );
}

function statShortName(name: string): string {
  return name
    .replaceAll("special", "S")
    .replaceAll("-", "")
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("speed", "SPD")
    .toUpperCase();
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
  },
  name: {
    flex: 0,
    width: 32,
  },
  stat: {
    flex: 1,
    marginLeft: 4,
    gap: 8,
  },
  bar: {
    position: "relative",
    height: 4,
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  barInner: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
  },
  barBackground: {
    width: "100%",
    opacity: 0.24,
  },
});
