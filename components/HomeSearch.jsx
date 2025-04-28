import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";


export default function HomeSearch() {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#181B19" />
      <TextInput
        placeholder="Search Store"
        placeholderTextColor="#7C7C7C"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#181725",
    fontSize: 14,
  },
});
