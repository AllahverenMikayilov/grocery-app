import { Image, StyleSheet, Text, View } from "react-native";
import { myColors } from "../../utils/MyColors";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import { FONTFAMILY } from "@/theme/index";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("welcome");
    }, 2000);
    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.img}>
        <Image source={images.icon} style={styles.icon} />
        <View>
          <Text style={styles.txt}>nectar</Text>
          <Text style={styles.title}>online groceries</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.primary,
  },
  img: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    width: 55,
    height: 66,
    tintColor:myColors.secondary,
  },
  txt: {
    fontFamily: FONTFAMILY.lexend_bold,
    fontSize: 55,
    color: myColors.secondary,
  },
  title: {
    fontFamily: FONTFAMILY.lexend_light,
    color: myColors.secondary,
    fontSize: 15,
    textAlign: "center",
    letterSpacing: 4,
    marginTop: -8,
  },
});

