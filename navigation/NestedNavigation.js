import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrendingScreen from '../screens/bottomNavigation_screens/stack_nested_navigation/TrendingScreen';
import Shoping from '../screens/bottomNavigation_screens/stack_nested_navigation/Shoping';
const Stack = createNativeStackNavigator();
export default function NestedScreen() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Trending" component={TrendingScreen} />
      <Stack.Screen name="Shoping" component={Shoping} />
    </Stack.Navigator>
  );
}
