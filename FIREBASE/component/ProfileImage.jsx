// components/ProfileImage.js
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {requiestCameraPermession, pickImage} from '../utils/CameraPermission';

const ProfileImage = ({imageUri, setImgUri, email, uploadImage}) => {
  const handleImageSelection = async () => {
    const hasPermission = await requiestCameraPermession();
    if (!hasPermission) {
      console.log('Storage permission denied');
      return;
    }

    try {
      const uri = await pickImage();
      setImgUri(uri); // Set the image URI
      uploadImage(uri); // Call function to upload the image
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <View style={styles.profilecontainer}>
      <TouchableOpacity onPress={handleImageSelection}>
        <Image
          source={
            imageUri
              ? {uri: imageUri}
              : require('../../zomatoApp/src/assets/images/profileFill.png')
          }
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profilecontainer: {
    width: 100,
    height: 100,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

export default ProfileImage;
