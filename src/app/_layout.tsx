import { Stack } from 'expo-router';
import { VociProvider } from './context/vociContext';

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
          }}
        />
        <Stack.Screen
          name="learn"
          options={{
            title: "Vokabeln lernen",
          }}
        />
      </Stack>
    </VociProvider>
  );
}