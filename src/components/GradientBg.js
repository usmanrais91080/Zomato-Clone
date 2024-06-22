import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';

const GradientBg = () => {
  return (
    <View style={{marginTop: hp(1.7), paddingHorizontal: hp(1)}}>
      <LinearGradient
        start={{x: 0.7, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.secondaryDarkGreyHex, COLORS.primaryBlackHex]}
        style={styles.gradinetView}></LinearGradient>
    </View>
  );
};

export default GradientBg;

const styles = StyleSheet.create({
  gradinetView: {
    width: wp(90),
    height: hp(33),
    alignSelf: 'center',
    borderRadius: hp(3),
  },
});
