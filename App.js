import React from 'react';
import MenuInicial from './src/mainMenu/Menu';
import Pokemon from './src/Pokemon/Pokemon';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import { TransitionSpecs } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import storeConfig from './src/store';


const AppStack = createStackNavigator();
const store = storeConfig()

export default function App() {

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: 'modal',
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            cardStyleInterpolator:
              CardStyleInterpolators.forFadeFromBottomAndroid
          }}
        >
          <AppStack.Screen name="Menu" component={MenuInicial}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
              transitionSpec: {
                open: config,
                close: config,
              },
            }} />
          <AppStack.Screen name="Pokemon" component={Pokemon}
            options={{
              cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
              transitionSpec: {
                open: config,
                close: config,
              },
            }} />
        </AppStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
