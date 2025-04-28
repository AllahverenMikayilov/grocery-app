import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { FONTFAMILY } from "@/theme";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { myColors } from "../utils/MyColors";
import { useRouter } from "expo-router";

export default function ProductsCard({ data }) {
  const router = useRouter();

  const goToDetails = (item) => {
    router.push({
      pathname: "/details",
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id?.toString() || item.name}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{ uri: item.img }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.txt}>{item.pieces} Priceg</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>$ {item.price}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => goToDetails(item)}
              >
                <FontAwesome
                  name="plus-square"
                  size={26}
                  color={myColors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 2,
  },
  card: {
    height: responsiveHeight(28),
    width: responsiveWidth(45),
    marginRight: 15,
    backgroundColor: myColors.secondary,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#E2E2E2",
  },
  imageWrapper: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  img: {
    height: 100,
    width: "100%",
    resizeMode: "contain",
  },
  details: {
    flex: 1,
    padding: 12,
    gap: 5,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
  },
  txt: {
    fontSize: 13,
    fontFamily: FONTFAMILY.lexend_medium,
    color: "#7C7C7C",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_bold,
    color: "#181725",
  },
});



