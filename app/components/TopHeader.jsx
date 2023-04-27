import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppIcon from './AppIcon';

const TopHeader = () => {
  return (
    <View
      style={{
        height: '50%',
        width: '100%',
        display: 'flex',
        // justifyContent: 'space-around',
        paddingTop: 5,
        flexDirection: 'row',
      }}>
      <View
        style={[
          {
            width: '30%',
            height: '100%',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'row',
          },
        ]}>
        <AppIcon width={30} height={30} marginLeft={15} scale={2} />
        <Text
          style={{
            marginLeft: 3,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          }}>
          YouTube
        </Text>
      </View>
      <View
        style={[
          {
            width: '70%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
        ]}>
        <View
          style={[
            {
              //   backgroundColor: 'pink',
              width: 50,
              height: '100%',
              paddingBottom: 2,
            },
            styles.center,
          ]}>
          <MaterialIcons name={'cast'} size={24} color={'black'} />
        </View>
        <View
          style={[
            {
              //   backgroundColor: 'pink',
              width: 50,
              height: '100%',
              paddingBottom: 2,
            },
            styles.center,
          ]}>
          <FontAwesome name={'bell-o'} size={20} color={'black'} />
        </View>
        <View
          style={[
            {
              //   backgroundColor: 'pink',
              width: 50,
              height: '100%',
              paddingBottom: 2,
            },
            styles.center,
          ]}>
          <EvilIcons name={'search'} size={27} color={'black'} />
        </View>

        <View
          style={[
            {
              width: 50,
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View
            style={[
              {
                backgroundColor: 'green',
                width: 25,
                height: 25,
                borderRadius: 30,
              },
              styles.center,
            ]}>
            <Text style={{color: 'white', fontSize: 12}}>S</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TopHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    paddingTop: 100,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
