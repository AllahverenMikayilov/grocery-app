import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myColors } from "../../../utils/MyColors";
import { FONTFAMILY } from "@/theme";
import { images } from "../../../constants";

const initialCartItems = [
  {
    id: 1,
    name: "Bell Pepper Red",
    image: images.pepper,
    quantity: 1,
    price: 4.99,
    unit: "1kg",
  },
  {
    id: 2,
    name: "Egg Chicken Red",
    image: images.egg,
    quantity: 1,
    price: 1.99,
    unit: "4pcs",
  },
  {
    id: 3,
    name: "Organic Bananas",
    image: images.banana,
    quantity: 1,
    price: 3.0,
    unit: "12kg",
  },
  {
    id: 4,
    name: "Ginger",
    image: images.ginger,
    quantity: 1,
    price: 2.99,
    unit: "250gm",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, increment) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <ScrollView style={styles.cartList} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemUnit}>{item.unit}, Price</Text>
              </View>
              <View style={styles.itemActions}>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, false)}
                  >
                    <MaterialIcons
                      name="remove"
                      size={20}
                      color={myColors.primary}
                    />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, true)}
                  >
                    <MaterialIcons
                      name="add"
                      size={20}
                      color={myColors.primary}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeItem(item.id)}
            >
              <MaterialIcons name="close" size={24} color="#B3B3B3" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
  cartList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  itemImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_medium,
    color: "#181725",
    marginBottom: 5,
  },
  itemUnit: {
    fontSize: 14,
    fontFamily: FONTFAMILY.lexend_regular,
    color: "#7C7C7C",
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_medium,
    color: "#181725",
  },
  itemPrice: {
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: myColors.primary,
  },
  removeButton: {
    padding: 5,
    marginLeft: 10,
  },
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
  },
  totalContainer: {
    backgroundColor: "#489E67",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  totalPrice: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_semibold,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E2E2E2",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 12,
    fontFamily: FONTFAMILY.lexend_regular,
    color: "#181725",
    marginTop: 5,
  },
  activeTab: {
    color: myColors.primary,
  },
  activeTabText: {
    color: myColors.primary,
  },
});
