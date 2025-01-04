import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DrawerNavi} from '../navigations/DrawerNavi';
import {BottomTab} from '../navigations/BottomTab';

const ZomatoMainScreen = () => {
  return (
    <View style={{flex: 1}}>
      <DrawerNavi />
    </View>
  );
};

export default ZomatoMainScreen;

const styles = StyleSheet.create({});
