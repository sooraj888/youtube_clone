import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const genres = [
  'All',
  'Music',
  'React routes',
  'Mixes',
  'Time Cinema',
  'Sports car',
  'Diving',
  'Live',
  'HTML5',
  'Motorcycle',
];
const GenreHeader = ({genersData, onSelectedGenre}) => {
  const [slectedGenre, setSelectedGenre] = useState(0);
  return (
    <View
      style={{
        height: '50%',
        width: '100%',
      }}>
      <ScrollView
        style={{
          display: 'flex',
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}>
        <View
          style={{
            height: '100%',
            marginHorizontal: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}>
          <View
            style={{
              height: 30,
              justifyContent: 'center',
              backgroundColor: 'rgb(240,240,240)',
              paddingHorizontal: 10,
              borderRadius: 3,
            }}>
            <View>
              <Ionicons name={'compass-outline'} size={25} color={'black'} />
            </View>
          </View>
        </View>
        {genres.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                height: '100%',
                marginHorizontal: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedGenre(index);
                  onSelectedGenre(index);
                }}
                style={{
                  height: 30,
                  justifyContent: 'center',
                  backgroundColor:
                    slectedGenre == index
                      ? 'rgb(90,90,90)'
                      : 'rgb(240,240,240)',

                  paddingHorizontal: 10,
                  borderRadius: 8,
                }}>
                <Text
                  style={{color: slectedGenre == index ? 'white' : 'black'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default GenreHeader;
