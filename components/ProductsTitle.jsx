import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONTFAMILY } from "@/theme";
import { myColors } from "../utils/MyColors";
import { Ionicons } from "@expo/vector-icons";

export default function ProductsTitle({ title, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={styles.seeAllWrapper}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color={myColors.primary} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
  },
  seeAllWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    fontSize: 13,
    fontFamily: FONTFAMILY.lexend_medium,
    color: myColors.primary,
  },
});

