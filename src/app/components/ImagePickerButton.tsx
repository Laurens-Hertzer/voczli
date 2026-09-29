import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';

interface ImagePickerButtonProps {
    imageUri?: string;
    onImageSelected: (uri: string) => void;
}

export default function ImagePickerButton({ imageUri, onImageSelected }: ImagePickerButtonProps) {

    // Aufgabe 6 & 7: Bild komprimieren und ins permanente App-Verzeichnis kopieren
    const processAndSaveImage = async (uri: string): Promise<string> => {
        // 1. Bild komprimieren (Aufgabe 7)
        const manipResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width: 800 } }], // Max 800px Breite
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        // 2. Permanenten Pfad generieren und kopieren (Aufgabe 6)
        const fileName = `${Date.now()}.jpg`;
        const permanentUri = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.copyAsync({
            from: manipResult.uri,
            to: permanentUri,
        });

        return permanentUri;
    };

    const handleTakePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Fehler', 'Kamera-Zugriff benötigt!');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0]?.uri) {
            const savedUri = await processAndSaveImage(result.assets[0].uri);
            onImageSelected(savedUri);
        }
    };

    const handlePickFromGallery = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Fehler', 'Galerie-Zugriff benötigt!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets[0]?.uri) {
            const savedUri = await processAndSaveImage(result.assets[0].uri);
            onImageSelected(savedUri);
        }
    };

    const handlePress = () => {
        Alert.alert(
            'Bild auswählen',
            'Wählen Sie eine Option:',
            [
                { text: 'Foto aufnehmen', onPress: handleTakePhoto },
                { text: 'Aus Galerie wählen', onPress: handlePickFromGallery },
                { text: 'Abbrechen', style: 'cancel' },
            ]
        );
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>Bild hinzufügen</Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        width: 120,
        height: 120,
        borderRadius: 12,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: '#666666',
        fontSize: 14,
        textAlign: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 12,
    },
});