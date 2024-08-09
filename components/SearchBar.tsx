import { Image, Pressable, StyleSheet, TextInput } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Row } from "@/components/layout/Row";

type Props = {
  search: string;
  onChange: (s: string) => void;
};

export function SearchBar({ search, onChange }: Props) {
  const hasSearch = search !== "";
  const emptySearch = () => {
    onChange("");
  };
  const colors = useThemeColors();
  return (
    <Row style={[styles.wrapper, { backgroundColor: colors.gray.white }]}>
      <Image
        source={require("@/assets/images/search.png")}
        width={24}
        height={24}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={search}
        placeholder="Search"
      />
      {hasSearch && (
        <Pressable onPress={emptySearch}>
          <Image
            source={require("@/assets/images/close.png")}
            width={24}
            height={24}
            style={styles.icon}
          />
        </Pressable>
      )}
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    height: 32,
    gap: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 16,
    fontSize: 10,
    lineHeight: 16,
  },
  icon: {
    flex: 0,
  },
});
