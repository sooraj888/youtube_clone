import {Text, StyleSheet, View, StatusBar} from 'react-native';
import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './BottomNavigation';
import ProfileScreen from '../screens/bottomNavigation_screens/ProfileScreen';

export default StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MainScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={BottomNavigation} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
