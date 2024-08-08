import { StyleSheet, View, type ViewProps } from "react-native";
import { Children } from "react";
import { Colors } from "@/constants/Colors";

type Props = ViewProps & {
  separator?: boolean;
};

export function Row({ style, separator, ...rest }: Props) {
  return <View style={[styles.row, style]} {...rest} />;
}

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
