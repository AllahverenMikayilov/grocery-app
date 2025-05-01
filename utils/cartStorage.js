import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "CART_ITEMS";

export const getCartItems = async () => {
  const json = await AsyncStorage.getItem(CART_KEY);
  return json ? JSON.parse(json) : [];
};

export const setCartItems = async (items) => {
  await AsyncStorage.setItem(CART_KEY, JSON.stringify(items));
};
export const clearItems = async () => {
  await AsyncStorage.removeItem(CART_KEY);
};

export const addToCart = async (item) => {
  console.log(item);
  const cart = await getCartItems();
  console.log(cart);
  const existing = cart.find((i) => i.id === item.id);

  let newCart;
  if (existing) {
    newCart = cart.map((i) =>
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    newCart = [...cart, { ...item, quantity: 1 }];
  }
  await setCartItems(newCart);
  return newCart;
};

export const removeFromCart = async (itemId) => {
  const cart = await getCartItems();

  // Filter out the item by ID
  const newCart = cart.filter((item) => item.id !== itemId);

  // Save updated cart
  await setCartItems(newCart);

  return newCart;
};
