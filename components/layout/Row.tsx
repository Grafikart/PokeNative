import { StyleSheet, View, type ViewProps } from "react-native";
import { Children } from "react";
import { Colors } from "@/constants/Colors";

type Props = ViewProps & {
  separator?: boolean;
  gap?: number;
};

export function Row({ style, separator, gap, ...rest }: Props) {
  return (
    <View
      style={[styles.row, style, gap ? { gap: gap } : undefined]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
