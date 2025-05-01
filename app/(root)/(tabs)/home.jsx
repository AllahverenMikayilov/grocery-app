import {
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { myColors } from "../../../utils/MyColors";
import HomeIcon from "../../../components/HomeIcon";
import HomeSearch from "../../../components/HomeSearch";
import HomeBanner from "../../../components/HomeBanner";
import ProductsTitle from "../../../components/ProductsTitle";
import ProductsCard from "../../../components/ProductsCard";
import { fruits, vegetables } from "../../../utils/Date";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <HomeIcon />
        <HomeSearch />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeBanner />
        <ProductsTitle
          title="Exclusive Offer"
          onPress={() => console.log("Exclusive")}
        />
        <ProductsCard data={fruits} />
        <ProductsTitle
          title="Best Selling"
          onPress={() => console.log("Best Selling")}
        />
        <ProductsCard data={vegetables} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.secondary,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 20,
    backgroundColor: myColors.secondary,
    zIndex: 1,
    paddingBottom: 10,
    paddingTop: 10,
    gap: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, 
    gap: 10,
  },
});


