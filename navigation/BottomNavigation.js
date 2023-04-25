import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomNavigation_screens/HomeScreen';
import ProfileScreen from '../screens/bottomNavigation_screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Alert, View} from 'react-native';
import {ThemeContext} from '../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NestedScreen from './NestedNavigation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigation = () => {
  const {theme} = React.useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: 'black',
        tabBarActiveTintColor: 'black',
        tabBarLabelStyle: {color: theme == 'Dark' ? 'white' : 'black'},
        tabBarStyle: {
          backgroundColor: theme == 'Dark' ? 'black' : 'white',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreenStack}
        options={{
          tabBarLabel: 'Home',

          tabBarIcon: ({color, size, focused}) =>
            focused ? (
              <Ionicons
                name="ios-home-sharp"
                size={23}
                color={theme == 'Dark' ? 'white' : 'black'}
              />
            ) : (
              <Ionicons name="md-home-outline" size={23} color={'gray'} />
            ),
        }}
      />
      <Tab.Screen
        name="Shorts"
        component={ShortsScreenStack}
        options={{
          tabBarLabel: 'Shorts',
          tabBarIcon: ({color, size, focused}) => {
            return focused ? (
              <Ionicons
                name="md-flash-sharp"
                size={25}
                color={theme == 'Dark' ? 'white' : 'black'}
              />
            ) : (
              <Ionicons name="md-flash-outline" size={25} color={'gray'} />
            );
          },
        }}
      />

      <Tab.Screen
        name="Create"
        component={ProfileScreen}
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          focused: false,
          tabBarIcon: ({color, size, focused}) => {
            return (
              <View
                style={{
                  zIndex: 100,
                  zIndex: 10,
                  width: 45,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {focused ? (
                  <Ionicons
                    name="md-add-circle"
                    size={45}
                    color={theme == 'Dark' ? 'white' : 'black'}
                  />
                ) : (
                  <Ionicons
                    name="ios-add-circle-outline"
                    size={45}
                    color={'gray'}
                  />
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Subscription',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialCommunityIcons
              name="youtube-subscription"
              size={25}
              color={focused ? (theme == 'Dark' ? 'white' : 'black') : 'gray'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: ({color, size, focused}) => (
            <MaterialIcons
              name="video-library"
              size={23}
              color={focused ? (theme == 'Dark' ? 'white' : 'black') : 'gray'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const HomeScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreenMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreenMain" component={HomeScreen} />
      <Stack.Screen name="NestedScreenHome" component={NestedScreen} />
    </Stack.Navigator>
  );
};

const ShortsScreenStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ShortsScreenScreenMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ShortsScreenScreenMain" component={ProfileScreen} />
      <Stack.Screen name="NestedScreenShorts" component={NestedScreen} />
    </Stack.Navigator>
  );
};
