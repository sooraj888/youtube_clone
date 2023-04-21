import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert,
} from 'react-native';

const MyComponent = () => {
  const scrollViewRef = useRef(null);
  const headerViewRef = useRef();
  const scrolling = useRef(new Animated.Value(0)).current;

  const lastContentOffsetY = useRef(0);
  // Alert.alert(lastContentOffsetY);
  const diffClamp = Animated.diffClamp(scrolling, 0, 100);
  const translation = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    // extrapolate: 'clamp',
  });
  const translationOnHalf = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.View
        ref={headerViewRef}
        style={[
          {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 100,
            elevation: 4,
            zIndex: 4,
            // backgroundColor: 'tomato',
            transform: [{translateY: translation}],
          },
          // ,
          // {transform: [{translateY: translationOnHalf}]},
        ]}>
        <View
          style={{backgroundColor: 'red', height: '50%', width: '100%'}}></View>
        <View
          style={{
            backgroundColor: 'green',
            height: '50%',
            width: '100%',
          }}></View>
      </Animated.View>
      <Animated.ScrollView
        bounces={false}
        ref={scrollViewRef}
        style={[styles.scrollView]}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrolling}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}
        onScrollEndDrag={e => {
          const currentScrollY = e?.nativeEvent?.contentOffset?.y;
          headerViewRef.current?.measureInWindow((fx, fy) => {
            if ((fy < -50 && fy > -75) || fy == -75) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY + (fy + 50),
                animated: true,
              });
            } else if (fy < -75 && fy > -100) {
              console.log(fy + 100);
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY + (fy + 100),
                animated: true,
              });
            }
          });
        }}>
        {/* Content goes here */}

        <View style={{height: 7100, width: 200, flex: 1}}>
          <Text>aaaaaa</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>

          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>

          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
          <Text>sfdsdfhsdkh</Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    paddingTop: 100,
  },
});

export default MyComponent;
