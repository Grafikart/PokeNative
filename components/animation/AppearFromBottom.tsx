import { MotiView } from "moti";
import type { PropsWithChildren } from "react";
import type { ViewProps } from "react-native";

const from = {
  opacity: 0,
  translateY: 50,
};

const to = {
  opacity: 1,
  translateY: 0,
};

export function AppearFromBottom({
  index,
  style,
  ...props
}: PropsWithChildren<ViewProps & { index?: number }>) {
  return (
    <MotiView
      style={[{ flex: 1 }, style]}
      from={from}
      animate={to}
      exit={from}
      transition={{
        delay: (index ?? 0) * 200,
      }}
      {...props}
    />
  );
}
