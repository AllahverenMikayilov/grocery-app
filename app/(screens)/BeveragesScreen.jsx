import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BeveragesCard from "../../components/BeveragesCard";
import { addToCart } from "../../utils/cartStorage.js"; // adjust path as needed
import { beverages } from "../../utils/Date";

export default function BeveragesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.header}>Beverages</Text>
        <View></View>
      </View>
      <FlatList
        data={beverages}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <BeveragesCard
            name={item.name}
            size={item.size}
            price={item.price}
            image={item.image}
            onAdd={async () => {
              await addToCart(item);
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 12,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
});
