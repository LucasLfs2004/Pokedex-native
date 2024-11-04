import React from 'react';
import MenuInicial from './mainMenu/Menu';
import Pokemon from './Pokemon/Pokemon';
import { NavigationContainer } from '@react-navigation/native';
//Navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Rota = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='homeScreen'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={MenuInicial} name='homeScreen' />
        <Stack.Screen component={Pokemon} name='pokemon' />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Rota;
