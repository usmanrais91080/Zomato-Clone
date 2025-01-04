import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNav';

let token = '';
let name: string | null = '';
let email: string | null = '';

interface AddProps {
  navigation: StackNavigationProp<RootStackParamList, 'MainScreen'>;
}

const AddScreen = ({navigation}: AddProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [imgData, setImgData] = useState<null | string>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Get FCM token and user details
  const getFcmTokenAndUserDetails = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      //get name and email from sign up screen stored in asynstorage
      const storedName = await AsyncStorage.getItem('NAME');
      const storedEmail = await AsyncStorage.getItem('EMAIL');
      const storedUserId = await AsyncStorage.getItem('USER_ID');
      setName(storedName);
      setEmail(storedEmail);
      setUserId(storedUserId);
    } catch (error) {
      console.error('Error retrieving FCM token or user details:', error);
    }
  };

  useEffect(() => {
    getFcmTokenAndUserDetails();
  }, []);

  // Open camera
  const openCamera = async () => {
    const id: any = uuid.v4();
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
      });

      if (response.didCancel) {
        console.log('User cancelled the camera');
        return; // Early exit if the user cancels
      }

      if (response.error) {
        console.log('Camera error: ', response.error);
        return; // Handle the error accordingly
      }

      if (response.assets && response.assets.length > 0) {
        const uri: any = response.assets[0].uri;
        setImgData(uri);
        setUploading(true);

        // Upload to Firebase Storage
        const fileName = response.assets[0].fileName || 'default.jpg';
        const reference = storage().ref(`/socialAppPhoto/${fileName}`);
        await reference.putFile(uri);

        const url = await reference.getDownloadURL();
        console.log('Camera Image URL:', url);

        // Save all image URLs in Firestore
        await firestore().collection('imgUrls').doc(id).set({
          image: url,
          name: name,
          email: email,
          FCMtoken: fcmToken,
          userId: userId,
          postId: id,
          likes: [],
          comments: [],
        });
        console.log('Image URL saved to Firestore from camera.');
        navigation.navigate('HomeScreen', {newPost: true}); // yhna newPost name mene khud se diya yhna kuch name de skte hn iska mtlb h k jab koi new post add ho jaye tu ye back homescreen navigate krega or jb homescreen navigate ho jaye tu homescreen ko refresh ni krna pare ga means k jo post kiya h osko screen pr show krne k liye khud refresh ho jaye ga isk liye homsreen pr useFocusEffect hook use kiya h
      }
    } catch (error) {
      console.log('Error uploading image from camera:', error);
    } finally {
      setUploading(false);
    }
  };

  // Open gallery
  const openGallery = async () => {
    const id: any = uuid.v4();
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });
      if (response.assets && response.assets.length > 0) {
        const uri: any = response.assets[0].uri;
        setImgData(uri);
        setUploading(true);

        // Upload to Firebase Storage
        const fileName = response.assets[0].fileName || 'default.jpg';
        const reference = storage().ref(`/socialAppPhoto/${fileName}`);
        await reference.putFile(uri);
        navigation.navigate('HomeScreen', {newPost: true}); // yhna newPost name mene khud se diya yhna kuch name de skte hn iska mtlb h k jab koi new post add ho jaye tu ye back homescreen navigate krega or jb homescreen navigate ho jaye tu homescreen ko refresh ni krna pare ga means k jo post kiya h osko screen pr show krne k liye khud refresh ho jaye ga isk liye homsreen pr useFocusEffect hook use kiya h

        const url = await reference.getDownloadURL();
        console.log('Gallery Image URL:', url);

        // Save images url to Firestore
        await firestore().collection('imgUrls').doc(id).set({
          image: url,
          name: name,
          email: email,
          FCMtoken: fcmToken,
          userId: userId,
          postId: id,
          likes: [],
          comments: [],
        });
        console.log('Image URL saved to Firestore from gallery.');
      }
    } catch (error) {
      console.log('Error uploading image from gallery:', error);
    } finally {
      setUploading(false);
    }
  };

  // show all img urls lists
  firestore()
    .collection('imgUrls')
    .get()
    .then(querySnapshot => {
      console.log('Total posts: ', querySnapshot.size);

      querySnapshot.forEach(documentSnapshot => {
        console.log('Post ID: ', documentSnapshot.id, documentSnapshot.data());
      });
    });

  return (
    <View style={{flex: 1, marginTop: 10}}>
      {/* header */}
      <View style={styles.header}>
        <Text
          style={{
            color: isDarkMode ? 'black' : 'white',
            fontSize: 23,
            fontWeight: '500',
          }}>
          Post
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: isDarkMode ? '#097eeb' : 'white',
              fontSize: 23,
              fontWeight: '500',
            }}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      {/* line */}
      <View
        style={{borderBottomWidth: 0.6, borderColor: '#b8b8b8', marginTop: 5}}
      />

      {/* Image container */}
      <View style={styles.imageContainer}>
        {uploading ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? '#000000' : '#ffffff'}
            style={styles.indicator}
          />
        ) : imgData ? (
          <Image
            source={{uri: imgData}}
            style={{height: 65, width: 65, borderRadius: 5}}
          />
        ) : (
          <Image
            source={require('../assets/imageplaceholder.png')}
            style={{height: 65, width: 65, borderRadius: 5}}
          />
        )}
      </View>
      {/* camera */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          openCamera();
        }}>
        <Image
          source={require('../assets/cameraoutline.png')}
          style={styles.icon}
        />
        <Text
          style={{
            color: isDarkMode ? 'black' : 'white',
            fontSize: 18,
            fontWeight: '400',
          }}>
          Open Camera
        </Text>
      </TouchableOpacity>

      {/* line */}
      <View
        style={{borderBottomWidth: 0.6, borderColor: '#b8b8b8', marginTop: 5}}
      />
      {/* Open gallery */}
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Image source={require('../assets/gallery.png')} style={styles.icon} />
        <Text
          style={{
            color: isDarkMode ? 'black' : 'white',
            fontSize: 18,
            fontWeight: '400',
            marginBottom: 10,
          }}>
          Open Gallery
        </Text>
      </TouchableOpacity>

      {/* line */}
      <View
        style={{borderBottomWidth: 0.6, borderColor: '#b8b8b8', marginTop: 5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#b8b8b8',
    width: '90%',
    marginTop: 40,
    alignSelf: 'center',
    height: 170,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  icon: {
    height: 30,
    width: 30,
  },
  indicator: {
    position: 'absolute',
    top: '16%',
    left: '8%',
  },
});

export default AddScreen;
