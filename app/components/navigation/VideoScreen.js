import {
  View,
  Text,
  Button,
  Animated,
  Alert,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import {videoScrenRef} from './BottomTabBar';
import {useSelector} from 'react-redux';

export default function VideoScreen({heightAnimation}) {
  const addedValue = useSelector(state => state?.reducer);
  const StatusBarHeight = StatusBar?.currentHeight || 0;
  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'gray',
        height: '100%',
      }}>
      <Text style={{color: 'red', height: 30}}>slected text {addedValue}</Text>
      <Button
        height={50}
        onPress={() => {
          Animated.timing(heightAnimation, {
            toValue:
              Dimensions.get('window').height -
              (StatusBarHeight >= 30 ? 0 : StatusBarHeight),
            duration: 500,
            useNativeDriver: false,
          }).start();
        }}
        title="maximiz"
        style={{height: 30}}></Button>
      <Button
        style={{height: 30}}
        onPress={() => {
          Animated.timing(heightAnimation, {
            toValue: 50,
            duration: 500,
            useNativeDriver: false,
          }).start();
        }}
        title="mnimiz"></Button>
      <Button
        style={{height: 30}}
        onPress={() => {
          Alert.alert(String(StatusBarHeight));
        }}
        title="mnimiz"></Button>

      <Button
        style={{height: 30}}
        onPress={() => {
          videoScrenRef?.current?.setNativeProps?.({style: {display: 'none'}});
        }}
        title="close"></Button>
    </View>
  );
}
