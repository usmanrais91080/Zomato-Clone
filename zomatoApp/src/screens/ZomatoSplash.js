import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../constant/colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {StackActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const ZomatoSplash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      const unsubscribe = await auth().onAuthStateChanged(user => {
        const isUserLogin = user !== null ? 'ZomatoMainScreen' : 'ZomatoOtp';
        navigation.dispatch(StackActions.replace(isUserLogin));
      });
      return () => unsubscribe();
    }, 2000);
  });
  return (
    <View style={styles.conatner}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default ZomatoSplash;

const styles = StyleSheet.create({
  conatner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    // backgroundColor: 'red',
  },
  logo: {
    height: responsiveScreenHeight(20),
    width: responsiveWidth(55),
  },
});
