import {StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';

const CustomInput = ({
  placeholder,
  placeholderTextColor,
  keyboardType,
  width,
  onChangeText,
  value,
  countryCode,
}) => {
  const isDardMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.container, {width: width}]}>
      {countryCode && (
        <Text
          style={{
            color: isDardMode ? 'black' : 'white',
            fontWeight: '700',
            fontSize: responsiveHeight(2),
          }}>
          +92
        </Text>
      )}
      <TextInput
        keyboardType={keyboardType}
        // maxLength={11}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={{
          fontSize: responsiveHeight(2),
          fontWeight: '400',
          // opacity: 0.4,
          color: 'black',
          flex: 1,
        }}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(7),
    // width: responsiveWidth(72),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveHeight(1.3),
    alignSelf: 'center',
    paddingLeft: responsiveWidth(3.5),
    paddingRight: responsiveWidth(3.5),
    shadowColor: '#000',
    shadowOffset: {
      width: -4,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,

    elevation: 2,
    borderWidth: responsiveHeight(0.1),
    borderColor: Colors.ligthGray,
    // marginTop: responsiveHeight(1.3),
  },
});
