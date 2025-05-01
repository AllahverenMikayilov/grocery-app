import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet, View } from "react-native";

export default function CategoryCard  ({ title, image, onPress, backgroundColor })  {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: backgroundColor || "#fff" }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    margin: 8,
    paddingVertical: 18,
    minWidth: 150,
    maxWidth: "48%",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    width: 70,
    height: 70,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    color: "#222",
  },
});



