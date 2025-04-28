import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";


interface PaginationProps {
  data: any[];
  x: SharedValue<number>;
  screenWidth: number;
}

interface PaginationCompProps {
  i: number;
  x: SharedValue<number>;
  screenWidth: number;
}

const PaginationComp = ({ i, x, screenWidth }: PaginationCompProps) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
      [10, 20, 10],
      Extrapolation.CLAMP
    );

    const opacityAnimation = interpolate(
      x.value,
      [(i - 1) * screenWidth, i * screenWidth, (i + 1) * screenWidth],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });

  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export default function Pagination({ data, x, screenWidth }: PaginationProps) {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => (
        <PaginationComp key={i} i={i} x={x} screenWidth={screenWidth} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dots: {
    height: 10,
    backgroundColor: "#6CC51D",
    marginHorizontal: 10,
    borderRadius: 5,
  },
});