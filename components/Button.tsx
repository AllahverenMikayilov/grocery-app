import { FONTFAMILY } from '@/theme/index';
import { Pressable, StyleSheet, Text,TextStyle, View, ViewStyle } from 'react-native'

interface ButtonProps {
    onPress?: (e: any) => void;
    text: string;
    buttonStyles?: ViewStyle;
    textStyles?: TextStyle;
    icon?: React.ReactNode;
    disabled?: boolean;
  }
export default function Button({text, textStyles, buttonStyles, onPress,icon,disabled}: ButtonProps) {
  return (
    <Pressable onPress={onPress} style={[styles.container, buttonStyles]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
    <Text style={[styles.text, textStyles]}>{text}</Text>
  </Pressable>
  )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#6CC51D",
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal:16,
        marginTop:20
      },
      text: {
        fontFamily:FONTFAMILY.lexend_bold,
        color: "white",
        fontSize: 16,
      },
      iconContainer: {
        marginRight: 8,
      },
})