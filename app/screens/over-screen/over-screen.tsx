import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,Text,TouchableOpacity,View,StyleSheet} from "react-native"
import { Screen } from "../../components"
 import { useNavigation } from "@react-navigation/native"
 import { useStores } from "../../models"
import { color ,spacing} from "../../theme"



export const OverScreen = observer(function OverScreen() {
  // Pull in one of our MST stores
   const { numberStore } = useStores()
   const navigation = useNavigation()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook(
   const newgame =() =>{
     numberStore.clear();
     navigation.navigate('newgame');
   }
  
  return (
    <Screen style={styles.ROOT} preset="scroll">
      <View style={styles.LOWER}>
      <Text style={styles.TEXT}> Game Over  </Text>
     <Text style={styles.TEXT}> Choosen Number is {numberStore.chosen} </Text>
     <Text style={styles.TEXT}> Number of rounds {numberStore.list.length + 1} </Text>
     <TouchableOpacity onPress={()=>newgame()} style={styles.START_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Start new Game</Text>
                </TouchableOpacity>
     </View>
    </Screen>
  )
})
const styles = StyleSheet.create({
  ROOT:{
    backgroundColor: color.palette.white,
    flex: 1,
    alignItems:"center",
    },

  BUTTON_TEXT :{
    color : color.palette.white,
    fontSize : 30,
  },

   LOWER :{
     justifyContent:'center',
     width:'90%',
     paddingTop :15,
     paddingBottom : 15,
     marginTop:20,
     borderRadius:17,
     borderWidth:3,
     borderColor:color.palette.lightGrey,
     alignItems:"center"
   },
   TEXT :{
     color : color.palette.black,
     fontSize : 20,
     
   },
   START_BUTTON:{
   backgroundColor: color.palette.black,
   marginTop:spacing[7],
   height:60,
   width:'60%',
   alignItems:"center",
   justifyContent:'center',
   borderRadius : 15
   },
 });
 