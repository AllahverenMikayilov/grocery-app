import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProductCard({ name, size, price, image, onAdd }) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.size}>{size}, Price</Text>
      <View style={styles.row}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    margin: 8,
    padding: 16,
    minWidth: 150,
    maxWidth: "48%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "#222",
  },
  size: {
    color: "#888",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 8,
  },
  price: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#222",
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    borderRadius: 16,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});