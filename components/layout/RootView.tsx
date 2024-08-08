import type { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, type ViewProps } from "react-native";
import { MotiView } from "moti";
import { useThemeColors } from "@/hooks/useThemeColors";

export function RootView({
  children,
  style,
  color,
  ...rest
}: PropsWithChildren<ViewProps & { color?: string }>) {
  const colors = useThemeColors();
  return (
    <MotiView
      animate={{ backgroundColor: color ?? colors.tint }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={[styles.container, style]} {...rest}>
        {children}
      </SafeAreaView>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
});
