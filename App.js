import { Provider } from 'react-redux';
import storeConfig from './src/store';
import Rota from "./src/Rota";

const store = storeConfig()

export default function App() {
  return (
    <Provider store={store}>
      <Rota />
    </Provider>
  );
}
