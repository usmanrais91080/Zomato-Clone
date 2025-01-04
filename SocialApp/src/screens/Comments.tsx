import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const Comments = () => {
  // State to hold the current comment input
  const [comment, setComment] = useState<string>('');
  // State to hold all comments for the post, structured as an array of objects
  const [comments, setComments] = useState<
    {userId: string; text: string; profilePic: string}[]
  >([]);
  // Get the current route to access parameters
  const route = useRoute();
  // Extract postId from route parameters
  const postId = route.params.postId;

  // Fetch comments when the component mounts or when route parameters change
  useEffect(() => {
    const fetchComments = async () => {
      // Get existing comments passed from the previous screen
      const postComments = route.params.comments || [];
      // Update state with fetched comments
      setComments(postComments);
    };

    fetchComments(); // Call the function to fetch comments
  }, [route.params.comments]); // Re-run effect if comments in route change

  // Function to submit a new comment
  const postComment = async () => {
    // Check if the comment input is not empty
    if (comment.trim()) {
      try {
        // Get user ID from AsyncStorage
        const userId = (await AsyncStorage.getItem('USER_ID')) || 'Anonymous';
        // Fetch user's profile picture from Firestore
        const userDoc = await firestore().collection('users').doc(userId).get();
        const profilePic = userDoc.exists
          ? userDoc.data()?.ProfilePic || ''
          : '';

        // Create a new comment object with userId, text, and profile picture URL
        const newComment = {
          userId: userId, // Store the user ID
          text: comment, // Store the comment text
          profilePic: profilePic, // Store the profile picture URL
        };

        // Create a new array with the existing comments and the new comment
        const updatedComments = [...comments, newComment];

        // Update the Firestore document with the new comments array
        await firestore().collection('imgUrls').doc(postId).update({
          comments: updatedComments,
        });

        // Update local state to reflect the new comments
        setComments(updatedComments);
        // Clear the input field after submission
        setComment('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={comments} // Data source for the FlatList
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              padding: 6,
              gap: 10,
              alignItems: 'center',
            }}>
            <Image
              source={
                item.profilePic
                  ? {uri: item.profilePic}
                  : require('../assets/profile.png')
              } // Display profile picture or default image
              style={{height: 40, width: 40, borderRadius: 20}} // Add borderRadius for circular profile image
            />
            <Text style={{color: 'black'}}>{item.text}</Text>
            {/* Display the comment text */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
      />
      <View style={styles.inputCont}>
        <TextInput
          style={styles.textInput} // Apply styles to the TextInput
          placeholder="Type comment" // Placeholder text for the input
          placeholderTextColor={'black'} // Color for placeholder text
          value={comment} // Controlled input value
          onChangeText={setComment} // Update comment state on text change
        />
        <TouchableOpacity onPress={postComment}>
          {/* Button to submit the comment */}
          <Text style={{color: 'blue', fontWeight: '700'}}>Send</Text>
          {/* Button text */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comments;

const styles = StyleSheet.create({
  inputCont: {
    flexDirection: 'row', // Arrange children in a row
    width: '100%', // Full width of the screen
    height: 55, // Height of the input container
    alignItems: 'center', // Center items vertically
    backgroundColor: 'white', // Background color of the input container
    position: 'absolute', // Position the input at the bottom
    bottom: 0, // Align to the bottom
    justifyContent: 'space-between', // Space items evenly
    paddingLeft: 10, // Left padding
    paddingRight: 15, // Right padding
  },
  textInput: {
    flex: 1, // Take up all available space
    marginRight: 10, // Space between input and button
    borderRadius: 25, // Rounded corners
    paddingHorizontal: 10, // Padding inside the input
  },
});
