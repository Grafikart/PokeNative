import type { ViewStyle } from "react-native";

export const Shadows = {
  dp2: {
    shadowOpacity: 0.2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    shadowRadius: 3,
  },
} satisfies Record<string, ViewStyle>;
