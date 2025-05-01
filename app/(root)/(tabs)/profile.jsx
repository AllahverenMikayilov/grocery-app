import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import {
  MaterialIcons,
  Feather,
  Ionicons,
  FontAwesome6,
  FontAwesome,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import { myColors } from "../../../utils/MyColors";
import { FONTFAMILY } from "@/theme";
import { images } from "../../../constants";
import { useFocusEffect, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(images.profile);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    AsyncStorage.setItem("profil-imag", JSON.stringify(profileImage));
  }, [profileImage]);

  const removeProfile = () => {
    AsyncStorage.removeItem("profil-imag");
    setProfileImage(null);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const imagee = await AsyncStorage.getItem("profil-imag");
        setProfileImage(JSON.parse(imagee));
      })();
    }, [])
  );

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Xəta", "Şəkil seçmək üçün icazə lazımdır");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Xəta", "Şəkil seçilərkən xəta baş verdi");
    }
  };

  const handleLogout = () => {
    router.push("/(auth)/sign-in");
    setShowLogoutModal(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View>
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  typeof profileImage === "string"
                    ? { uri: profileImage }
                    : profileImage
                }
                style={styles.avatar}
              />
              <View style={styles.editIconContainer}>
                <Feather name="camera" size={16} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.profileText}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.name}>Afsar Hossen</Text>
              <Feather
                name="edit-2"
                size={16}
                color={myColors.primary}
                style={{ marginLeft: 6 }}
              />
              <Pressable onPress={removeProfile}>
                <FontAwesome
                  name="trash"
                  size={18}
                  style={{ marginLeft: 10 }}
                  color={"red"}
                />
              </Pressable>
            </View>
            <Text style={styles.email}>lmshuvo97@gmail.com</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <MenuItem
            icon={<Feather name="shopping-bag" size={24} />}
            text="Orders"
          />
          <MenuItem
            icon={<FontAwesome6 name="contact-card" size={24} />}
            text="My Details"
          />
          <MenuItem
            icon={<Ionicons name="location-outline" size={24} />}
            text="Delivery Address"
          />
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setShowLogoutModal(true)}
      >
        <Feather
          name="log-out"
          size={24}
          color={myColors.primary}
          style={styles.logoutIcon}
        />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LottieView
              source={require("../../../assets/animations/logout.json")}
              autoPlay
              loop={false}
              style={{ width: 150, height: 150 }}
            />
            <Text style={styles.modalText}>Çıxmaq istədiyinizə əminsiniz?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleLogout}
                style={[
                  styles.modalButton,
                  { backgroundColor: myColors.primary },
                ]}
              >
                <Text style={styles.modalButtonText}>Bəli</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowLogoutModal(false)}
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
              >
                <Text style={styles.modalButtonText}>Xeyr</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const MenuItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.menuItem}>
    {icon}
    <Text style={styles.menuText}>{text}</Text>
    <MaterialIcons name="keyboard-arrow-right" size={24} color="#181725" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 50 : StatusBar.currentHeight + 10,
    justifyContent: "space-between",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: myColors.primary,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontFamily: FONTFAMILY.lexend_semibold,
    color: "#181725",
  },
  email: {
    fontSize: 14,
    fontFamily: FONTFAMILY.lexend_regular,
    color: "#7C7C7C",
    marginTop: 4,
  },
  menuSection: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F2F2F2",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_medium,
    color: "#181725",
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F2",
    borderRadius: 15,
    marginHorizontal: 20,
    paddingVertical: 18,
    justifyContent: "center",
    marginBottom: 100,
    position: "relative",
  },
  logoutIcon: {
    position: "absolute",
    left: 20,
  },
  logoutText: {
    color: myColors.primary,
    fontFamily: FONTFAMILY.lexend_medium,
    fontSize: 18,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontFamily: FONTFAMILY.lexend_medium,
    color: "#181725",
    textAlign: "center",
    marginVertical: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: FONTFAMILY.lexend_medium,
  },
});
