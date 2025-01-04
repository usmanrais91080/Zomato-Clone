import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';

export default function DocumentPick() {
  const [getImg, setGetImg] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageSelectionAndUpload = async () => {
    try {
      //this method is used to pick image from gallery
      const response = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setGetImg(response);
      console.log(response);
      setUploading(true);

      //this method is used to upload image to firestore storage
      const reference = storage().ref(`/myImages/${response.name}`); //yhna ye 'myImages' firestore me storage me ik folder h
      await reference.putFile(response.uri);
      Alert.alert('Upload Successful', 'Image has been uploaded successfully');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: 'plum',
      }}>
      {getImg ? (
        <Image
          source={{uri: getImg.uri}}
          style={{height: 250, width: 250, marginBottom: 20}}
        />
      ) : (
        <Text>No Image Found</Text>
      )}
      {/* button */}
      <TouchableOpacity
        style={{
          width: '50%',
          height: 45,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
        onPress={handleImageSelectionAndUpload}
        disabled={uploading}>
        <Text>{uploading ? 'Uploading...' : 'Select and Upload Image'}</Text>
      </TouchableOpacity>
    </View>
  );
}
