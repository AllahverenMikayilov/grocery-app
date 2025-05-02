import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import Input from "@/components/Input";
import { images } from "@/constants";
import { FONTFAMILY } from "@/theme/index";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("mika@gmail.com");
  const [password, setPassword] = useState("123");
  const [rememberMe, setRememberMe] = useState(true);

  const handleGoogleSignIn = () => {
    console.log("Google ilə daxil olundu!");
  };

  useEffect(() => {
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPassword = await AsyncStorage.getItem("password");
        const savedRememberMe = await AsyncStorage.getItem("rememberMe");

        if (savedRememberMe === "true") {
          setEmail(savedEmail || "");
          setPassword(savedPassword || "");
          setRememberMe(true);
        }
      } catch (error) {
        console.error("Failed to load saved credentials", error);
      }
    };

    loadCredentials();
  }, []);
  const handlePress = async () => {
    try {
      if (rememberMe) {
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("password", password);
        await AsyncStorage.setItem("rememberMe", "true");
      } else {
        await AsyncStorage.removeItem("email");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("rememberMe");
      }

      router.push("/(root)/(tabs)/home");
    } catch (error) {
      console.error("Failed to save credentials", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/(auth)/welcome")}
        style={styles.backButton}
      >
        <Image source={images.backArrow} style={styles.image} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={images.icon} style={styles.logo} />
        <View>
          <Input
            autofocus={true}
            placeholder="Email ünvanınızı daxil edin"
            icon="mail"
            isEmail
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Şifrənizi daxil edin"
            icon="lock-closed"
            isPassword
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.checkContainer}>
          <CheckBox
            onPress={() => setRememberMe(!rememberMe)}
            isChecked={rememberMe}
          />
          <Text style={styles.textRemember}>Yadda saxla</Text>
        </View>
        <Button text="Daxil ol" onPress={handlePress} />
        <Text style={styles.textForgot}>Şifrəni unutmusan?</Text>
        <View style={styles.borderContainer}>
          <View style={styles.border} />
          <Text style={styles.textOr}>ya da</Text>
          <View style={styles.border} />
        </View>
        <View>
          <Button
            text="Google ilə davam et"
            textStyles={styles.textGoogle}
            buttonStyles={styles.buttonGoogle}
            icon={<Image source={images.google} style={styles.icon} />}
            onPress={handleGoogleSignIn}
          />
        </View>
        <View style={styles.accountContainer}>
          <Text style={styles.account}>Hesabınız yoxdur?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
            <Text style={styles.register}>Qeydiyyatdan keçin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  backButton: {
    height: 42,
    width: 42,
    marginTop: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#FFF",
    borderRadius: 12,
  },
  image: {
    width: 30,
    height: 16,
    tintColor: "#6CC51D",
  },
  logo: {
    width: 50,
    height: 60,
    alignSelf: "center",
    marginBottom: 30,
    resizeMode: "contain",
  },
  checkContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
  textRemember: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 14,
    marginLeft: 10,
    color: "#3F3F3F",
  },
  textForgot: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 16,
    color: "#6CC51D",
    textAlign: "center",
    marginTop: 20,
  },
  borderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    columnGap: 12,
  },
  textOr: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 18,
    color: "#616161",
  },
  border: {
    flex: 1,
    height: 1,
    backgroundColor: "#EEEEEE",
  },
  buttonGoogle: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 16,
    backgroundColor: "white",
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
  textGoogle: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 16,
    color: "#3F3F3F",
    paddingLeft: 5,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  accountContainer: {
    flexDirection: "row",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  account: {
    fontFamily: FONTFAMILY.lexend_regular,
    fontSize: 14,
    color: "#9E9E9E",
  },
  register: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 14,
    color: "#6CC51D",
  },
});
