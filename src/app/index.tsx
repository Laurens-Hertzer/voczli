import { Button, FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import Voci from "./models/voci";
import VociItem from "./components/VociItem";
import {useVoci} from "./context/vociContext";

export default function Index() {

  const router = useRouter();

  const { vociList } = useVoci();

  return (
    <View style={styles.container}>
    <View style={styles.containerheader}>
      <Link href="/learn">Learn</Link>
      <Text style={styles.title}>VocZLI</Text>
      <Text style={styles.subtitle}>Meine Vokabel-Lern-App</Text>
    </View>

    <FlatList
        data={vociList}
        keyExtractor={(item) => item.term}
        renderItem={({ item }) => <VociItem voci={item} />}
        style={styles.list}
    />

    <Pressable
          style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressed,
        ]}
        onPress={() => router.push('/learn')}
      >
        <AntDesign name="arrow-right" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerheader: {
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
  list: {
    width: "25%",
    alignSelf: "center",
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#005380",
    position: "absolute",
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",

        // 5. Schatten (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,

    // 5. Schatten (Android)
    elevation: 9,
  },
  fabPressed: {
    opacity: 0.7,
  },
});