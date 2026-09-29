import { Text, StyleSheet, TouchableOpacity, Image, View } from "react-native";
import Voci from "../models/voci";
import { useRouter } from "expo-router";

export default function VociItem({ voci }: { voci: Voci }) {
  const router = useRouter();

  function handlePress() {
    router.push(`/editVoci?term=${encodeURIComponent(voci.term)}`);
  }

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
      {/* Links: Bild oder Platzhalter */}
      {voci.imageUri ? (
        <Image style={styles.picture} source={{ uri: voci.imageUri }} />
      ) : (
        <View style={[styles.picture, styles.placeholder]}>
          <Text style={styles.placeholderText}>Kein Bild</Text>
        </View>
      )}

      {/* Rechts: Term und Translation untereinander */}
      <View style={styles.textContainer}>
        <Text style={styles.term}>{voci.term}</Text>
        <Text style={styles.translation}>{voci.translation}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
  },
  picture: {
    height: 60,
    width: 60,
    borderRadius: 8,
  },
  placeholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#888',
  },
  textContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  term: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  translation: {
    fontSize: 14,
    color: "#666",
  },
});