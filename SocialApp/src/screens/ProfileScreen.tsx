import {
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {ActivityIndicator} from 'react-native';

const ProfileScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [imgData, setImgData] = useState<string | null>(null);
  const [pickedImg, setPickedImg] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  // Function to handle camera opening
  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log('Camera permission denied');
      return;
    }

    // get this user id stored in asynstorage from sign up screen
    const storedUserId = await AsyncStorage.getItem('USER_ID');

    if (!storedUserId) {
      console.error('No USER_ID found in AsyncStorage');
      return;
    }

    setIsLoading(true);
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
      });

      console.log('Camera response:', response);

      if (response.didCancel) {
        console.log('User cancelled the camera');
        setIsLoading(false);
        return;
      }

      if (response.error) {
        console.log('Camera error: ', response.error);
        setIsLoading(false);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const uri: string = response.assets[0].uri;
        setImgData(uri); // Update image data
        setPickedImg(true);
      } else {
        console.log('No assets found in response');
      }
    } catch (error) {
      console.error('Error opening camera:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle gallery opening
  const openGallery = async () => {
    const storedUserId = await AsyncStorage.getItem('USER_ID');

    if (!storedUserId) {
      console.error('No USER_ID found in AsyncStorage');
      return;
    }

    setIsLoading(true);
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });

      console.log('Gallery response:', response);

      if (response.didCancel) {
        console.log('User cancelled the gallery');
        setIsLoading(false);
        return;
      }

      if (response.error) {
        console.log('Gallery error: ', response.error);
        setIsLoading(false);
        return;
      }

      if (response.assets && response.assets.length > 0) {
        const uri: any = response.assets[0].uri;
        setImgData(uri); // Update image data
        setPickedImg(true);
      } else {
        console.log('No assets found in response');
      }
    } catch (error) {
      console.error('Error opening gallery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle image upload to Firebase
  const uploadImageToFirebase = async (uri: string, storedUserId: string) => {
    try {
      setIsLoading(true); // Start loading
      const fileName = uri.split('/').pop();
      const reference = storage().ref(`/users/${fileName}`);
      await reference.putFile(uri);

      // Get download URL
      const url = await reference.getDownloadURL();
      console.log('Image URL:', url);

      // Update the user's ProfilePic in the users collection
      await firestore().collection('users').doc(storedUserId).update({
        ProfilePic: url,
      });
      setImgData(url); // Update local image data to show the uploaded image
      setPickedImg(false); // Reset state after saving
    } catch (error) {
      console.error('Error uploading image to Firebase:', error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Handle Edit Profile Button Click
  const handleEditProfile = () => {
    setShowModal(true);
  };

  // User email logic
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setEmail(user.email || 'no user found');
      // Set profile picture if available
      const userId = user.uid;
      // get profile image from firestroe
      const fetchProfilePic = async () => {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          const profilePicUrl = userDoc.data()?.ProfilePic;
          if (profilePicUrl) {
            setImgData(profilePicUrl); // Set profile picture from Firestore
          }
        }
      };
      fetchProfilePic();
    }
  }, []);

  // Logout
  const handleLogout = async () => {
    await auth().signOut();
    navigation.dispatch(StackActions.replace('SignUp'));
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* Modal */}
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        backdropOpacity={0.5}>
        <View style={styles.modalStyle}>
          <TouchableOpacity
            style={styles.openCamera}
            onPress={() => {
              setShowModal(false);
              openCamera();
            }}>
            <Text style={styles.openCameraTxt}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.openGallery}
            onPress={() => {
              setShowModal(false);
              openGallery(); // Open gallery when button is pressed
            }}>
            <Text style={styles.openCameraTxt}>Open Gallery</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleEditProfile}>
          {isLoading ? (
            <ActivityIndicator size={25} color={'black'} />
          ) : (
            <Image
              source={
                imgData ? {uri: imgData} : require('../assets/profile.png')
              }
              style={styles.profile}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          const storedUserId = await AsyncStorage.getItem('USER_ID');
          if (pickedImg && imgData && storedUserId) {
            await uploadImageToFirebase(imgData, storedUserId); // Upload image when "Save Pic" is clicked
          } else {
            handleEditProfile(); // Open modal if no image is picked
          }
        }}>
        <Text style={styles.btnTxt}>
          {pickedImg ? 'Save Pic' : 'Edit Profile'}
        </Text>
      </TouchableOpacity>

      {/* Username */}
      <TouchableOpacity>
        <Text style={{color: 'red'}}>{email}</Text>
      </TouchableOpacity>

      <View style={{flex: 0.5}} />

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutbtn}>
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            marginTop: 15,
            fontWeight: 'bold',
          }}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profile: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  button: {
    width: '50%',
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 0.8,
    marginBottom: 20,
    borderRadius: 1020,
  },
  btnTxt: {
    fontSize: 18,
  },
  modalStyle: {
    height: 200,
    width: '70%',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  openCamera: {
    width: '50%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: 'black',
    marginTop: 8,
  },
  openCameraTxt: {
    fontSize: 15,
    fontWeight: '600',
  },
  openGallery: {
    width: '50%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderRadius: 5,
    borderColor: 'black',
    marginTop: 8,
  },
  logoutbtn: {
    width: '40%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 10,
  },
});
