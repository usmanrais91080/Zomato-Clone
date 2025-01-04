import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {requiestCameraPermession, pickImage} from '../utils/CameraPermission';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {ImageCard} from '../component';
import ProfileImage from '../component/ProfileImage';

const Home = () => {
  const [email, setEmail] = useState('');
  const [imageUri, setImgUri] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch the user email
  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setEmail(user.email || 'no user found');
    }
  }, []);

  // Upload image to Firebase Storage and get the URL
  const uploadImage = async uri => {
    if (uri) {
      setLoading(true);
      const user = auth().currentUser;
      const fileName = `${user.uid}_${new Date().getTime()}.jpg`;
      const storageRef = storage().ref(`images/${fileName}`);

      try {
        // Upload the image
        const uploadTask = storageRef.putFile(uri);
        uploadTask.on('state_changed', snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress.toFixed(2)}% done`);
        });

        // Wait until upload completes
        await uploadTask;

        // Get the download URL of the uploaded image
        const downloadUrl = await storageRef.getDownloadURL();
        console.log('Image uploaded to Firebase Storage: ', downloadUrl);

        // Save the URL to Firestore
        await firestore().collection('posts').add({
          email: email,
          userId: user.uid,
          imageUrl: downloadUrl,
          timestamp: firestore.FieldValue.serverTimestamp(),
        });

        // Fetch the updated posts from Firestore
        fetchPosts();
      } catch (error) {
        console.error('Error uploading image: ', error);
      } finally {
        setLoading(false); // Hide the loader after upload is finished
      }
    }
  };

  // Fetch all posts from Firestore
  const fetchPosts = async () => {
    try {
      const snapshot = await firestore().collection('posts').get();
      const posts = snapshot.docs.map(doc => doc.data());
      setUploadedImages(posts); // Update the state with the list of posts
    } catch (error) {
      console.error('Error fetching posts: ', error);
    }
  };

  // Load posts when the screen is loaded
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={{flex: 1, paddingHorizontal: 10}}>
      {/* profile image */}
      <ProfileImage
        imageUri={imageUri}
        setImgUri={setImgUri}
        uploadImage={uploadImage}
      />
      <Text style={styles.email}>{email}</Text>

      {loading ? (
        <ActivityIndicator size={25} color={'red'} style={styles.loader} />
      ) : (
        <View style={{marginTop: 50}}>
          <FlatList
            numColumns={2}
            data={uploadedImages} // Data from Firestore
            renderItem={({item}) => <ImageCard item={item} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

export default Home;

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
  email: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
  loader: {
    marginTop: 20,
  },
});
