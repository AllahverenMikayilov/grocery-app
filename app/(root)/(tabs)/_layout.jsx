import { Tabs } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="seacrh" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="favorite" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
