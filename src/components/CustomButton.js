import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../theme/theme';

const CustomButton = ({title, onPress, isloading}) => {
  return (
    <View>
      <TouchableOpacity style={styles.btnContaner} onPress={onPress}>
        {isloading ? (
          <ActivityIndicator size={25} color={'white'} />
        ) : (
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: hp(1.9),
              fontFamily: 'Poppins-Medium.ttf',
            }}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnContaner: {
    height: hp(6.1),
    width: wp(50),
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(1.5),
  },
});
