import { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Voci from '../models/voci';

interface VociDetailProps {
    initialVoci?: Voci;
    onSave: (voci: Voci) => void;
    onCancel?: () => void;
    onDelete?: () => void;
}

export default function VociDetail({ initialVoci, onSave, onCancel, onDelete }: VociDetailProps) {
    const [term, setTerm] = useState('');
    const [translation, setTranslation] = useState('');

    useEffect(() => {
        if (initialVoci) {
            setTerm(initialVoci.term);
            setTranslation(initialVoci.translation);
        }
    }, [initialVoci]);

    function handleSubmit() {
        if (term.trim() === '' || translation.trim() === '') {
            Alert.alert('Bitte füllen Sie beide Felder aus.');
            return;
        }
        const newVoci: Voci = { term, translation };
        onSave(newVoci);
        setTerm('');
        setTranslation('');
    }

    function handleDelete() {
        Alert.alert(
            'Löschen bestätigen',
            'Möchten Sie diese Vokabel wirklich löschen?',
            [
                {
                    text: 'Abbrechen',
                    style: 'cancel',
                },
                {
                    text: 'Löschen',
                    style: 'destructive',
                    onPress: () => {
                        if (onDelete) {
                            onDelete();
                        }
                    },
                },
            ]
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
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
                <View style={styles.buttonContainer}>
                    <Button title="Speichern" onPress={handleSubmit} />
                    {onCancel && <Button title="Abbrechen" color="#888" onPress={onCancel} />}
                    {onDelete && <Button title="Löschen" color="red" onPress={onDelete} />}
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
    },
    buttonContainer: {
        marginTop: 16,
        gap: 10,
    },
});

