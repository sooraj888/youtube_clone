/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useEffect, useState} from 'react';

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './screens/bottomNavigation_screens/ProfileScreen';
import HomeScreen from './screens/bottomNavigation_screens/HomeScreen';
import BottomNavigation from './navigation/BottomNavigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import StackNavigation from './navigation/StackNavigation';
import DrawerView from './app/components/DrawerView';
import {currentRoutName, navigationRef} from './app/components/RootNavigation';
const Drawer = createDrawerNavigator();

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('Light');

  const themeData = {theme, setTheme};
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    if (theme == 'Dark') {
      changeNavigationBarColor('black');
    } else {
      changeNavigationBarColor('white');
    }
  }, [theme]);

  const getActiveRouteName = state => {
    return (
      state?.routes?.[0]?.state?.routes?.[0]?.state?.routes?.[
        state.routes?.[0]?.state?.routes?.[0]?.state?.index
      ]?.name || 'Home'
    );
  };

  return (
    <ThemeContext.Provider value={themeData}>
      <StatusBar
        backgroundColor={theme == 'Light' ? 'white' : 'black'}
        barStyle={theme == 'Light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={state => {
          currentRoutName.current = getActiveRouteName(state);
          // console.log(JSON.stringify(getActiveRouteName(state)));
        }}
        theme={theme == 'Light' ? DefaultTheme : DarkTheme}>
        <Drawer.Navigator
          drawerContent={props => <DrawerView {...props} />}
          screenOptions={{headerShown: false}}>
          <Drawer.Screen name="StackNavigation" component={StackNavigation} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
