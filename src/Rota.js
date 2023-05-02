import React from 'react';
import MenuInicial from './mainMenu/Menu';
import Pokemon from './Pokemon/Pokemon';

//Navegação
import { Router, Stack, Scene } from 'react-native-router-flux';

const Rota = (props) => {
  return (
    <>
      <Router>
        <Stack key="root" initial>
            <Scene
              key="homeScreen"
              title='HomeScreen'
              component={MenuInicial}
              direction="horizontal"
            />
            <Scene
              key="detailScreen"
              title='DetailScreen'
              component={Pokemon}
              direction="horizontal"
            />
        </Stack>
      </Router >
    </>
  );
}

export default Rota;
