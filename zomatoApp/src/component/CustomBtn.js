import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const CustomBtn = ({
  onPress,
  title,
  leftIcon,
  backgroundColor,
  width,
  titleColor,
  fontWeight,
  isloading,
}) => {
  return (
    <View style={{marginTop: responsiveHeight(2), gap: 20}}>
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: backgroundColor, width: width}]}
        onPress={onPress}>
        <View style={{marginRight: responsiveWidth(3.8)}}>{leftIcon}</View>
        {isloading ? (
          <ActivityIndicator size={30} color={'white'} />
        ) : (
          <Text
            style={{
              fontWeight: '400',
              letterSpacing: responsiveWidth(0.3),
              color: titleColor,
              fontWeight: fontWeight,
            }}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btn: {
    height: responsiveHeight(7.2),
    // width: responsiveWidth(90),
    alignSelf: 'center',
    backgroundColor: 'green',
    borderRadius: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
