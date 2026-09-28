import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text } from 'react-native';
import VociDetail from './components/VociDetail';
import { useVoci } from './context/vociContext';
import Voci from './models/voci';

export default function EditVociScreen() {
  const router = useRouter();
  const { term } = useLocalSearchParams<{ term: string }>();
  const { vociList, updateVoci, removeVoci } = useVoci();

  const currentVoci = vociList.find((v) => v.term === term);

  if (!currentVoci) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text>Vokabel nicht gefunden.</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  function handleSave(updatedVoci: Voci) {
    if (term) {
      updateVoci(term, updatedVoci);
      router.back();
    }
  }

  function handleCancel() {
    router.back();
  }

  function handleDelete() {
    if (term) {
      removeVoci(term);
      router.back();
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <VociDetail
          initialVoci={currentVoci}
          onSave={handleSave}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});