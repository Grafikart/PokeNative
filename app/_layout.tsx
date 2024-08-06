import { Stack } from 'expo-router';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="pokemon" />
        </Stack>
        </QueryClientProvider>
    );
}
