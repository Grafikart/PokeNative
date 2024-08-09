import { Pressable, StyleSheet, View, type ViewProps } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
  checked: boolean;
  onChange?: (v: boolean) => void;
};

export function Radio({ checked, onChange }: Props) {
  const colors = useThemeColors();
  return (
    <Pressable onPress={onChange ? () => onChange(!checked) : undefined}>
      <View style={[styles.radio, { borderColor: colors.tint }]}>
        {checked && (
          <View style={[styles.radioInner, { backgroundColor: colors.tint }]} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: 14,
    height: 14,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    borderRadius: 6,
    width: 6,
    height: 6,
  },
});
