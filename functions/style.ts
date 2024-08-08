import type { DimensionValue } from "react-native";

export function ratioToPercent(value: number, max: number): DimensionValue {
  return `${(value / max) * 100}%`;
}
