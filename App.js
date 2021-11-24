import { StatusBar } from 'expo-status-bar';
import Main from './components/MainComponent';
import React from 'react';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/LoadingComponent';

const { persistor, store } = ConfigureStore();

export default function App() {
  return (  // Pass the store to all of the app
    <Provider store={store}>  
      <PersistGate    // prevents app from rendering until redux store is rehydrating fully from client side
                    loading={<Loading />}   // will show while redux store is rehydrating
                    persistor={persistor}
      >  
        <Main />
      </PersistGate>
    </Provider>
  );
}