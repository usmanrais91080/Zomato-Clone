import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomIcons from './CustomIcons';
import {COLORS} from '../theme/theme';
const CustomSearchBar = () => {
  return (
    <View style={{paddingHorizontal: 10, marginTop: hp(3)}}>
      <View style={styles.inputContainer}>
        <CustomIcons
          name="search"
          size={hp(3.5)}
          color={COLORS.primaryLightGreyHex}
        />
        <TextInput
          placeholder="Find your Coffee.."
          style={{
            flex: 0.9,
            paddingLeft: wp(4),
            color: COLORS.primaryLightGreyHex,
          }}
          placeholderTextColor={COLORS.primaryLightGreyHex}
        />
      </View>
    </View>
  );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    width: '98%',
    height: hp(6.4),
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: hp(1.5),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: wp(5),
    alignSelf: 'center',
  },
});
