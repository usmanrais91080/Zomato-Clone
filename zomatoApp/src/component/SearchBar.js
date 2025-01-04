import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';

const SearchBar = ({
  placeholder,
  placeholderTextColor,
  keyboardType,
  width,
  onChangeText,
  value,
  leftIcon,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={{paddingHorizontal: responsiveWidth(3)}}>
      <View style={[styles.container, {width: width}]}>
        <View style={{marginRight: responsiveWidth(2)}}>{leftIcon}</View>
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
            opacity: 0.4,
            color: isDarkMode ? Colors.black : Colors.white,
            flex: 1,
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(5.5),
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
      width: 9,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,

    elevation: 2,
    borderWidth: responsiveHeight(0.12),
    borderColor: '#d9d9d9',
    marginTop: Platform.OS == 'ios' ? responsiveHeight(4) : responsiveHeight(2),
  },
});
