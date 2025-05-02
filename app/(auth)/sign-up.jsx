import { useState } from "react";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import Input from "@/components/Input";
import { images } from "@/constants";
import { FONTFAMILY } from "@/theme/index";
import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  SafeAreaView
} from "react-native";
export default function SignIn() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handlePress = () => {
    router.push("/(root)/(tabs)/home");
  };

  const handleGoogleSignIn = () => {
    console.log("Google ilə daxil olundu!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/(auth)/sign-in")}
        style={styles.backButton}
      >
        <Image source={images.backArrow} style={styles.image} />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Image source={images.icon} style={styles.logo} />
        <View style={styles.inputsContainer}>
          <Input
            autofocus={true}
            placeholder="Ad və soyadınızı daxil edin"
            icon="person"
            value={fullName}
            onChangeText={setFullName}
          />
          <Input
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

        <Button
          text="Qeydiyyatdan keç"
          onPress={handlePress}
          disabled={!fullName || !email || !password}
        />

        <TouchableOpacity onPress={() => console.log("Şifrə bərpası")}>
          <Text style={styles.textForgot}>Şifrəni unutmusan?</Text>
        </TouchableOpacity>

        <View style={styles.borderContainer}>
          <View style={styles.border} />
          <Text style={styles.textOr}>ya da</Text>
          <View style={styles.border} />
        </View>

        <Button
          text="Google ilə davam et"
          textStyles={styles.textGoogle}
          buttonStyles={styles.buttonGoogle}
          icon={<Image source={images.google} style={styles.icon} />}
          onPress={handleGoogleSignIn}
        />

        <View style={styles.accountContainer}>
          <Text style={styles.account}>Artıq hesabınız var?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/sign-in")}>
            <Text style={styles.register}>Daxil ol</Text>
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
  scrollContent: {
    paddingBottom: 40,
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
  inputsContainer: {
    gap: 16,
    marginBottom: 8,
  },
  checkContainer: {
    flexDirection: "row",
    marginVertical: 16,
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
    marginVertical: 16,
  },
  borderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  textOr: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 14,
    color: "#616161",
    marginHorizontal: 12,
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
    borderRadius: 12,
    backgroundColor: "white",
    paddingVertical: 16,
  },
  textGoogle: {
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 16,
    color: "#3F3F3F",
    marginLeft: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  accountContainer: {
    flexDirection: "row",
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: 4,
  },
});
