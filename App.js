import { Provider } from 'react-redux';
import storeConfig from './src/store';
import Rota from './src/Rota';
import { View, Text } from 'react-native';

const store = storeConfig();

export default function App() {
  return (
    <Provider store={store}>
      {/* <View>
        <Text>POKEDEX</Text>
      </View> */}
      <Rota />
    </Provider>
  );
}
