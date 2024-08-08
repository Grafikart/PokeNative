import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useFocusEffect } from "expo-router";
import { MotiView } from "moti";

const ColorContext = createContext({
  setBackground: (color: string) => {},
});

export function ColoredView(props: PropsWithChildren) {
  const colors = useThemeColors();
  const [background, setBackground] = useState(colors.tint);

  return (
    <ColorContext.Provider value={{ setBackground }}>
      <MotiView
        style={[{ flex: 1 }]}
        animate={{ backgroundColor: background }}
        {...props}
      />
    </ColorContext.Provider>
  );
}

export function useBackgroundColor(newColor: string | undefined) {
  const { setBackground } = useContext(ColorContext);
  useFocusEffect(
    useCallback(() => {
      if (newColor) {
        setBackground(newColor);
      }
    }, [newColor, setBackground]),
  );
}
