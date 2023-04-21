import React from 'react';
import {Text, View} from 'react-native';
import MyComponent from '../../app/components/MyComponent';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({}) => {
  const isPageFocused = useIsFocused();
  return (
    <View style={{height: '100%'}}>
      <MyComponent isPageFocused={isPageFocused}></MyComponent>
    </View>
  );
};

export default HomeScreen;
