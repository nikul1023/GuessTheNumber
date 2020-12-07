import React,{useEffect,useState} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,TouchableOpacity,View,Text,StyleSheet, Alert,FlatList} from "react-native"
import { Screen} from "../../components"
import { useNavigation ,useRoute} from "@react-navigation/native"
 import { useStores } from "../../models"
import { color,spacing } from "../../theme"
import { toJS } from "mobx"



export const PlayScreen = observer(function PlayScreen() {
  // Pull in one of our MST stores
   const { numberStore } = useStores()
  // OR
  // const rootStore = useStores()
  const navigation = useNavigation()
  const route = useRoute()
  const [random,setRandom] = useState()

 useEffect(() => {
   numberStore.setNumber1(1);
   numberStore.setNumber2(99);
   numberStore.getRandomNumber();
  
   if(numberStore.random === numberStore.chosen){
     navigation.navigate('over');
   }
 }, [])
   async function lower(ran) {
     
   
  
     if(ran < numberStore.chosen)
     {
       Alert.alert('Dont Lie !!')
     }
     else{
      await numberStore.setNumber2(ran);

      numberStore.addNumber(ran);
  
    await numberStore.getRandomNumber();
    
    if(numberStore.random === numberStore.chosen){
      navigation.navigate('over');
    }
  }
   }
   async function higher(ran) {
     //setNum1(ran);
     if(ran > numberStore.chosen)
     {
       Alert.alert('Dont Lie !!')
     }
     else{
     numberStore.setNumber1(ran);
  
       numberStore.addNumber(ran);
      numberStore.getRandomNumber();
      if(numberStore.random === numberStore.chosen){
        navigation.navigate('over');
      }
    }
   }
   const RenderItem = ({ number,index }) => {
    return (
      <View style= {styles.LIST_ITEM}>
        <Text>#{index+1}</Text>
        <Text>{number}</Text>
      </View>
    )
  
  }
  // Pull in navigation via hook
  // 
  return (
    <Screen style={styles.ROOT} >
    <View style={styles.LOWER}>
     <Text style={styles.TEXT}> Selected Number is {numberStore.random} </Text>
     <View style={styles.ROWVIEW}>
                <TouchableOpacity  onPress={() =>lower(numberStore.random)} style={styles.START_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Lower</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>higher(numberStore.random)} style={styles.START_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Higher</Text>
                </TouchableOpacity>
                </View>
     </View>
     <View style={styles.LIST}>
     <FlatList
                    inverted
                    data={toJS(numberStore.list)}
                    renderItem={({ item,index }) => <RenderItem number={item} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                   
                />
     </View>
    </Screen>
  )
})
const styles = StyleSheet.create({
  ROOT :{
    backgroundColor: color.palette.white,
    flex: 1,
    
   
   alignItems:"center",
  },
  
  BUTTON_TEXT :{
    color : color.palette.white,
    fontSize : 30,
  },
   ROWVIEW :{
     flexDirection:'row',
     justifyContent: 'space-around'
   },
   
   LOWER :{
     justifyContent:'center',
     width:'90%',
     paddingTop :15,
     paddingBottom : 15,
     marginTop:20,
     marginHorizontal:10,
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
   width:'30%',
   alignItems:"center",
   marginHorizontal:20,
   justifyContent:'center',
   borderRadius : 15
   },
   LIST_ITEM:{
     borderColor: color.palette.lightGrey,
     borderWidth : 3,
     justifyContent:'space-around',
     flexDirection:'row',
     marginTop:10,
     width : 250,

   },
   LIST :{
     height:450,
     alignItems:"center",
     marginTop:20,
    
     
   }
 });
 