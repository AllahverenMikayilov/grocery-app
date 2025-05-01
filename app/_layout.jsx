import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from "react-native";
import { enableScreens } from "react-native-screens";

// Enable screens
enableScreens();

// Ignore specific warnings
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
]);

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Lexend-Bold": require("../assets/fonts/Lexend-Bold.ttf"),
    "Lexend-ExtraBold": require("../assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-ExtraLight": require("../assets/fonts/Lexend-ExtraLight.ttf"),
    "Lexend-Light": require("../assets/fonts/Lexend-Light.ttf"),
    "Lexend-Medium": require("../assets/fonts/Lexend-Medium.ttf"),
    Lexend: require("../assets/fonts/Lexend-Regular.ttf"),
    "Lexend-SemiBold": require("../assets/fonts/Lexend-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(root)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(screens)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
