import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function CustomStatusBar() {
  const safeareaHeight = useSafeAreaInsets().top;
  const [statubarHeight, setStatusBarHeight] = useState(0);
  useEffect(() => {
    if (
      safeareaHeight != 0 &&
      safeareaHeight != undefined &&
      safeareaHeight != null
    ) {
      setStatusBarHeight(safeareaHeight);
    }
  }, [safeareaHeight]);
  return (
    <View
      style={{
        width: '100%',
        height: statubarHeight,
        backgroundColor: 'green',
        zIndex: 1000,
      }}></View>
  );
}
