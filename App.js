/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createContext, useEffect, useState} from 'react';

import {
  Alert,
  Animated,
  Dimensions,
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

import StackNavigation from './navigation/StackNavigation';
import DrawerView from './app/components/DrawerView';
import {currentRoutName, navigationRef} from './app/components/RootNavigation';
const Drawer = createDrawerNavigator();

export const ThemeContext = createContext();
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import store from './app/redux/store';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import {
  heightAnimation,
  videoScrenCurrentHeightRef,
} from './app/components/navigation/BottomTabBar';

const Tab = createBottomTabNavigator();

function App() {
  const [theme, setTheme] = useState('Light');
  const themeData = {theme, setTheme};
  // const Stack = createNativeStackNavigator();

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (theme == 'Dark') {
      changeNavigationBarColor('black');
    } else {
      changeNavigationBarColor('white');
    }
  }, [theme]);

  const handleAsync = async () => {
    StatusBar.setHidden(false);
    Orientation.lockToPortrait();
  };

  useEffect(() => {
    const handleOrientationChange = orientation => {
      console.log('Current orientation:', orientation);
      // StatusBar.setHidden(true);
      if (orientation == 'LANDSCAPE-LEFT') {
        if (videoScrenCurrentHeightRef > 55) {
          StatusBar.setHidden(true);
          Orientation.lockToLandscapeLeft();
        } else {
          Orientation.lockToLandscapeLeft();
        }
      } else if (orientation == 'LANDSCAPE-RIGHT') {
        if (videoScrenCurrentHeightRef > 55) {
          StatusBar.setHidden(true);
        }
        Orientation.lockToLandscapeRight();
      } else if (orientation == 'PORTRAIT') {
        StatusBar.setHidden(false);
        Orientation.lockToPortrait();
      }
    };

    Orientation.addDeviceOrientationListener(handleOrientationChange);

    return () => {
      Orientation.removeDeviceOrientationListener(handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    const handleOrientationChange = orientation => {
      console.log('Current orientation:', orientation);
      // StatusBar.setHidden(true);
      if (orientation == 'LANDSCAPE-LEFT') {
        console.warn('videoScrenCurrentHeightRef', videoScrenCurrentHeightRef);
        if (videoScrenCurrentHeightRef > 56) {
          Animated.timing(heightAnimation, {
            toValue: Dimensions.get('screen').width,
            duration: 1000,
            useNativeDriver: false,
          }).start();
        } else {
          // Orientation.lockToLandscapeLeft();
        }
      } else if (orientation == 'LANDSCAPE-RIGHT') {
        if (videoScrenCurrentHeightRef > 55) {
        }
      } else if (orientation == 'PORTRAIT') {
      }
    };

    Orientation.addOrientationListener(handleOrientationChange);

    return () => {
      Orientation.removeOrientationListener(handleOrientationChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={themeData}>
      <StatusBar
        translucent={true}
        hidden={false}
        backgroundColor="transparent"
      />
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onStateChange={state => {
            currentRoutName.current = getActiveRouteName(state);
          }}
          theme={theme == 'Light' ? DefaultTheme : DarkTheme}>
          <Drawer.Navigator
            detachInactiveScreens={false}
            detachPreviousScreen={false}
            drawerContent={props => <DrawerView {...props} />}
            screenOptions={{
              headerShown: false,
              detachInactiveScreens: false,
              detachPreviousScreen: false,
            }}>
            <Drawer.Screen name="StackNavigation" component={StackNavigation} />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}

export default App;

const getActiveRouteName = state => {
  return (
    state?.routes?.[0]?.state?.routes?.[0]?.state?.routes?.[
      state.routes?.[0]?.state?.routes?.[0]?.state?.index
    ]?.name || 'Home'
  );
};
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
