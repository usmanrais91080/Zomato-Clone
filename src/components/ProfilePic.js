import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomIcons from './CustomIcons';
import {COLORS} from '../theme/theme';

const ProfilePic = () => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <TouchableOpacity style={styles.ImgBg}>
        <Image
          source={require('../assets/app_images/avatar.png')}
          style={styles.img}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePic;

const styles = StyleSheet.create({
  ImgBg: {
    height: 30,
    width: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primaryGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 30,
    width: 30,
    borderRadius: 10,
  },
});
