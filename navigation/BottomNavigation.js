import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/bottomNavigation_screens/HomeScreen';
import ProfileScreen from '../screens/bottomNavigation_screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Alert,
  Animated,
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
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import BottomTabBar, {
  heightAnimation,
  videoScrenCurrentHeightRef,
  videoScrenRef,
} from '../app/components/navigation/BottomTabBar';
import VideoScreen, {
  videoPlayerRef,
} from '../app/components/navigation/VideoScreen';
import Video from 'react-native-video';
import TEST_VIDEO from './../app/assets/test.mp4';
import Orientation from 'react-native-orientation-locker';
import {statusBarRef} from './StackNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const BottomNavigation = ({navigation}) => {
  const maninNavigation = useNavigation();
  const {theme} = React?.useContext(ThemeContext);
  const Tab = createBottomTabNavigator();

  const [isBottomSheetOpend, setIsBottomSheetOpend] = useState(false);
  const [paused, setPaused] = useState(false);
  const bottomSheetRef = useRef();
  const backgroundViewRef = useRef();
  // variables

  const snapPoints = useMemo(() => ['50%'], []);

  const [currentOrientation, setCurrentOrientation] = useState(
    Orientation.getInitialOrientation(),
  );

  const [vidoScreenCurrentState, setVidoScreenCurrentState] =
    useState('closed');

  useEffect(() => {
    backgroundViewRef?.current?.setNativeProps({style: {display: 'none'}});
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      videoPlayerRef?.current?.setNativeProps?.({paused: true});
      setPaused(true);
    }
  }, [isFocused]);

  const closeVideoScreen = () => {
    videoPlayerRef?.current?.setNativeProps?.({paused: true});
    videoScrenRef?.current?.setNativeProps?.({
      style: {zIndex: -10},
    });
    setPaused(true);
  };

  const drawerNavigationState = maninNavigation.getState();
  const stackNavigationState = drawerNavigationState?.routes?.[0];
  const selectedBottomNavigationScreen =
    stackNavigationState?.state?.routes?.[stackNavigationState?.state?.index];
  const selectedNestedBottomStackScreen =
    selectedBottomNavigationScreen?.state?.routes?.[1];

  useEffect(() => {
    if (
      selectedNestedBottomStackScreen?.params?.screen != undefined &&
      selectedNestedBottomStackScreen?.params?.screen == 'Trending'
    ) {
      closeVideoScreen();
    } else {
      if (true) {
        videoScrenRef?.current?.setNativeProps?.({
          style: {zIndex: 2},
        });
        console.log(vidoScreenCurrentState);
      }
    }
  }, [drawerNavigationState]);

  useEffect(() => {}, [drawerNavigationState]);
  const safeareaHeight = useSafeAreaInsets();
  useEffect(() => {
    const updateOrientation = orientation => {
      console.warn(selectedBottomNavigationScreen, videoScrenCurrentHeightRef);
      if (
        (orientation == 'LANDSCAPE-LEFT' || orientation == 'LANDSCAPE-RIGHT') &&
        videoScrenCurrentHeightRef > 55 &&
        videoScrenCurrentHeightRef != null
      ) {
        // statusBarRef?.current?.setNativeProps({
        //   style: {display: 'flex'},
        // });
        // StatusBar.setHidden(true);
      } else {
        // statusBarRef?.current?.setNativeProps({
        //   style: {display: 'flex'},
        // });
        // StatusBar.setHidden(false);
      }

      // else if (
      //   orientation == 'PORTRAIT' &&
      //   selectedBottomNavigationScreen?.name != 'Shorts'
      // ) {
      //   statusBarRef?.current?.setNativeProps({
      //     style: {display: 'flex', backgroundColor: 'red'},
      //   });
      // }
    };

    Orientation.addOrientationListener(updateOrientation);

    return () => {
      Orientation.removeOrientationListener(updateOrientation);
    };
  }, [vidoScreenCurrentState, drawerNavigationState]);

  useEffect(() => {
    const handleOrientationChange = orientation => {
      console.warn(safeareaHeight);
      // console.log('Current orientation:', orientation);
      // // StatusBar.setHidden(true);
      // if (orientation == 'LANDSCAPE-LEFT') {
      //   StatusBar.setHidden(true);
      //   Orientation.lockToLandscapeLeft();
      // } else if (orientation == 'LANDSCAPE-RIGHT') {
      //   StatusBar.setHidden(true);
      //   Orientation.lockToLandscapeRight();
      // } else if (orientation == 'PORTRAIT') {
      //   StatusBar.setHidden(false);
      //   Orientation.lockToPortrait();
      // }
    };

    Orientation.addOrientationListener(handleOrientationChange);

    return () => {
      Orientation.removeOrientationListener(handleOrientationChange);
    };
  }, []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    if (index == -1) {
      setIsBottomSheetOpend(false);
      backgroundViewRef?.current?.setNativeProps({style: {display: 'none'}});
      StatusBar.setBackgroundColor('white');
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

  useEffect(() => {
    const updateOrientation = orientation => {
      setCurrentOrientation(orientation);
    };

    Orientation.addOrientationListener(updateOrientation);

    return () => {
      Orientation.removeOrientationListener(updateOrientation);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View> */}
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="history"
        detachInactiveScreens={false}
        detachPreviousScreen={false}
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'black',
          tabBarLabelStyle: {color: theme == 'Dark' ? 'white' : 'black'},
          tabBarStyle: {
            backgroundColor: theme == 'Dark' ? 'black' : 'white',
          },
          tabBarLabelPosition: 'below-icon',
          detachInactiveScreens: false,
          detachPreviousScreen: false,
        }}
        tabBar={props => (
          <BottomTabBar
            {...props}
            setPaused={setPaused}
            paused={paused}
            vidoScreenCurrentState={vidoScreenCurrentState}
            setVidoScreenCurrentState={setVidoScreenCurrentState}
          />
        )}>
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
                  backgroundViewRef?.current.setNativeProps({
                    style: {display: 'flex'},
                  });
                  setIsBottomSheetOpend(true);
                  bottomSheetRef?.current?.snapToIndex(0);
                  setTimeout(() => {
                    StatusBar.setBackgroundColor('rgba(0,0,0,0.4)');
                  }, 0);
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
            StatusBar.setBackgroundColor('white');
          }, 0);
        }}>
        <View
          ref={backgroundViewRef}
          style={{
            // flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            position: 'absolute',
            // zIndex: 1,
            left: 0,
            right: 0,
            top: -30,
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
