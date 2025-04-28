import { Image, StyleSheet, Text, View } from 'react-native'
import { images } from "../constants";
export default function HomeIcon() {
  return (
    <View style={styles.container}>
      <Image  source={images.icon} style={styles.icon}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center"
    },
    icon:{
        width:40,
        height:45
    }
})