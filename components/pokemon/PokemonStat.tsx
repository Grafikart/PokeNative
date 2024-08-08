import { StyleSheet, View } from "react-native";
import { Row } from "@/components/layout/Row";
import { ThemedText } from "@/components/ThemedText";
import { MotiView } from "moti";

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
          <MotiView
            style={[styles.barInner, { backgroundColor: color }]}
            animate={{
              flex: value,
            }}
            transition={{
              type: "timing",
              duration: 1000,
            }}
          />
          <View
            style={[
              styles.barInner,
              styles.barBackground,
              { backgroundColor: color },
              { flex: 255 - value },
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
    flexDirection: "row",
    height: 4,
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  barInner: {
    flex: 1,
    top: 0,
    left: 0,
    height: "100%",
  },
  barBackground: {
    flex: 1,
    width: "100%",
    opacity: 0.24,
  },
});
