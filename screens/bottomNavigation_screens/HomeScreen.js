import React from 'react';
import {Text, View} from 'react-native';
import HomeScreenHeader from '../../app/components/HomeScreenHeader';
import {useIsFocused} from '@react-navigation/native';
import CustomStatusBar from '../../app/components/CustomStatusBar';

const HomeScreen = ({}) => {
  const isPageFocused = useIsFocused();
  return (
    <View style={{flex: 1}}>
      <CustomStatusBar />
      <HomeScreenHeader isPageFocused={isPageFocused}> </HomeScreenHeader>
    </View>
  );
};

export default HomeScreen;
