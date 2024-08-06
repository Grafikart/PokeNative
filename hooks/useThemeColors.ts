/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

export function useThemeColors() {
  //const theme = useColorScheme() ?? 'light';
  const theme = "light";
  return Colors[theme];
}
