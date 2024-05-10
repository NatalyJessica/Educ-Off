import React from 'react';
import { View,  StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import Welcome1 from './Welcome1';
import Welcome2 from './Welcome2';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function WelcomeScreen(){
  return (
    
    <KeyboardAwareScrollView>
    <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <View style={styles.slide}>
        <Welcome1 />
      </View>
      <View style={styles.slide}>
        <Welcome2 />
      </View>
    </Swiper>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  
  },
});
