import { useState, useEffect } from "react";
import { Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

interface CheckBoxProps {
  onPress: (isChecked: boolean) => void;
  isChecked?: boolean;
}

export default function CheckBox({ onPress, isChecked = false }: CheckBoxProps) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const handlePress = () => {
    const newValue = !checked;
    setChecked(newValue);
    onPress(newValue);
  };

  return (
    <Pressable onPress={handlePress} style={[styles.container, checked && styles.checked]}>
      {checked && <Ionicons name="checkmark" size={18} color="white" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderWidth: 3,
    borderColor: "#6CC51D",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  checked: {
    backgroundColor: "#6CC51D",
  },
});