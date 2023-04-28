import {View, Text, Image} from 'react-native';
import React from 'react';
import AppIconImage from './../assets/icon.png';
const AppIcon = ({width, height, marginLeft = 0, scale}) => {
  return (
    <Image
      source={AppIconImage}
      style={{
        width: width,
        height: height,
        marginLeft: marginLeft,
        transform: [{scale: 1}],
      }}
      resizeMode="center"
    />
  );
};
export default AppIcon;
