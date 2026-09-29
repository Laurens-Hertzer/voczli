import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Voci from '../models/voci';
import ImagePickerButtonModule from './ImagePickerButton';

const ImagePickerButton = ImagePickerButtonModule as typeof ImagePickerButtonModule;
const deleteImageFromAppDirectory = (ImagePickerButtonModule as any)?.deleteImageFromAppDirectory ?? (async () => {});

interface VociDetailProps {
    initialVoci?: Voci;
    onSave: (voci: Voci) => void;
    onCancel?: () => void;
    onDelete?: () => void;
    onPicture?: () => void;
}

export default function VociDetail({ initialVoci, onSave, onCancel, onDelete }: VociDetailProps) {
    const [term, setTerm] = useState('');
    const [translation, setTranslation] = useState('');
    const [imageUri, setImageUri] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (initialVoci) {
            setTerm(initialVoci.term);
            setTranslation(initialVoci.translation);
            setImageUri(initialVoci.imageUri);
        }
    }, [initialVoci]);

    function handleSubmit() {
        if (term.trim() === '' || translation.trim() === '') {
            Alert.alert('Bitte füllen Sie beide Felder aus.');
            return;
        }
        const newVoci: Voci = { term, translation, imageUri };
        onSave(newVoci);
        setTerm('');
        setTranslation('');
        setImageUri(undefined);
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
                    onPress: async () => {
                        if (imageUri) {
                            await deleteImageFromAppDirectory(imageUri);
                        }
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
                <View style={styles.imageContainer}>
                    <ImagePickerButton
                        imageUri={imageUri}
                        onImageSelected={(uri) => setImageUri(uri)}
                    />
                </View>
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
                    {onDelete && <Button title="Löschen" color="red" onPress={handleDelete} />}
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
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
});