import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const OtpButton = ({title, onPress, backgroundColor}) => {
  const theme = useColorScheme();
  return (
    <View style={{marginTop: responsiveHeight(2)}}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.btn, {backgroundColor: backgroundColor}]}>
        <Text
          style={{
            color: theme === 'light' ? 'white' : 'black',
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpButton;

const styles = StyleSheet.create({
  btn: {
    height: responsiveHeight(7.2),
    width: responsiveWidth(90),
    borderRadius: responsiveHeight(1.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
