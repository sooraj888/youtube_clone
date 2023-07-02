import {
  View,
  Text,
  Button,
  Animated,
  Alert,
  Dimensions,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {videoScrenRef} from './BottomTabBar';
import {useSelector} from 'react-redux';
import Video from 'react-native-video';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TEST_VIDEO from '../../assets/test.mp4';
import Orientation from 'react-native-orientation-locker';
import {hideNavigationBar} from 'react-native-navigation-bar-color';
import {showNavigationBar} from 'react-native-navigation-bar-color';

export const videoPlayerRef = createRef();
export default function VideoScreen({
  heightAnimation,
  vidoScreenCurrentState,
  setVidoScreenCurrentState,
  paused,
  setPaused,
}) {
  const addedValue = useSelector(state => state?.reducer);
  const StatusBarHeight = StatusBar?.currentHeight || 0;

  const lastVideoId = useRef('');

  useEffect(() => {
    if (
      vidoScreenCurrentState != 'closed' &&
      addedValue != null &&
      addedValue != undefined
    ) {
      if (addedValue != lastVideoId.current) {
        handlePlayPause(false);
      }
      lastVideoId.current = addedValue;
    } else {
      handlePlayPause(true);
    }
  }, [vidoScreenCurrentState, addedValue]);

  const closeVideoScreen = () => {
    handlePlayPause(true);
    Animated.timing(heightAnimation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        videoScrenRef?.current?.setNativeProps?.({
          style: {display: 'none'},
        });
      }
    });
  };
  const isPortraite = () => {
    return Dimensions.get('screen').height > Dimensions.get('screen').width;
  };
  const maximizVideo = () => {
    isPortraite() ? showNavigationBar() : hideNavigationBar();

    Animated.timing(heightAnimation, {
      toValue: isPortraite()
        ? Dimensions.get('window').height -
          (StatusBarHeight >= 30 ? 0 : StatusBarHeight)
        : Dimensions.get('window').height,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  const handlePlayPause = isPause => {
    setPaused(isPause);
    videoPlayerRef?.current?.setNativeProps?.({paused: isPause});
  };
  const [playbackRate, setPlaybackRate] = useState(1);
  const [previousTime, setPreviousTime] = useState(0);

  const handleProgress = ({currentTime}) => {
    const deltaTime = currentTime - previousTime;
    const newPlaybackRate = deltaTime !== 0 ? 1 / deltaTime : 1;
    setPlaybackRate(newPlaybackRate);
    setPreviousTime(currentTime);

    // Additional logic or actions based on the playback rate
  };

  return (
    <View
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',

        height: '100%',
        backgroundColor: 'red',
      }}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <Animated.View
          style={{
            width: heightAnimation.interpolate({
              inputRange: [55, 100],
              outputRange: [100, Dimensions.get('screen').width],
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            backgroundColor: 'black',
          }}>
          <Video
            ref={videoPlayerRef}
            paused={true}
            repeat={true}
            resizeMode={'contain'}
            // source={TEST_VIDEO} // Can be a URL or a local file.
            source={{
              // uri: 'http://youtube-clone-server-hmp3.onrender.com/video',
              uri: 'http://192.168.29.45:3000/video',

              // uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            }}
            style={{width: '100%', aspectRatio: 16 / 8}}
            // paused={true}
            onProgress={handleProgress}
            onError={e => {
              console.log(e);
              Alert.alert(JSON.stringify(e));
            }}
          />
        </Animated.View>
        <View
          style={{
            width: Dimensions?.get('window').width - 100,
            height: '100%',
            // marginLeft: Dimensions?.get('window').width - 100 - 55,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => maximizVideo()}
            style={{
              width: Dimensions.get('window').width - 100 - 100 - 10,
              height: 55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              marginLeft: 10,
            }}></TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePlayPause(!paused)}
            style={{
              width: 55,
              height: 55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {paused ? (
              <MaterialCommunityIcons name={'play'} color={'black'} size={30} />
            ) : (
              <MaterialCommunityIcons
                name={'pause'}
                color={'black'}
                size={30}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={closeVideoScreen}
            style={{
              width: 55,
              height: 55,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <EvilIcons name={'close'} color={'black'} size={32} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View>
        <Text style={{color: 'red', height: 30}}>
          slected text {addedValue}
        </Text>

        <Button
          style={{height: 30}}
          onPress={() => {
            Animated.timing(heightAnimation, {
              toValue: 55,
              duration: 0,
              useNativeDriver: false,
            }).start(({finished}) => {
              if (finished) {
                StatusBar.setHidden(false);
                setVidoScreenCurrentState('minimized');
              }
            });
          }}
          title="mnimiz"></Button>
      </View> */}
    </View>
  );
}

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
