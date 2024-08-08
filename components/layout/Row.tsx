import { StyleSheet, View, type ViewProps } from "react-native";
import { Children } from "react";
import { Colors } from "@/constants/Colors";

type Props = ViewProps & {
  separator?: boolean;
};

export function Row({ style, separator, ...rest }: Props) {
  if (separator) {
    rest.children = Children.toArray(rest.children)
      .flatMap((child) => [child, <View style={styles.separator} />])
      .slice(0, -1);
  }
  return <View style={[styles.row, style]} {...rest} />;
}

const styles = StyleSheet.create({
  row: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.light.gray.light,
  },
});
