import React from 'react';
import MenuInicial from './mainMenu/Menu';
import Pokemon from './Pokemon/Pokemon';

//Navegação
import { Router, Stack, Scene } from 'react-native-router-flux';

const Rota = () => {
  return (
    <>
      <Router>
        <Stack key="root" initial hideNavBar={true}>
            <Scene
              key="homeScreen"
              navTransparent={true}
              component={MenuInicial}
              direction="horizontal"
              />
            <Scene
              key="pokemon"
              navTransparent={true}
              title='pokemon'
              component={Pokemon}
              direction="horizontal"
            />
        </Stack>
      </Router >
    </>
  );
}

export default Rota;
