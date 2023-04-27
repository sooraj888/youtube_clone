import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {getCurrentFocusedRouteName} from './RootNavigation';
import AppIcon from './AppIcon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default DrawerView = () => {
  const navigation = useNavigation();

  const sideMenueOptions = [
    {option: 'Trending', iconType: 'MaterialCommunityIcons', iconName: 'fire'},
    {option: 'Shoping', iconType: 'SimpleLineIcons', iconName: 'bag'},
    {
      option: 'Music',
      iconType: 'Ionicons',
      iconName: 'musical-notes-outline',
    },
    {
      option: 'Movie & Shows',
      iconType: 'MaterialCommunityIcons',
      iconName: 'movie-open-outline',
    },
    {option: 'Live', iconType: 'Foundation', iconName: 'sound'},
    {
      option: 'Gaming',
      iconType: 'Ionicons',
      iconName: 'game-controller-outline',
    },
    {option: 'News', iconType: 'Entypo', iconName: 'news'},
    {option: 'Sports', iconType: 'Ionicons', iconName: 'trophy-outline'},
    {option: 'Learning', iconType: 'AntDesign', iconName: 'bulb1'},
    {
      option: 'Fashion & Beauty',
      iconType: 'MaterialCommunityIcons',
      iconName: 'hanger',
    },
  ];

  const onSelectSideMenuOption = name => {
    const selectedTabScreenName = getCurrentFocusedRouteName();
    navigation.navigate('NestedScreen' + selectedTabScreenName, {
      screen: name,
    });
  };
  return (
    <View>
      <View style={[styles.sideMenueHeader]}>
        <View
          style={{
            // backgroundColor: 'gray',
            marginLeft: 10,
            marginTop: 15,
            display: 'flex',
            flexDirection: 'row',
          }}>
          <AppIcon height={30} width={30} scale={2} paddingLeft={5} />
          <Text
            style={{
              marginLeft: 3,
              fontSize: 18,
              fontWeight: 'bold',
              color: 'black',
              marginBottom: 2,
            }}>
            YouTube
          </Text>
        </View>
      </View>
      <ScrollView style={[styles.menuOptionContainer]}>
        {sideMenueOptions.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => onSelectSideMenuOption(item.option)}
              style={[styles.optionsButton]}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  // backgroundColor: 'red',
                  marginRight: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}>
                {item?.iconType == 'MaterialCommunityIcons' && (
                  <MaterialCommunityIcons
                    name={item?.iconName}
                    size={25}
                    color={'black'}
                  />
                )}
                {item?.iconType == 'SimpleLineIcons' && (
                  <SimpleLineIcons
                    name={item?.iconName}
                    size={25}
                    color={'black'}
                  />
                )}
                {item?.iconType == 'Ionicons' && (
                  <Ionicons name={item?.iconName} size={25} color={'black'} />
                )}
                {item?.iconType == 'Entypo' && (
                  <Entypo name={item?.iconName} size={25} color={'black'} />
                )}
                {item?.iconType == 'Foundation' && (
                  <Foundation name={item?.iconName} size={25} color={'black'} />
                )}
                {item?.iconType == 'AntDesign' && (
                  <AntDesign name={item?.iconName} size={25} color={'black'} />
                )}
              </View>
              <Text style={[styles.text]}>{item.option}</Text>
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
    // backgroundColor: 'red',
  },
  menuOptionContainer: {
    width: '100%',
  },
  optionsButton: {
    paddingLeft: 10,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
