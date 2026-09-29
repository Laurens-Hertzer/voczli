import { Pressable, FlatList, Text, View, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import Voci from "./models/voci";
import VociItem from "./components/VociItem";
import { useState } from "react";
import { useVoci } from "./context/vociContext";


export default function LearnScreen() {

    const router = useRouter();

    const [currentIndex, setCurrentIndex] = useState(0);

    const [showTranslation, setShowTranslation] = useState(false);

    const { vociList } = useVoci();

    if (!vociList || vociList.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.status}>Keine Vokabeln vorhanden.</Text>
            </View>
        );
    }

    const currentVoci = vociList[currentIndex];
    const letzterIndex = vociList.length;

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
            <Text style={styles.status}>
                {currentIndex + 1} / {letzterIndex}
            </Text>

            <View style={styles.item}>
                <Image style={styles.picture} source={{ uri: currentVoci.imageUri }} />
                <Text style={styles.term}>{currentVoci.term}</Text>
                {showTranslation && (
                    <Text style={styles.translation}>{currentVoci?.translation}</Text>
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
    picture: {
        height: 200,
        width: 200,
        resizeMode: "cover",
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

