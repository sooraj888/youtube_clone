/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import {ThemeProvider} from '@react-navigation/native';
const AppRedux = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle={'dark-content'} />
      <App />
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => AppRedux);
