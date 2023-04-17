/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './screens/stack_navigation_screens/ProfileScreen';
import HomeScreen from './screens/stack_navigation_screens/HomeScreen';
import BottomNavigation from './navigation/BottomNavigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
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

  return (
    <ThemeContext.Provider value={themeData}>
      <StatusBar
        backgroundColor={theme == 'Light' ? 'white' : 'black'}
        barStyle={theme == 'Light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer theme={theme == 'Light' ? DefaultTheme : DarkTheme}>
        <Stack.Navigator
          initialRouteName="MainScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainScreen" component={BottomNavigation} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
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
