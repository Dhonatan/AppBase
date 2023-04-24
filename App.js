import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {NativeBaseProvider} from 'native-base';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import Screens from '~/screens';
import store from '~/store';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Screens />
        <Toast />
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
