import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {ImageContext} from '../context/ImageContext';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
  const [uploadImg, setUploadImg] = useState(false);
  const {imageUri, setImageUri} = useContext(ImageContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  //show username under profile image
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setEmail(user.email || 'no email found');
      setUsername(user.displayName || 'No username found');
    }
  }, []);

  //select and upload image to firestore storage
  const selectAndUploadImg = async () => {
    try {
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setImageUri(response.uri);
      setUploadImg(true);

      const reference = storage().ref(`/zomatoProfile/${response.name}`);
      await reference.putFile(response.uri);

      await setImageUri(response.uri); //ye line is liye h k jab hum app refresh kren tu profile image baki rahe remvoe na ho asyncstorge me save ho
    } catch (error) {
      console.log('Failed to upload image', error);
    } finally {
      setUploadImg(false);
    }
  };

  return (
    <View style={{marginTop: responsiveHeight(4), alignItems: 'center'}}>
      {/* profile image and user email */}
      <TouchableOpacity>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.profile} />
        ) : (
          <View style={styles.profileBg}>
            <Image
              source={require('../assets/images/camera.png')}
              style={styles.profileCameraIcon}
            />
          </View>
        )}
        {/* email */}
        <Text style={{color: 'red'}}>{email}</Text>
        <Text style={{color: 'red'}}>{username}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.cameraBg}
        onPress={() => selectAndUploadImg()}>
        <Image
          source={require('../assets/images/camera.png')}
          style={styles.camIcon}
        />
      </TouchableOpacity>
      {/* <Text style={{color: 'ref'}}>
        {uploadImg ? 'Uploading...' : 'Select and Upload Image'}
      </Text> */}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profile: {
    height: responsiveHeight(13),
    width: responsiveWidth(26),
    borderRadius: responsiveHeight(10),
  },
  cameraBg: {
    height: responsiveHeight(3),
    width: responsiveWidth(6),
    backgroundColor: 'rgba(184, 182, 182, 0.9)',
    position: 'absolute',
    right: responsiveWidth(37),
    top: responsiveHeight(5),
    borderRadius: responsiveHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  camIcon: {
    height: responsiveHeight(1.5),
    width: responsiveWidth(3),
  },
  profileBg: {
    height: responsiveHeight(13),
    width: responsiveWidth(26),
    backgroundColor: Colors.gray,
    borderRadius: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCameraIcon: {
    height: responsiveHeight(6),
    width: responsiveWidth(12),
    tintColor: 'gray',
    opacity: 0.7,
  },
});
