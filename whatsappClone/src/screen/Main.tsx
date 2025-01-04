import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Search from '../component/Search';

import Header from '../component/Header';
import {BottomTab} from '../navigation/WhatsAppBottom';

// LINK FROM WHERE I HAVE LEARNED THIS
// https://www.youtube.com/watch?v=xhqZEmTlCAA&list=PL0kn01TUe2p9qi0pktqcWBnwfpHG7mZSq&index=6
const Main = () => {
  return (
    <View style={{flex: 1}}>
      <BottomTab />
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({});
