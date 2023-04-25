import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {getCurrentFocusedRouteName} from './RootNavigation';

export default function DrawerView() {
  //   const routeName = getFocusedRouteNameFromRoute(route);
  const navigation = useNavigation();
  const onSelectSideMenuOption = name => {
    const selectedTabScreenName = getCurrentFocusedRouteName();
    navigation.navigate('NestedScreen' + selectedTabScreenName, {
      screen: name,
    });
  };
  return (
    <View>
      <View style={{width: '100%', height: 50, backgroundColor: 'gray'}}>
        <TouchableOpacity onPress={() => onSelectSideMenuOption('Trending')}>
          <Text>Trending</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', height: 50, backgroundColor: 'gray'}}>
        <TouchableOpacity onPress={() => onSelectSideMenuOption('Shoping')}>
          <Text>Shoping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
