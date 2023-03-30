import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuInicial from './src/mainMenu/Menu';

export default function App() {
  // useEffect(()=>{
  //   async function loadFonts(){
  //     await Font.loadAsync({
  //       'Montserrat Regular': require("./assets/fonts/Montserrat-Regular.ttf"),
  //       'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  //       'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  //     }).then(res=>{
  //       console.log("FONTS LOADED!");
  //       setLoaded(true)
  //     }).catch(Err=>{
  //       setLoaded(true);
  //       console.log(Err);
  //     }); 
  //   }

  //   loadFonts();
  // },[])

  return (
    <MenuInicial />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
