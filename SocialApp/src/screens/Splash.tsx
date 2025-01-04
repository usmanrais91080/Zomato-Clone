import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {StackActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNav';
import auth from '@react-native-firebase/auth';
interface SplashProps {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
}

const Splash = ({navigation}: SplashProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        const isLogedIn = user !== null ? 'MainScreen' : 'SignUp';
        navigation.dispatch(StackActions.replace(isLogedIn));
      });
      return () => unsubscribe;
    }, 2000);
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: isDarkMode ? 'black' : 'white',
          fontSize: hp(4),
          fontWeight: 'bold',
        }}>
        Social App
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
