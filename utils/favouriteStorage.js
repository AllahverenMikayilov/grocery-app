import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVOURITE_KEY = "FAVOURITE_ITEMS";

export const getFavouriteItems = async () => {
  const json = await AsyncStorage.getItem(FAVOURITE_KEY);
  return json ? JSON.parse(json) : [];
};

export const setFavouriteItems = async (items) => {
  await AsyncStorage.setItem(FAVOURITE_KEY, JSON.stringify(items));
};

export const clearFavourites = async () => {
  await AsyncStorage.removeItem(FAVOURITE_KEY);
};

export const addToFavourites = async (item) => {
  const favs = await getFavouriteItems();
  const existing = favs.find((i) => i.id === item.id);
  let newFavs;
  if (existing) {
    newFavs = favs;
  } else {
    newFavs = [...favs, item];
  }
  await setFavouriteItems(newFavs);
  return newFavs;
};

export const removeFromFavourites = async (itemId) => {
  const favs = await getFavouriteItems();
  const newFavs = favs.filter((item) => item.id !== itemId);
  await setFavouriteItems(newFavs);
  return newFavs;
};
