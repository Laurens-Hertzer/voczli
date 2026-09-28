import { useRouter } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import VociDetail from './components/VociDetail';
import {useVoci} from './context/vociContext';
import Voci from './models/voci';


export default function AddVociScreen() {
    const router = useRouter();
    const { addVoci } = useVoci();

    function handleAddVoci(newVoci: Voci) {
        addVoci(newVoci);
        router.back();
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <VociDetail onSave={handleAddVoci} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});

