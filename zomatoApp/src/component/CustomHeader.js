import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import {useNavigation} from '@react-navigation/native';
import {ImageContext} from '../context/ImageContext';

const CustomHeader = () => {
  const navigation = useNavigation();
  const {imageUri} = useContext(ImageContext);
  return (
    <View style={{paddingHorizontal: responsiveWidth(3)}}>
      <View style={styles.mainView}>
        <Image
          source={require('../assets/images/location.png')}
          style={styles.locationIcon}
        />
        <View style={{flex: 1}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: responsiveFontSize(1.8),
            }}>
            Home
          </Text>
          <Text style={{color: Colors.ligthGray}}>A-404/B-69 Main Road...</Text>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation.openDrawer()} // Open the drawer
        >
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.profileImage} />
          ) : (
            <View style={styles.profileBg}>
              <Image
                source={require('../assets/images/camera.png')}
                style={styles.profileCameraIcon}
              />
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  locationIcon: {
    height: responsiveHeight(3),
    width: responsiveWidth(5),
    marginRight: responsiveWidth(2),
    tintColor: Colors.primary,
  },
  profileIcon: {
    width: responsiveWidth(10),
    height: responsiveHeight(5),
    // borderWidth: responsiveHeight(0.2),
    borderColor: Colors.primary,
    borderRadius: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: responsiveHeight(5),
  },
  profileBg: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCameraIcon: {
    height: '50%',
    width: '50%',
    tintColor: 'gray',
    opacity: 0.7,
  },
});
