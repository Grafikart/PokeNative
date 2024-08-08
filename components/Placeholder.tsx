import { StyleSheet, View, type ViewProps } from "react-native";

type Props = ViewProps & {};

export function TypePill({ style, ...rest }: Props) {
  return <View style={style} {...rest}></View>;
}

const styles = StyleSheet.create({});
