import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ThemedText } from "@/components/ThemedText";
import { Card } from "@/components/Card";
import { Radio } from "@/components/form/Radio";
import { Row } from "@/components/layout/Row";
import { useRef, useState } from "react";

type Props = {
  sortKey: "id" | "name";
  onChange: (v: "id" | "name") => void;
};
const options = [
  {
    label: "Number",
    value: "id",
  },
  {
    label: "Name",
    value: "name",
  },
] as const;

export function SortButton({ sortKey, onChange }: Props) {
  const buttonRef = useRef<View>(null);
  const colors = useThemeColors();
  const [showPopup, setShowPopup] = useState(false);
  const [position, setPosition] = useState<null | {
    top: number;
    right: number;
  }>(null);
  const onOpen = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });
    });
    setShowPopup(true);
  };
  const onClose = () => {
    setShowPopup(false);
  };
  const isPopupVisible = Boolean(showPopup && position);

  return (
    <>
      <Pressable onPress={onOpen}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.gray.white }]}
        >
          <Image
            source={
              sortKey === "id"
                ? require("@/assets/images/tag.png")
                : require("@/assets/images/text_format.png")
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>

      <Modal
        transparent
        onRequestClose={onClose}
        visible={isPopupVisible}
        animationType="fade"
      >
        <Pressable style={styles.backdrop} onPress={onClose}></Pressable>
        <View
          style={[styles.popup, { backgroundColor: colors.tint }, position]}
        >
          <ThemedText style={styles.title} variant="subtitle2" color="white">
            Sort by:
          </ThemedText>
          <Card style={styles.card}>
            {options.map((option) => (
              <Pressable
                onPress={() => onChange(option.value)}
                key={option.label}
              >
                <Row gap={8}>
                  <Radio checked={sortKey === option.value} />
                  <ThemedText variant="body3">{option.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    zIndex: 6,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  popup: {
    position: "absolute",
    elevation: 2,
    gap: 16,
    padding: 4,
    paddingTop: 16,
    top: 0,
    right: 0,
    width: 113,
    borderRadius: 12,
  },
  title: {
    marginLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingLeft: 20,
    gap: 16,
    alignItems: "flex-start",
  },
});
