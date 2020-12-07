import React,{useState,useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,Text,View,TextInput,StyleSheet,Alert, ColorPropType} from "react-native"
import { Screen} from "../../components"
import { useNavigation } from "@react-navigation/native"
 import { useStores } from "../../models"
import { color,typography,spacing } from "../../theme"
import { TouchableOpacity } from "react-native-gesture-handler"



export const NewgameScreen = observer(function NewgameScreen() {
  // Pull in one of our MST stores
   const { numberStore } = useStores()
  // OR
  // const rootStore = useStores()

  // Pull in navigation via hook
   const navigation = useNavigation()
  const [isValid,setIsValid] = useState(false);
  const [confirm,setConfirm] = useState(false);
  const [chosen,setChosen] = useState();
  const [number,setNumber] = useState();
  const resetNum = () => {
    setNumber(null);
    setChosen(null);
    setConfirm(false);
  }
  useEffect(() => {
   resetNum();
  },[numberStore.chosen])
  function confirmNum () {
    
    
     if(number > 0 && number <100)
     {
       
       setChosen(parseInt(number));
       setConfirm(true);
       
     }
     else{
       Alert.alert('Choose number between 1 to 99');
     }
    
    
  }
  const textInputChange = (val) => {
  
      
       setNumber(val);
        setIsValid(true);
    
 }
  const start=()=>{
    numberStore.setChosen(chosen);

    navigation.navigate('play');
  }

  return (
    <Screen style={styles.ROOT} preset="scroll">
     <View style={styles.UPPER}  >
       <Text style={styles.NAME}>Select a Number</Text>
     <TextInput 
                    placeholder="eg,35"
                    placeholderTextColor={color.palette.lightGrey}
                    style={styles.PLACEHOLDER}
                    value= {number}
                    keyboardType={'numeric'}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                   
                />
               <View style={styles.ROWVIEW}>
                <TouchableOpacity  onPress={()=>resetNum()} style={styles.SEARCH_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmNum} style={styles.SEARCH_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Confirm</Text>
                </TouchableOpacity>
                </View>
     </View>
     {confirm ?
     <View style={styles.LOWER}>
     <Text style={styles.TEXT}> Choosen Number is {chosen} </Text>
     <TouchableOpacity onPress={()=>start()} style={styles.START_BUTTON}>
                  <Text style={styles.BUTTON_TEXT}>Start  Game</Text>
                </TouchableOpacity>
     </View>
     : 
     null 
     }
    </Screen>
  )
})

const styles = StyleSheet.create({
  ROOT :{
    backgroundColor: color.palette.white,
    flex: 1,
    alignItems:'center',
  },
 NAME :{
  fontSize:24,
  fontWeight:'bold',
  marginBottom : spacing[4]
 },
 PLACEHOLDER :{
  backgroundColor: color.palette.white,
  height: 60,
  width:'30%',
  borderRadius:15,
  paddingLeft: spacing[5],
  justifyContent:'center',
  alignItems:"center",
  fontSize : 20,
  borderColor : color.line,
  borderWidth:4,
 },
 SEARCH_BUTTON :{
  backgroundColor: color.palette.lightGrey,
  marginTop:spacing[5],
  marginHorizontal:10,
  height:60,
  width:120,
  alignItems:"center",
  justifyContent:'center',
  borderRadius : 15
 },
 BUTTON_TEXT :{
   color : color.palette.white,
   fontSize : 30,
 },
  ROWVIEW :{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  UPPER :{
    justifyContent:'center',
    alignItems:"center",
    borderColor : color.palette.lighterGrey,
    borderWidth :3,
    borderRadius :17,
    paddingTop :10,
    paddingBottom:10,
    width:'90%'
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
  width:180,
  alignItems:"center",
  justifyContent:'center',
  borderRadius : 15
  },
});

