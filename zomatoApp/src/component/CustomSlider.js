import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import {ImageContext} from '../context/ImageContext'; // adjust the path
import {StackActions, useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const CustomSlider = props => {
  const navigation = useNavigation();
  const {imageUri} = useContext(ImageContext); // use context

  /*    ************ log out handle *********** */
  const handleLogOut = async () => {
    try {
      await auth().signOut;
      navigation.dispatch(StackActions.replace('ZomatoOtp'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <View style={styles.profileBg}>
          <Image
            source={imageUri ? {uri: imageUri} : null}
            style={styles.profile}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen')}>
            <Text style={styles.name}>Usman</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logoutView}>
        <TouchableOpacity onPress={handleLogOut}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  profileBg: {
    flex: 1,
    height: responsiveHeight(20),
    width: '100%',
    backgroundColor: Colors.primary,
    top: responsiveHeight(-0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profile: {
    height: responsiveHeight(10),
    width: responsiveWidth(20),
    borderRadius: responsiveHeight(5),
  },
  logoutView: {
    marginTop: responsiveHeight(45),
    marginLeft: responsiveWidth(4),
  },
  logoutText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: '700',
    color: 'black',
  },
  name: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
});
