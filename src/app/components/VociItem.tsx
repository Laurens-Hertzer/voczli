import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Voci from "../models/voci";
import { useRouter } from "expo-router";

export default function VociItem({ voci }: { voci: Voci }) {
  const router = useRouter();

  function handlePress() {
    router.push(`/editVoci?term=${encodeURIComponent(voci.term)}`);
  }

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
      <Text style={styles.term}>{voci.term}</Text>
      <Text style={styles.translation}>{voci.translation}</Text>
    </TouchableOpacity>
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

    //Einheitliche Höhe für alle Items
    minHeight: 80,
    justifyContent: "center",

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
