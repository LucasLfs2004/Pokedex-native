import React from 'react';
import MenuInicial from './src/mainMenu/Menu';
import Pokemon from './src/Pokemon/Pokemon';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";


const AppStack = createStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator:
            CardStyleInterpolators.forFadeFromBottomAndroid
        }}
      >
        <AppStack.Screen name="First" component={MenuInicial} />
        <AppStack.Screen name="Second" component={Pokemon} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
