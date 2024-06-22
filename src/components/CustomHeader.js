import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import CustomIcons from './CustomIcons';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import {heightPercentageToDP} from 'react-native-responsive-screen';

const CustomHeader = ({LeftIcon, RightIcon, onPress, title}) => {
  return (
    <View style={style.conataner}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 4, y: 2}}
          style={style.menuBg}
          colors={[COLORS.primaryDarkGreyHex, COLORS.primaryDarkGreyHex]}>
          {LeftIcon}
        </LinearGradient>
      </TouchableOpacity>
      <Text
        style={{
          fontSize: heightPercentageToDP(3),
          fontWeight: '600',
          color: 'white',
        }}>
        {title}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 4, y: 2}}
          style={style.menuBg}
          colors={[COLORS.primaryDarkGreyHex, COLORS.primaryDarkGreyHex]}>
          {RightIcon}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
export const style = StyleSheet.create({
  conataner: {
    marginTop: heightPercentageToDP(4.5),
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  menuBg: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primaryGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
