import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {style} from '../../src/components/CustomHeader';
import axios from 'axios';

const SearchBar = ({onPress}) => {
  return (
    <View style={{paddingHorizontal: 15, marginTop: 10}}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <TextInput placeholder="Search users..." />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    paddingLeft: 10,
    elevation: 5,
    paddingRight: 10,
  },
  searchIcon: {
    height: 20,
    width: 20,
  },
});
