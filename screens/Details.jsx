import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { myColors } from "../../../utils/MyColors";
import { images } from "../../../constants";
import { FONTFAMILY } from "@/theme";
import { useRouter } from "expo-router";

const productImages = [images.apple, images.apple2, images.apple3];

const router = useRouter();

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <View style={styles.screen}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View style={styles.imageSection}>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={28} color="#181725" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="share" size={24} color="#181725" />
            </TouchableOpacity>
          </View>

          <Swiper
            autoplay
            dotColor="#ccc"
            activeDotColor={myColors.primary}
            showsButtons={false}
            height={250}
            paginationStyle={{
              bottom: -10,
            }}
            dotStyle={{
              backgroundColor: "#ccc",
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
            }}
            activeDotStyle={{
              backgroundColor: myColors.primary,
              width: 20,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
            }}
          >
            {productImages.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={styles.image}
                resizeMode="contain"
              />
            ))}
          </Swiper>
        </View>

        <View style={styles.content}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.title}>Naturel Red Apple</Text>
              <Text style={styles.subtitle}>1kg, Price</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setIsFavorite(true);
              }}
            >
              <MaterialIcons
                name={isFavorite ? "favorite" : "favorite-border"}
                size={24}
                color={isFavorite ? "red" : "#181725"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rowBetween}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decreaseQuantity}
              >
                <MaterialIcons
                  name="remove"
                  size={20}
                  color={myColors.primary}
                />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={increaseQuantity}
              >
                <MaterialIcons name="add" size={20} color={myColors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>${(4.99 * quantity).toFixed(2)}</Text>
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              style={styles.detailsHeader}
              onPress={toggleDetails}
            >
              <Text style={styles.sectionTitle}>Product Detail</Text>
              <MaterialIcons
                name={
                  showDetails ? "keyboard-arrow-down" : "keyboard-arrow-right"
                }
                size={24}
                color="#181725"
              />
            </TouchableOpacity>
            {showDetails && (
              <Text style={styles.detailsText}>
                Apples Are Nutritious. Apples May Be Good For Weight Loss.
                Apples May Be Good For Your Heart. As Part Of A Healthful And
                Varied Diet.
              </Text>
            )}
          </View>

          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Nutritions</Text>
            <View style={styles.nutritionBox}>
              <Text style={styles.nutritionText}>100gr</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#181725"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add To Basket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: myColors.secondary,
  },
  imageSection: {
    backgroundColor: "#F2F3F2",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerIcons: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 220,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 24,
    color: myColors.third,
  },
  subtitle: {
    fontFamily: FONTFAMILY.lexend_regular,
    color: myColors.gray,
    marginTop: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: myColors.lightGray,
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontFamily: FONTFAMILY.lexend_medium,
    fontSize: 16,
  },
  price: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 20,
    color: myColors.primary,
  },
  section: {
    marginTop: 10,
    marginBottom: 20,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  sectionTitle: {
    fontFamily: FONTFAMILY.lexend_medium,
    fontSize: 16,
    color: "#181725",
  },
  description: {
    fontFamily: FONTFAMILY.lexend_regular,
    color: myColors.gray,
    marginTop: 8,
    lineHeight: 20,
  },
  nutritionBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: myColors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  nutritionText: {
    fontFamily: FONTFAMILY.lexend_regular,
    marginRight: 5,
    color: myColors.third,
  },
  addButton: {
    backgroundColor: myColors.primary,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: myColors.secondary,
    fontFamily: FONTFAMILY.lexend_medium,
    fontSize: 16,
  },
});
