import React from 'react';
import {Text, View} from 'react-native';
import HomeScreenHeader from '../../app/components/HomeScreenHeader';
import {useIsFocused} from '@react-navigation/native';

const HomeScreen = ({}) => {
  const isPageFocused = useIsFocused();
  return (
    <View style={{height: '100%'}}>
      <HomeScreenHeader isPageFocused={isPageFocused}></HomeScreenHeader>
    </View>
  );
};

export default HomeScreen;
