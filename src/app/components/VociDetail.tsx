import { useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Voci from '../models/voci';

interface VociDetailProps {
    onSave: (voci: Voci) => void;
}

export default function VociDetail({ onSave }: VociDetailProps) {
    const [term, setTerm] = useState('');
    const [translation, setTranslation] = useState('');

    function handleSubmit() {
        if (term === '' || translation === '') {
            Alert.alert('Bitte füllen Sie beide Felder aus.');
            return;
        }
        const newVoci: Voci = { term, translation };
        onSave(newVoci);
        setTerm('');
        setTranslation('');
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={setTerm}
                    value={term}
                    placeholder="Wort eingeben"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setTranslation}
                    value={translation}
                    placeholder="Übersetzung eingeben"
                />
                <Button
                    title="Speichern"
                    onPress={handleSubmit}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
