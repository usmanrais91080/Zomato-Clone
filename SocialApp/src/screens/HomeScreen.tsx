import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNav';

type HomeProps = {
  navigation: StackNavigationProp<RootStackParamList, 'MainScreen'>;
};

interface StateProps {
  name: string;
  image: string;
  comments: string[]; // Assuming comments are stored as an array of strings
  likes: string[];
}

const HomeScreen = ({navigation}: HomeProps) => {
  const [data, setData] = useState<StateProps[]>([]);
  const [userId, setUserId] = useState<null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null); // Track which post is being commented on

  const getUserId = async () => {
    const storedUserId = await AsyncStorage.getItem('USER_ID');
    setUserId(storedUserId);
  };

  const getDataFromFirestore = async () => {
    const querySnapshot = await firestore().collection('imgUrls').get();
    let tempData: any = [];
    querySnapshot.forEach(documentSnapshot => {
      tempData.push({id: documentSnapshot.id, ...documentSnapshot.data()});
    });
    setData(tempData);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserId();
      getDataFromFirestore();
    }, []),
  );

  const likesStatus = (likes: any) => {
    return likes.includes(userId);
  };

  const onLikeClick = (item: any) => {
    const updatedLikes = likesStatus(item.likes)
      ? item.likes.filter((id: number) => id !== userId)
      : [...item.likes, userId];

    firestore().collection('imgUrls').doc(item.id).update({
      likes: updatedLikes,
    });

    const updatedData: any = data.map((post: any) =>
      post.id === item.id ? {...post, likes: updatedLikes} : post,
    );
    setData(updatedData);
  };

  const handleCommentChange = (text: string) => {
    setNewComment(text);
  };

  const addComment = async () => {
    if (newComment && selectedPostId) {
      const updatedComments = [
        ...data.find(item => item.id === selectedPostId)?.comments,
        newComment,
      ];

      await firestore()
        .collection('imgUrls')
        .doc(selectedPostId)
        .update({comments: updatedComments});

      // Update local state
      const updatedData = data.map(post =>
        post.id === selectedPostId
          ? {...post, comments: updatedComments}
          : post,
      );
      setData(updatedData);
      setNewComment(''); // Clear input
      setSelectedPostId(null); // Reset selected post
    }
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headertxt}>Social App</Text>
      </View>
      {/* FlatList to display fetched data */}
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ScrollView style={{marginTop: 10, paddingHorizontal: 10}}>
              <View style={styles.card}>
                {/* Profile and name */}
                <View style={{flexDirection: 'row', padding: 10, gap: 15}}>
                  <Image
                    source={require('../assets/profile.png')}
                    style={{height: 40, width: 40}}
                  />
                  <Text style={{color: 'red', alignSelf: 'center'}}>
                    {item.name}
                  </Text>
                </View>
                {/* Image */}
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: '90%',
                    height: 180,
                    alignSelf: 'center',
                    borderRadius: 10,
                  }}
                />
                {/* Likes and comments */}
                <View style={styles.likeAndCommentContainer}>
                  {/* Likes */}
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => onLikeClick(item)}>
                    <Text style={{color: 'black', marginRight: 10}}>
                      {item.likes.length}
                    </Text>
                    {likesStatus(item.likes) ? (
                      <Image
                        source={require('../assets/heartFill.png')}
                        style={{height: 25, width: 25}}
                      />
                    ) : (
                      <Image
                        source={require('../assets/heartOutline.png')}
                        style={{height: 25, width: 25}}
                      />
                    )}
                  </TouchableOpacity>
                  {/* Comments */}
                  <TouchableOpacity
                    style={{flexDirection: 'row'}}
                    onPress={() => {
                      navigation.navigate('Comments', {
                        postId: item.id,
                        comments: item.comments,
                      });
                    }}>
                    <Text style={{color: 'black', marginRight: 10}}>
                      {item.comments.length} {/* Display comment count */}
                    </Text>
                    <Image
                      source={require('../assets/comment.png')}
                      style={{height: 25, width: 25}}
                    />
                  </TouchableOpacity>
                </View>
                {/* Add Comment Section */}
                {/* <View style={styles.comment}>
                  <TextInput
                    placeholder="Add a comment..."
                    value={selectedPostId === item.id ? newComment : ''}
                    onChangeText={handleCommentChange}
                    onFocus={() => setSelectedPostId(item.id)} // Set the post ID when focusing
                    style={{flex: 1, padding: 10}}
                  />
                  <TouchableOpacity
                    onPress={addComment}
                    style={{justifyContent: 'center', padding: 10}}>
                    <Text style={{color: 'blue'}}>Post</Text>
                  </TouchableOpacity>
                </View> */}
              </View>
            </ScrollView>
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{color: 'red'}}>No Post found</Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 10,
  },
  headertxt: {
    fontSize: 22,
    fontWeight: '900',
    color: 'black',
  },
  card: {
    width: '90%',
    height: 'auto', // Change to auto to accommodate content
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10, // Add margin for separation
  },
  likeAndCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  comment: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import {useFocusEffect} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const HomeScreen = ({route}) => {
//   const [data, setData] = useState([]);
//   const [userId, setUserId] = useState(null);
//   const [comment, setComment] = useState(''); // State to hold new comment text

//   const getUserId = async () => {
//     const storedUserId = await AsyncStorage.getItem('USER_ID');
//     setUserId(storedUserId);
//   };

//   const getDataFromFirestore = async () => {
//     const querySnapshot = await firestore().collection('imgUrls').get();
//     let tempData = [];
//     querySnapshot.forEach(documentSnapshot => {
//       tempData.push({id: documentSnapshot.id, ...documentSnapshot.data()});
//     });
//     setData(tempData);
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       getUserId();
//       getDataFromFirestore();
//     }, []),
//   );

//   const likesStatus = likes => {
//     return likes.includes(userId);
//   };

//   const onLikeClick = async item => {
//     const updatedLikes = likesStatus(item.likes)
//       ? item.likes.filter(id => id !== userId)
//       : [...item.likes, userId];

//     await firestore().collection('imgUrls').doc(item.id).update({
//       likes: updatedLikes,
//     });

//     const updatedData = data.map(post =>
//       post.id === item.id ? {...post, likes: updatedLikes} : post,
//     );
//     setData(updatedData);
//   };

//   const onAddComment = async item => {
//     if (!comment) return; // Do not proceed if comment is empty

//     const updatedComments = [...(item.comments || []), {userId, text: comment}];

//     await firestore().collection('imgUrls').doc(item.id).update({
//       comments: updatedComments,
//     });

//     const updatedData = data.map(post =>
//       post.id === item.id ? {...post, comments: updatedComments} : post,
//     );
//     setData(updatedData);
//     setComment(''); // Clear comment input
//   };

//   return (
//     <View style={{flex: 1}}>
//       <View style={styles.header}>
//         <Text style={styles.headertxt}>Social App</Text>
//       </View>
//       {data.length > 0 ? (
//         <FlatList
//           data={data}
//           renderItem={({item}) => (
//             <ScrollView style={{marginTop: 10, paddingHorizontal: 10}}>
//               <View style={styles.card}>
//                 <View style={{flexDirection: 'row', padding: 10, gap: 15}}>
//                   <Image
//                     source={require('../assets/profile.png')}
//                     style={{height: 40, width: 40}}
//                   />
//                   <Text style={{color: 'red', alignSelf: 'center'}}>
//                     {item.name}
//                   </Text>
//                 </View>
//                 <Image
//                   source={{uri: item.image}}
//                   style={{
//                     width: '90%',
//                     height: 160,
//                     alignSelf: 'center',
//                     borderRadius: 10,
//                   }}
//                 />
//                 <View style={styles.likeAndCommentContainer}>
//                   <TouchableOpacity
//                     style={{flexDirection: 'row'}}
//                     onPress={() => onLikeClick(item)}>
//                     <Text style={{color: 'black', marginRight: 10}}>
//                       {item.likes.length}
//                     </Text>
//                     {likesStatus(item.likes) ? (
//                       <Image
//                         source={require('../assets/heartFill.png')}
//                         style={{height: 25, width: 25}}
//                       />
//                     ) : (
//                       <Image
//                         source={require('../assets/heartOutline.png')}
//                         style={{height: 25, width: 25}}
//                       />
//                     )}
//                   </TouchableOpacity>
//                 </View>

//                 {/* Comments Section */}
//                 <View style={styles.commentSection}>
//                   {item.comments &&
//                     item.comments.map((comment, index) => (
//                       <Text key={index} style={styles.commentText}>
//                         {comment.text}
//                       </Text>
//                     ))}
//                   <TextInput
//                     style={styles.commentInput}
//                     placeholder="Add a comment..."
//                     value={comment}
//                     onChangeText={setComment}
//                   />
//                   <TouchableOpacity onPress={() => onAddComment(item)}>
//                     <Text style={styles.commentButton}>Post</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </ScrollView>
//           )}
//           keyExtractor={item => item.id}
//         />
//       ) : (
//         <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
//           <Text style={{color: 'red'}}>No Post found</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     width: '100%',
//     height: 50,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     paddingLeft: 10,
//   },
//   headertxt: {
//     fontSize: 22,
//     fontWeight: '900',
//     color: 'black',
//   },
//   card: {
//     width: '90%',
//     height: 'auto',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     alignSelf: 'center',
//   },
//   likeAndCommentContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     justifyContent: 'space-evenly',
//   },
//   commentSection: {
//     marginTop: 10,
//     padding: 10,
//   },
//   commentInput: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     padding: 5,
//     marginTop: 5,
//   },
//   commentText: {
//     color: 'black',
//     marginVertical: 2,
//   },
//   commentButton: {
//     color: 'blue',
//     marginTop: 5,
//   },
// });

// export default HomeScreen;
