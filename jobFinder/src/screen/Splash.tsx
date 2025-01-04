import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNavi';

type SplashProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

const Splash = ({navigation}: SplashProps) => {
  const isDark = useColorScheme() === 'dark';

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '900',
          color: isDark ? 'white' : 'black',
        }}>
        Job Finder{' '}
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
