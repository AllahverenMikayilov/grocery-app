import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myColors } from "../../utils/MyColors";
import { FONTFAMILY } from "@/theme";
import { images } from "../../constants";
import { router } from "expo-router";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function OrderAccepted() {
  return (
    <View style={styles.container}>
      {/* Confetti and Checkmark */}
      <View style={styles.celebrationContainer}>
        {/* Confetti dots and lines */}
        <View style={styles.confetti1} />
        <View style={styles.confetti2} />
        <View style={styles.confetti3} />
        <View style={styles.confetti4} />
        <View style={styles.confetti5} />
        <View style={styles.confetti6} />
        <View style={styles.confetti7} />
        <View style={styles.confetti8} />
        <View style={styles.confetti9} />
        <View style={styles.confetti10} />
        <View style={styles.checkmarkCircle}>
          <MaterialIcons name="check" size={80} color="#fff" />
        </View>
      </View>
      {/* Texts */}
      <Text style={styles.title}>Your Order has been{"\n"}accepted</Text>
      <Text style={styles.subtitle}>
        Your items has been placed and is on its way to being processed
      </Text>
      {/* Buttons */}
      <TouchableOpacity
        style={styles.trackButton}
        onPress={() => router.push("/(root)/(tabs)/home")}
      >
        <Text style={styles.trackButtonText}>Track Order</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/(root)/(tabs)/home")}
      >
        <Text style={styles.backButtonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
}

const CONFETTI_SIZE = 12;
const CONFETTI_LINE = 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  celebrationContainer: {
    marginTop: 40,
    marginBottom: 32,
    alignItems: "center",
    justifyContent: "center",
    width: 180,
    height: 180,
  },
  checkmarkCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: myColors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    zIndex: 2,
  },
  // Confetti dots and lines
  confetti1: {
    position: "absolute",
    top: 10,
    left: 30,
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    borderRadius: CONFETTI_SIZE / 2,
    backgroundColor: "#FFD600",
    zIndex: 1,
  },
  confetti2: {
    position: "absolute",
    top: 20,
    right: 30,
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    borderRadius: CONFETTI_SIZE / 2,
    backgroundColor: "#FF5252",
    zIndex: 1,
  },
  confetti3: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    borderRadius: CONFETTI_SIZE / 2,
    backgroundColor: "#4CAF50",
    zIndex: 1,
  },
  confetti4: {
    position: "absolute",
    bottom: 10,
    right: 40,
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    borderRadius: CONFETTI_SIZE / 2,
    backgroundColor: "#3F51B5",
    zIndex: 1,
  },
  confetti5: {
    position: "absolute",
    top: 60,
    left: 0,
    width: CONFETTI_LINE,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF9800",
    zIndex: 1,
    transform: [{ rotate: "-20deg" }],
  },
  confetti6: {
    position: "absolute",
    top: 0,
    right: 60,
    width: CONFETTI_LINE,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#7C4DFF",
    zIndex: 1,
    transform: [{ rotate: "15deg" }],
  },
  confetti7: {
    position: "absolute",
    bottom: 60,
    left: 10,
    width: CONFETTI_LINE,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#00B8D4",
    zIndex: 1,
    transform: [{ rotate: "10deg" }],
  },
  confetti8: {
    position: "absolute",
    bottom: 0,
    right: 10,
    width: CONFETTI_LINE,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#FF4081",
    zIndex: 1,
    transform: [{ rotate: "-10deg" }],
  },
  confetti9: {
    position: "absolute",
    top: 30,
    right: 10,
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    borderRadius: CONFETTI_SIZE / 2,
    backgroundColor: "#00C853",
    zIndex: 1,
  },
  confetti10: {
    position: "absolute",
    bottom: 30,
    left: 60,
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE,
    borderRadius: CONFETTI_SIZE / 2,
    backgroundColor: "#536DFE",
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
    textAlign: "center",
    marginBottom: 16,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_regular,
    color: "#7C7C7C",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  trackButton: {
    backgroundColor: myColors.primary,
    borderRadius: 19,
    paddingVertical: 18,
    paddingHorizontal: 40,
    marginBottom: 18,
    width: SCREEN_WIDTH - 48,
    alignItems: "center",
  },
  trackButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
  },
  backButton: {
    backgroundColor: "transparent",
    borderRadius: 19,
    paddingVertical: 18,
    paddingHorizontal: 40,
    width: SCREEN_WIDTH - 48,
    alignItems: "center",
  },
  backButtonText: {
    color: "#181725",
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_semibold,
  },
});
