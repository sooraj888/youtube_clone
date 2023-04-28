import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomNavigation_screens/HomeScreen';
import ProfileScreen from '../screens/bottomNavigation_screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Alert,
  BackHandler,
  Button,
  StatusBar,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ThemeContext} from '../App';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NestedScreen from './NestedNavigation';
import {TouchableOpacity} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {useCallback, useMemo, useRef} from 'react';
import {Text, StyleSheet} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useFocusEffect} from '@react-navigation/native';

const BottomNavigation = ({navigation}) => {
  const {theme} = React?.useContext(ThemeContext);
  const Tab = createBottomTabNavigator();

  const [isBottomSheetOpend, setIsBottomSheetOpend] = useState(false);

  const bottomSheetRef = useRef();
  const backgroundViewRef = useRef();
  // variables
  const snapPoints = useMemo(() => ['50%'], []);

  useEffect(() => {
    backgroundViewRef.current.setNativeProps({style: {display: 'none'}});
  }, []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    if (index == -1) {
      setIsBottomSheetOpend(false);
      backgroundViewRef?.current?.setNativeProps({style: {display: 'none'}});
      // StatusBar.setBackgroundColor('white');
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isBottomSheetOpend) {
          bottomSheetRef.current.close();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [isBottomSheetOpend]),
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: StatusBar?.currentHeight,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0)',
        }}></View>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'black',
          tabBarLabelStyle: {color: theme == 'Dark' ? 'white' : 'black'},
          tabBarStyle: {
            backgroundColor: theme == 'Dark' ? 'black' : 'white',
          },
          tabBarLabelPosition: 'below-icon',
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
            tabBarButton: ({style}) => (
              <TouchableHighlight
                underlayColor={'rgba(0, 0, 0, 0.1)'}
                style={[style, {borderRadius: 100}]}
                onPress={() => {
                  // setTimeout(() => {
                  //   StatusBar.setBackgroundColor('rgba(0,0,0,0.4)');
                  // }, 0);
                  backgroundViewRef?.current.setNativeProps({
                    style: {display: 'flex'},
                  });
                  setIsBottomSheetOpend(true);
                  bottomSheetRef?.current?.snapToIndex(0);
                }}>
                {false ? (
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
              </TouchableHighlight>
            ),
          }}
        />
        <Tab.Screen
          name="Subscription"
          component={SubscriptionScreenStack}
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
          component={LibraryScreenStack}
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
      <TapGestureHandler
        onHandlerStateChange={() => {
          bottomSheetRef.current.close();
          backgroundViewRef?.current?.setNativeProps({
            style: {display: 'none'},
          });
          setTimeout(() => {
            // StatusBar.setBackgroundColor('white');
          }, 0);
        }}>
        <View
          ref={backgroundViewRef}
          style={{
            // flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            // zIndex: 50,
            left: 0,
            right: 0,
            top: -500,
            bottom: 0,
          }}></View>
      </TapGestureHandler>

      <BottomSheet
        enablePanDownToClose={true}
        handleStyle={{display: 'none'}}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onClose={() => setIsBottomSheetOpend(false)}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <View
            style={{
              display: 'flex',
              // backgroundColor: 'red',
              width: '100%',
              borderTopEndRadius: 15,
              borderTopStartRadius: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',

                fontSize: 20,
              }}>
              Create
            </Text>
            <TouchableHighlight
              underlayColor={'rgba(0, 0, 0, 0.1)'}
              style={{
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                borderRadius: 50,
              }}
              onPress={() => {
                bottomSheetRef.current.close();
              }}>
              <EvilIcons name={'close'} size={30} />
            </TouchableHighlight>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
  },
});

const HomeScreenStack = () => {
  const Stack = createNativeStackNavigator();
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
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ShortsScreenScreenMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="ShortsScreenScreenMain" component={ProfileScreen} />
      <Stack.Screen name="NestedScreenShorts" component={NestedScreen} />
    </Stack.Navigator>
  );
};

const SubscriptionScreenStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="ShortsScreenScreenMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SubscriptionScreenMain" component={ProfileScreen} />
      <Stack.Screen name="NestedScreenSubscription" component={NestedScreen} />
    </Stack.Navigator>
  );
};

const LibraryScreenStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="LibraryScreenScreenMain"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LibraryScreenMain" component={ProfileScreen} />
      <Stack.Screen name="NestedScreenLibrary" component={NestedScreen} />
    </Stack.Navigator>
  );
};
