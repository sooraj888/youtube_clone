import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
} from 'react-native';
import TopHeader from './TopHeader';

import GenreHeader from './GenreHeader';

const HomeScreenHeader = ({isPageFocused}) => {
  const scrollViewRef = useRef(null);
  const scollPosition = useRef(0);
  const headerViewRef = useRef();
  const scrolling = useRef(new Animated.Value(0)).current;

  const [slectedGenre, setSelectedGenre] = useState(0);

  const diffClamp = Animated.diffClamp(scrolling, 0, 100);
  const translation = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
  });

  useEffect(() => {
    setTimeout(() => {
      headerViewRef.current?.measureInWindow((fx, fy) => {});
    }, 500);

    if (isPageFocused) {
      headerViewRef.current?.measureInWindow((fx, fy) => {
        if (fy == -100) {
          scrollViewRef.current?.scrollTo({
            x: 0,
            y: scollPosition.current - 100,
            animated: true,
          });
        }
      });
    }
  }, [isPageFocused]);

  return (
    <View style={styles.container}>
      <Animated.View
        ref={headerViewRef}
        style={[
          {
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 100,
            // elevation: 4,
            zIndex: 4,
            transform: [{translateY: translation}],
          },
        ]}>
        <TopHeader />
        <GenreHeader
          onSelectedGenre={index => {
            setSelectedGenre(index);
          }}
        />
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        style={[styles.scrollView]}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrolling}}}],
          {
            useNativeDriver: false,
            listener: event => {
              scollPosition.current = event.nativeEvent?.contentOffset?.y;
            },
          },
        )}
        scrollEventThrottle={16}
        onMomentumScrollEnd={e => {
          const currentScrollY = e?.nativeEvent?.contentOffset?.y;
          headerViewRef.current?.measureInWindow((fx, fy) => {
            if ((fy < -50 && fy > -75) || fy == -75) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY + (fy + 50),
              });
            } else if (fy < -75 && fy > -100) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY + (fy + 100),
              });
            } else if (fy <= -1 && fy > -25) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY - (fy + 50),
              });
            } else if (fy < -25 && fy > -50) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY + (fy + 50),
              });
            }
          });
        }}>
        <View
          style={{
            width: '100%',
            flex: 1,
            paddingBottom: 120,
            alignItems: 'center',
          }}>
          {new Array(50).fill(' ').map((item, index) => {
            return (
              <Text key={index}>{(index + 1) * (slectedGenre + 1) * 10}</Text>
            );
          })}
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
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreenHeader;
