import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { myColors } from "../../../utils/MyColors";
import { FONTFAMILY } from "@/theme";
import { images } from "../../../constants";
import { router } from "expo-router";
import {
  getFavouriteItems,
  removeFromFavourites,
  setFavouriteItems as _setFavouriteItems,
  clearFavourites,
} from "../../../utils/favouriteStorage";
import {
  addToCart,
  getCartItems,
  setCartItems,
} from "../../../utils/cartStorage";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Favourite() {
  const [favouriteItems, setFavouriteItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const items = await getFavouriteItems();
        setFavouriteItems(items);
      })();
    }, [])
  );

  const removeItem = async (id) => {
    await removeFromFavourites(id);
    setFavouriteItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      setFavouriteItems(updated);
      _setFavouriteItems(updated);
      return updated;
    });
  };

  const addAllToCart = async () => {
    const cart = await getCartItems();
    let newCart = [...cart];
    favouriteItems.forEach((fav) => {
      const existing = newCart.find((i) => i.id === fav.id);
      if (existing) {
        newCart = newCart.map((i) =>
          i.id === fav.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newCart.push({ ...fav, quantity: 1 });
      }
    });
    await setCartItems(newCart);
    clearFavourites();
    Alert.alert("All favourites added to cart!");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favourite</Text>
        </View>
        {/* Favourite Items */}
        <ScrollView
          style={styles.cartList}
          showsVerticalScrollIndicator={false}
        >
          {favouriteItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUnit}>{item.unit}, Price</Text>
              </View>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.removeButton}
              >
                <MaterialIcons name="close" size={24} color="#B3B3B3" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* Add All To Cart Button */}
        <View style={styles.checkoutContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={addAllToCart}
          >
            <Text style={styles.checkoutText}>Add All To Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight + 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
    textAlign: "center",
  },
  cartList: { paddingHorizontal: 20 },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  itemImage: { width: 70, height: 70, resizeMode: "contain" },
  itemDetails: { flex: 1, marginLeft: 15 },
  itemName: {
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_medium,
    color: "#181725",
  },
  itemUnit: {
    fontSize: 14,
    fontFamily: FONTFAMILY.lexend_regular,
    color: "#7C7C7C",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: myColors.primary,
    marginRight: 10,
  },
  removeButton: { padding: 5, marginLeft: 10 },
  checkoutContainer: {
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 90 : 85,
  },
  checkoutButton: {
    backgroundColor: myColors.primary,
    borderRadius: 19,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
  },
});
