import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={{
          padding: 10,
          backgroundColor: "blue",
          flex: 1,
          alignItems: "stretch",
        }}
      >
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="pokemon/[id]" options={{ headerShown: false }} />
        </Stack>
      </View>
    </QueryClientProvider>
  );
}
