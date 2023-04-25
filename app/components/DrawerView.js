import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {getCurrentFocusedRouteName} from './RootNavigation';

export default DrawerView = () => {
  const navigation = useNavigation();

  const sideMenueOptions = [
    'Trending',
    'Shoping',
    'Music',
    'Movie & Shows',
    'Live',
    'Gaming',
    'News',
    'Sports',
    'Learning',
    'Fashion & Beauty',
  ];

  const onSelectSideMenuOption = name => {
    const selectedTabScreenName = getCurrentFocusedRouteName();
    navigation.navigate('NestedScreen' + selectedTabScreenName, {
      screen: name,
    });
  };
  return (
    <View>
      <View style={[styles.sideMenueHeader]}></View>
      <ScrollView style={[styles.menuOptionContainer]}>
        {sideMenueOptions.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelectSideMenuOption(item)}
              style={[styles.optionsButton]}>
              <Text style={[styles.text]}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sideMenueHeader: {
    // backgroundColor: 'red',
    width: '100%',
    height: 60,
  },
  menuOptionContainer: {
    width: '100%',
  },
  optionsButton: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
});
