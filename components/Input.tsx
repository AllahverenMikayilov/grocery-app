import { FONTFAMILY } from "@/theme/index";
import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInputProps,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = {
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  autofocus?: boolean;
  placeholder?: string;
  icon?: string;
  isPassword?: boolean;
  isEmail?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function Input({
  keyboardType = "default",
  autoCapitalize = "none",
  autofocus,
  placeholder,
  icon,
  isPassword = false,
  isEmail = false,
  value,
  onChangeText,
}: Props) {
  const [showPassword, setShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const resolvedKeyboardType = isEmail ? "email-address" : keyboardType;

  const containerDynamicStyle = {
    backgroundColor: isFocused ? "#EBFFD7" : "#FFF",
    borderColor: isFocused ? "#6CC51D" : "#EEE",
  };

  const iconColor = isFocused ? "#6CC51D" : "#9E9E9E";
  const textColor = isFocused ? "black" : "#9E9E9E";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, containerDynamicStyle]}
    >
      {icon && (
        <Ionicons name={icon} size={24} color={iconColor} style={styles.icon} />
      )}

      <TextInput
        autoCapitalize={autoCapitalize}
        autoFocus={autofocus}
        keyboardType={resolvedKeyboardType}
        placeholder={placeholder}
        placeholderTextColor="#9E9E9E"
        style={[styles.input, { color: textColor }]}
        secureTextEntry={isPassword ? showPassword : false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={onChangeText}
        selectionColor="#6CC51D"
        allowFontScaling={false}
        autoComplete={isEmail ? "email" : "off"}
        textContentType={isEmail ? "emailAddress" : "none"}
      />

      {isPassword && (
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: Platform.select({
      ios: 56,
      android: 52,
    }),
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONTFAMILY.lexend_semibold,
    fontSize: 16,
    paddingVertical: Platform.select({ ios: 8, android: 4 }),
    includeFontPadding: false,
  },
});