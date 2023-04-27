import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TrendingScreen from '../screens/bottomNavigation_screens/stack_nested_navigation/TrendingScreen';
import Shoping from '../screens/bottomNavigation_screens/stack_nested_navigation/Shoping';
import Music from '../screens/bottomNavigation_screens/stack_nested_navigation/Music';
import MovieShows from '../screens/bottomNavigation_screens/stack_nested_navigation/MovieShows';
import Live from '../screens/bottomNavigation_screens/stack_nested_navigation/Live';
import Gaming from '../screens/bottomNavigation_screens/stack_nested_navigation/Gaming';
import NewsScreen from '../screens/bottomNavigation_screens/stack_nested_navigation/NewsScreen';
import Sports from '../screens/bottomNavigation_screens/stack_nested_navigation/Sports';
import LearningScren from '../screens/bottomNavigation_screens/stack_nested_navigation/LearningScren';
import Fashion_Beauty from '../screens/bottomNavigation_screens/stack_nested_navigation/Fashion_Beauty';
import {useIsFocused} from '@react-navigation/native';
const Stack = createNativeStackNavigator();
export default function NestedScreen({navigation}) {
  const isThisScreenFocused = useIsFocused();
  useEffect(() => {
    const drawerNavigation = navigation.getParent().getParent().getParent();
    if (isThisScreenFocused) {
      //set drwawer navigation false
      drawerNavigation?.setOptions({
        swipeEdgeWidth: 0,
      });
    }
    return () => {
      drawerNavigation?.setOptions({
        swipeEdgeWidth: 100,
      });
    };
  }, [isThisScreenFocused]);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Trending" component={TrendingScreen} />
      <Stack.Screen name="Shoping" component={Shoping} />
      <Stack.Screen name="Music" component={Music} />
      <Stack.Screen name="Movie & Shows" component={MovieShows} />
      <Stack.Screen name="Live" component={Live} />
      <Stack.Screen name="Gaming" component={Gaming} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="Sports" component={Sports} />
      <Stack.Screen name="Learning" component={LearningScren} />
      <Stack.Screen name="Fashion & Beauty" component={Fashion_Beauty} />
    </Stack.Navigator>
  );
}
