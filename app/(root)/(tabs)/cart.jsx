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
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

import { myColors } from "../../../utils/MyColors";
import { FONTFAMILY } from "@/theme";
import { images } from "../../../constants";
import { router } from "expo-router";
import {
  getCartItems,
  removeFromCart,
  setCartItems as _setCartItems,
  clearItems,
} from "../../../utils/cartStorage"; // adjust path

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["100%", 300], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("Bottom sheet index:", index);
    // setIsBottomSheetVisible(index === 0);
  }, []);

  const openBottomSheet = useCallback(() => {
    console.log("Opening bottom sheet...");
    setIsBottomSheetVisible(true);
    bottomSheetRef.current?.present();
  }, []);

  const closeBottomSheet = useCallback(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
    setIsBottomSheetVisible(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const items = await getCartItems();
        setCartItems(items);
      })();
    }, [])
  );

  const updateQuantity = async (id, increment) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
            }
          : item
      );
      setCartItems(updated);
      _setCartItems(updated); // update AsyncStorage
      return updated;
    });
  };

  const removeItem = async (id) => {
    await removeFromCart(id);
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      setCartItems(updated);
      _setCartItems(updated); // update AsyncStorage
      return updated;
    });
  };
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Cart</Text>
          </View>

          {/* Cart Items */}
          <ScrollView
            style={styles.cartList}
            showsVerticalScrollIndicator={false}
          >
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemUnit}>{item.unit}, Price</Text>

                  <View style={styles.itemActions}>
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, false)}
                        style={styles.quantityButton}
                      >
                        <MaterialIcons
                          name="remove"
                          size={20}
                          color={myColors.primary}
                        />
                      </TouchableOpacity>

                      <Text style={styles.quantityText}>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, true)}
                        style={styles.quantityButton}
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
                  onPress={() => removeItem(item.id)}
                  style={styles.removeButton}
                >
                  <MaterialIcons name="close" size={24} color="#B3B3B3" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Checkout Button */}
          <View style={styles.checkoutContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={openBottomSheet}
            >
              <Text style={styles.checkoutText}>Go to Checkout</Text>
              <View style={styles.totalContainer}>
                <Text style={styles.totalPrice}>${getTotalPrice()}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <BottomSheetModal
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetIndicator}
            animateOnMount={true}
            snapPoints={snapPoints}
          >
            <BottomSheetView style={styles.sheetContainer}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Checkout</Text>
                <TouchableOpacity
                  onPress={closeBottomSheet}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <MaterialIcons name="close" size={24} color="#181725" />
                </TouchableOpacity>
              </View>

              <View style={styles.sheetContent}>
                <View style={styles.sheetRow}>
                  <Text style={styles.sheetLabel}>Delivery</Text>
                  <Text style={styles.sheetValue}>-</Text>
                </View>

                <View style={styles.sheetRow}>
                  <Text style={styles.sheetLabel}>Total Cost</Text>
                  <View style={styles.sheetTotalContainer}>
                    <Text style={styles.sheetTotal}>${getTotalPrice()}</Text>
                    <MaterialIcons
                      name="chevron-right"
                      size={24}
                      color="#181725"
                    />
                  </View>
                </View>

                <Text style={styles.sheetTerms}>
                  By placing an order you agree to our{" "}
                  <Text style={styles.sheetTermsBold}>Terms</Text> And{" "}
                  <Text style={styles.sheetTermsBold}>Conditions</Text>
                </Text>

                <TouchableOpacity
                  style={styles.placeOrderButton}
                  onPress={() => {
                    if (cartItems.length) {
                      router.push("/(screens)/OrderAccepted");
                      clearItems();
                      return;
                    }
                    Alert.alert("Bos sebet!");
                  }}
                >
                  <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutText: {
    color: "#FFF",
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
    color: "#FFF",
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_semibold,
  },

  bottomSheetBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheetIndicator: {
    backgroundColor: "#E2E2E2",
    width: 60,
    height: 4,
    borderRadius: 2,
    marginTop: 8,
  },
  sheetContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  sheetTitle: {
    fontSize: 24,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
  },
  sheetContent: {
    paddingTop: 20,
    // flex: 1,
  },
  sheetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  sheetLabel: {
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_regular,
    color: "#7C7C7C",
    marginBottom: 20,
  },
  sheetValue: {
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_medium,
    color: "#181725",
  },
  sheetTotalContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sheetTotal: {
    fontSize: 24,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
    marginRight: 4,
  },
  sheetTerms: {
    fontSize: 14,
    fontFamily: FONTFAMILY.lexend_regular,
    color: "#7C7C7C",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  sheetTermsBold: {
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
  },
  placeOrderButton: {
    backgroundColor: myColors.primary,
    borderRadius: 19,
    paddingVertical: 20,
    marginBottom: Platform.OS === "ios" ? 34 : 20,
  },
  placeOrderText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
    textAlign: "center",
  },
});
