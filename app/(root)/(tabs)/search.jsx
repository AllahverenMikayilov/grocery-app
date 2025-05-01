import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { categories } from "../../../utils/Date";
import CategoryCard from "../../../components/CategoryCard";
import { useRouter } from "expo-router";
import { useRef, useMemo, useState, useCallback } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

export default function ExploreScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%"], []);
  const openCategoriesModal = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);
  const closeCategoriesModal = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={styles.header}>Find Products</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={22}
              color="#888"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder="Search Store"
              style={styles.searchInput}
              placeholderTextColor="#888"
            />
          </View>
          <Pressable onPress={openCategoriesModal}>
            <Ionicons
              style={{ marginTop: 10 }}
              name="options-outline"
              size={26}
              color="#222"
            />
          </Pressable>
        </View>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.title}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <CategoryCard
              title={item.title}
              image={item.image}
              backgroundColor={item.backgroundColor}
              onPress={() => {
                if (item.title === "Beverages") {
                  router.push("/(screens)/BeveragesScreen");
                }
              }}
            />
          )}
        />
        {/* BottomSheetModal for Categories */}
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
          handleIndicatorStyle={{
            backgroundColor: "#E2E2E2",
            width: 60,
            height: 4,
            borderRadius: 2,
            marginTop: 8,
          }}
        >
          <BottomSheetView style={{ padding: 24 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              Select Category
            </Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.title}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
                onPress={() => setSelectedCategory(cat.title)}
              >
                <MaterialIcons
                  name={
                    selectedCategory === cat.title
                      ? "radio-button-checked"
                      : "radio-button-unchecked"
                  }
                  size={24}
                  color={selectedCategory === cat.title ? "#6CC51D" : "#888"}
                />
                <Text style={{ marginLeft: 12, fontSize: 16 }}>
                  {cat.title}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#6CC51D",
                borderRadius: 12,
                paddingVertical: 14,
                alignItems: "center",
              }}
              onPress={() => {
                closeCategoriesModal();
                router.push("/(screens)/BeveragesScreen");
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
    color: "#222",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 16,
    marginBottom: 18,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#222",
  },
});
