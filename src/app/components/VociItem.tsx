import {FlatList, Text, View, StyleSheet } from "react-native";
import Voci from "../models/voci";

export default function VociItem({ voci }: { voci: Voci }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.term}>{voci.term}</Text>
      <Text style={styles.translation}>{voci.translation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    // 1. Weisser Hintergrund
    backgroundColor: "#ffffff",

    // 2. Padding (Innenabstand)
    padding: 16,

    // 3. Abgerundete Ecken
    borderRadius: 12,

    // 4. Abstand zu anderen Items (Aussenabstand nach unten)
    marginBottom: 12,

    // 5. Schatten (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // 5. Schatten (Android)
    elevation: 3,

    width: "100%",
  },
  term: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  translation: {
    fontSize: 14,
    color: "#666",
  },
});
