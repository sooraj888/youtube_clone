import React, {useEffect, useRef} from 'react';
import {
  Animated,
  ScrollView,
  View,
  StyleSheet,
  Text,
  Alert,
  Image,
} from 'react-native';

const MyComponent = ({isPageFocused}) => {
  const scrollViewRef = useRef(null);
  const scollPosition = useRef(0);
  const headerViewRef = useRef();
  const scrolling = useRef(new Animated.Value(0)).current;

  const lastContentOffsetY = useRef(0);
  // Alert.alert(lastContentOffsetY);
  const diffClamp = Animated.diffClamp(scrolling, 0, 100);
  const translation = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],

    // useNativeDriver: true,
  });

  useEffect(() => {
    setTimeout(() => {
      headerViewRef.current?.measureInWindow((fx, fy) => {
        console.log(fy);
      });
    }, 500);

    if (isPageFocused) {
      headerViewRef.current?.measureInWindow((fx, fy) => {
        console.log(fy);
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
            transform: [{translateY: translation}],
          },
        ]}>
        <View
          style={{
            backgroundColor: 'white',
            height: '50%',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={[
              {
                // backgroundColor: 'gray',
                width: '30%',
                height: '100%',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
              },
            ]}>
            <Image
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKPCRYnkX0JVZeJnPue73Kwd_8FjPi0bUpfpla4xHf7oEPqU9O23-i5y7xNnJ5dSs8Qlw&usqp=CAU',
              }}
              style={{width: 30, height: 30, marginLeft: 10}}
              resizeMode="contain"
            />
            <Text
              style={{
                marginLeft: 3,
                fontSize: 18,
                fontWeight: 'bold',
                color: 'black',
              }}>
              YouTube
            </Text>
          </View>
          <View
            style={[
              {
                width: '70%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },
            ]}>
            <View
              style={[
                {
                  backgroundColor: 'pink',
                  width: 50,
                  height: '100%',
                },
              ]}></View>
            <View
              style={[
                {
                  backgroundColor: 'pink',
                  width: 50,
                  height: '100%',
                },
              ]}></View>
            <View
              style={[
                {
                  backgroundColor: 'pink',
                  width: 50,
                  height: '100%',
                },
              ]}></View>
            <View
              style={[
                {
                  width: 50,
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <View
                style={[
                  {
                    backgroundColor: 'green',
                    width: 26,
                    height: 26,
                    borderRadius: 30,
                  },
                  styles.center,
                ]}>
                <Text style={{color: 'white', fontSize: 12}}>S</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'green',
            height: '50%',
            width: '100%',
          }}></View>
      </Animated.View>
      <Animated.ScrollView
        // onScroll={{}}
        bounces={true}
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
                animated: true,
              });
            } else if (fy < -75 && fy > -100) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY + (fy + 100),
                animated: true,
              });
            } else if (fy <= -1 && fy > -25) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY - (fy + 50),
                animated: true,
              });
            } else if (fy < -25 && fy > -75) {
              scrollViewRef.current?.scrollTo({
                x: 0,
                y: currentScrollY + (fy + 50),
                animated: true,
              });
            }
          });
        }}>
        {/* Content goes here */}

        <View
          style={{
            width: '100%',
            flex: 1,
            paddingBottom: 120,
            alignItems: 'center',
          }}>
          {new Array(50).fill(' ').map((item, index) => {
            return <Text key={index}>{index + 1}</Text>;
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

export default MyComponent;
