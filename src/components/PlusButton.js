import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcons from './CustomIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../theme/theme';
const PlusButton = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
        <CustomIcons name="add" size={hp(1.5)} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  btnContainer: {
    height: hp(2.8),
    width: wp(5.8),
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
});
