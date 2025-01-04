import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProductCard = ({item}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: item.picture.large}} style={styles.img} />
      <View>
        <Text style={styles.name}>{item.name.first}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
    width: '90%',
    height: 50,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    paddingRight: 10,
    alignSelf: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  email: {
    fontSize: 13,
    color: 'grey',
  },
});
