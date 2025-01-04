import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const CartHeader = ({onPress, title}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={{flex: 0.5}}>
        <Image
          source={require('../assets/images/back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: 'black',
          fontWeight: '900',
          fontSize: responsiveFontSize(2),
        }}>
        {title}
      </Text>
    </View>
  );
};

export default CartHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  backIcon: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
  },
});
