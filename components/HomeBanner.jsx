import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { images } from "../constants";
import { responsiveHeight } from "react-native-responsive-dimensions";

const { width } = Dimensions.get("window");

const bannerImages = [
  images.banner,
  images.banner2,
  images.banner3,
];

export default function HomeBanner() {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width - 30}
        height={responsiveHeight(18)}
        autoPlay={true}
        autoPlayInterval={3000}
        data={bannerImages}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} />
        )}
        style={styles.carousel}
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  carousel: {
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
});



