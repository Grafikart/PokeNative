import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ColoredView } from "@/components/layout/ColoredView";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ColoredView>
        <Stack
          screenOptions={{
            animation: "slide_from_right",
            animationDuration: 1000,
            contentStyle: {
              backgroundColor: "transparent",
            },
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="pokemon/[id]" />
        </Stack>
      </ColoredView>
    </QueryClientProvider>
  );
}
