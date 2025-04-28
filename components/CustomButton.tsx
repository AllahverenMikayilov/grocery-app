import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { images } from "@/constants";

interface CustomButtonProps {
  flatListRef: React.RefObject<any>;
  flatListIndex: { value: number };
  dataLength: number;
}

export default function CustomButton  ({
  flatListRef,
  flatListIndex,
  dataLength,
}:CustomButtonProps) {
  const router = useRouter();

  const buttonAnimationStyle = useAnimatedStyle(() => ({
    width:
      flatListIndex.value === dataLength - 1 ? withSpring(140) : withSpring(60),
    height: 60,
  }));

  const arrowAnimationStyle = useAnimatedStyle(() => ({
    width: 30,
    height: 30,
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1 ? withTiming(100) : withTiming(0),
      },
    ],
  }));

  const textAnimationStyle = useAnimatedStyle(() => ({
    opacity:
      flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
    transform: [
      {
        translateX:
          flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(-100),
      },
    ],
  }));

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (flatListIndex.value < dataLength - 1) {
          flatListRef.current?.scrollToIndex({ index: flatListIndex.value + 1 });
        } else {
          router.push("/(auth)/sign-in"); 
        }
      }}
    >
      <Animated.View style={[styles.container, buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton, textAnimationStyle]}>
          Get Started
        </Animated.Text>
        <Animated.Image
          source={images.rightArrow}
          style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6CC51D",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  arrow: {
    position: "absolute",
  },
  textButton: { color: "white", fontSize: 16, position: "absolute" },
});