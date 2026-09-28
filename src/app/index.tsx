import { FlatList, Text, View, StyleSheet } from "react-native";
import Voci from "./models/voci";
import VociItem from "./components/VociItem";

export default function Index() {
  var vociList: Voci[] = [
    { term: "Haus", translation: "house" },
    { term: "Baum", translation: "tree" },
    { term: "Auto", translation: "car" },
  ];

  return (
    <View style={styles.containerheader}>
      <Text style={styles.title}>VocZLI</Text>
      <Text style={styles.subtitle}>Meine Vokabel-Lern-App</Text>
      <FlatList
        data={vociList}
        keyExtractor={(item) => item.term}
        renderItem={({ item }) => <VociItem voci={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerheader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
});