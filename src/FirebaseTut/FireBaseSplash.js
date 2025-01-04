import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackActions, useNavigation} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const FireBaseSplash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      const unsubscribe = await Auth().onAuthStateChanged(user => {
        const isUserLogin = user !== null ? 'HomeScreen2' : 'SignIn';
        navigation.dispatch(StackActions.replace(isUserLogin));
      });
      return () => unsubscribe();
    }, 1500);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'red'}}>
        FireBaseSplash
      </Text>
    </View>
  );
};

export default FireBaseSplash;
