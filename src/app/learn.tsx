import { Pressable, FlatList, Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Voci from "./models/voci";
import VociItem from "./components/VociItem";
import { vociList } from './index';
import { useState } from "react";


export default function LearnScreen() {

    const router = useRouter();

    const [currentIndex, setCurrentIndex] = useState(0);

    const [showTranslation, setShowTranslation] = useState(false);

    const vocabulary: Voci[] = vociList;

    const currentVoci = vocabulary[currentIndex]

    const letzterIndex = vocabulary.length;

    function onPressLearnMore() {
        if (currentIndex < letzterIndex - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowTranslation(false);
        } else {
            router.back();
        }
    }

    function onPressShowTranslation() {
        setShowTranslation(true);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.status}>{currentIndex + 1} / {letzterIndex}</Text>

            <View style={styles.item}>
                <Text style={styles.term}>{currentVoci.term}</Text>
                {showTranslation && (
                    <Text style={styles.translation}>{currentVoci.translation}</Text>
                )}
            </View>

            
            {!showTranslation && (
                <Pressable style={styles.button} onPress={onPressShowTranslation}>
                    <Text style={styles.buttonText}>Übersetzung zeigen</Text>
                </Pressable>
            )}

            {showTranslation && (
                <Pressable style={styles.button} onPress={onPressLearnMore}>
                    <Text style={styles.buttonText}>Weiter</Text>
                </Pressable>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    item: {
        height: "60%",
        width: "80%",
        borderRadius: 10,
        fontSize: 48,
        fontWeight: "bold",
        padding: 16,
        backgroundColor: "#ffffff",
        // 5. Schatten (iOS)
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,

        // 5. Schatten (Android)
        elevation: 9,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    term: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    translation: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
        fontSize: 14,
        color: "#666",
    },
    status: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#841584",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 16,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

