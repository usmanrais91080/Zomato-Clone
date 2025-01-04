import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const Search = () => {
  return (
    <View style={styles.inputcontainer}>
      <TextInput placeholder="Search..." style={{flex: 1}} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputcontainer: {
    width: '95%',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    alignSelf: 'center',
    marginTop: 10,
    paddingRight: 15,
  },
});
