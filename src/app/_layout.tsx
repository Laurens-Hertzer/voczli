import { Stack, router } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { VociProvider } from './context/vociContext';
import { Ionicons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <VociProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#005380',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Meine Vokabeln",
            headerShown: true,
            headerRight: () => (
              <Pressable
                onPress={() => router.push('/addVoci')}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
              >
                <Ionicons name="add" size={24} color="#005380" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="learn"
          options={{
            title: "Vokabeln lernen",
          }}
        />
        <Stack.Screen
          name="addVoci"
          options={{
            title: "Neue Vokabel hinzufügen",
            presentation: 'modal',
          }}
        />
      </Stack>
    </VociProvider>
  );
}