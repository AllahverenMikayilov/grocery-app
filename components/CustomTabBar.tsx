// @ts-ignore
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const PRIMARY_COLOR = "#6CC51D";
const SECONDARY_COLOR = "#fff";
const TAB_ITEM_SIZE = 42;

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route:any, index:any) => {
        if (["_sitemap", "+not-found"].includes(route.name)) {
          return null;
        }

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const rTabItemViewStyle = useAnimatedStyle(() => {
          return {
            transform: [{ scale: withTiming(isFocused ? 1 : 0) }],
            opacity: withTiming(isFocused ? 1 : 0),
          };
        }, [isFocused]);

        const rIconStyle = useAnimatedStyle(() => {
          return {
            transform: [{ scale: withTiming(isFocused ? 1.1 : 1) }],
          };
        }, [isFocused]);

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Animated.View style={[rTabItemViewStyle, styles.tabItemView]} />
            <Animated.View style={rIconStyle}>
              {getIcon(route.name, isFocused ? PRIMARY_COLOR : SECONDARY_COLOR)}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  function getIcon(name: string, color: string) {
    switch (name) {
      case "search":
        return <MaterialIcons name="manage-search" size={20} color={color} />
      case "cart":
        return <Ionicons name="cart-outline" size={20} color={color} />
        case "favourite":
        return <Ionicons name="heart-outline" size={20} color={color} />
        case "profile":
            return <Ionicons name="person-outline" size={20} color={color} />;
      default:
        return <Ionicons name="storefront-outline" size={20} color={color} />
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
    backgroundColor: PRIMARY_COLOR,
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    width: TAB_ITEM_SIZE,
    height: TAB_ITEM_SIZE,
  },
  tabItemView: {
    position: "absolute",
    width: TAB_ITEM_SIZE,
    height: TAB_ITEM_SIZE,
    borderRadius: TAB_ITEM_SIZE / 2,
    backgroundColor: SECONDARY_COLOR,
  },
});

export default CustomTabBar;