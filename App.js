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
  Platform,
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
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
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
import DeviceInfo from 'react-native-device-info';

import AndroidNotch from 'react-native-android-notch';

const Tab = createBottomTabNavigator();
const statusBarHeight = StatusBar?.currentHeight || 0;
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
        StatusBar.setTranslucent(true);
        if (videoScrenCurrentHeightRef > 55) {
          StatusBar.setHidden(true);

          hideNavigationBar();
        }
        Orientation.lockToLandscapeLeft();
      } else if (orientation == 'LANDSCAPE-RIGHT') {
        StatusBar.setTranslucent(true);
        if (videoScrenCurrentHeightRef > 55) {
          StatusBar.setHidden(true);
          hideNavigationBar();
        }
        Orientation.lockToLandscapeRight();
      } else if (orientation == 'PORTRAIT') {
        showNavigationBar();
        StatusBar.setHidden(false);
        // setTimeout(() => {
        //   Orientation.lockToPortrait();
        // }, 1000);

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
            toValue:
              Dimensions.get('window').width < Dimensions.get('window').height
                ? Dimensions.get('window').width
                : Dimensions.get('window').height,
            duration: 0,
            useNativeDriver: false,
          }).start();
        }
      } else if (orientation == 'LANDSCAPE-RIGHT') {
        if (videoScrenCurrentHeightRef > 56) {
          Animated.timing(heightAnimation, {
            toValue:
              Dimensions.get('window').width < Dimensions.get('window').height
                ? Dimensions.get('window').width
                : Dimensions.get('window').height,

            duration: 0,
            useNativeDriver: false,
          }).start();
        }
      } else if (orientation == 'PORTRAIT') {
        if (videoScrenCurrentHeightRef > 56) {
          Animated.timing(heightAnimation, {
            toValue:
              Dimensions.get('window').width -
              (statusBarHeight >= 30 ? 0 : statusBarHeight),
            // Dimensions.get('window').width > Dimensions.get('window').height
            //   ? Dimensions.get('window').width
            //   : Dimensions.get('window').height - statusBarHeight,
            // (StatusBarHeight >= 30 ? 0 : StatusBarHeight),
            delay: 500,
            duration: 0,
            useNativeDriver: false,
          }).start();
        }
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
