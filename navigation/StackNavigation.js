import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import React, {Component, createRef, useEffect, useState} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import ProfileScreen from '../screens/bottomNavigation_screens/ProfileScreen';
import {createStackNavigator} from '@react-navigation/stack';
import Orientation from 'react-native-orientation-locker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const statusBarRef = createRef();
export default StackNavigation = () => {
  const Stack = createStackNavigator();
  const safeareaHeight = useSafeAreaInsets();
  const [statubarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (
      safeareaHeight.top != 0 &&
      safeareaHeight.top != undefined &&
      safeareaHeight.top != null
    ) {
      setStatusBarHeight(safeareaHeight.top);
    }
  }, [safeareaHeight]);
  console.log('ooooo', safeareaHeight);

  return (
    <>
      <Stack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="MainScreen"
          component={BottomNavigation}
          options={{
            detachPreviousScreen: false,
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});
