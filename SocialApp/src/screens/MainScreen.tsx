// import {
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   PermissionsAndroid,
//   Image,
//   TouchableOpacity,
// } from 'react-native';
// import React, {useState} from 'react';
// import {launchCamera} from 'react-native-image-picker';
// import {Button} from 'react-native';
// import storage from '@react-native-firebase/storage';
// import DocumentPicker from 'react-native-document-picker';
// import {BottomTab} from '../navigation/Bottomab';

// const MainScreen = () => {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [ImageUri, setImageUri] = useState(null);
//   const [UploadImg, setUploadImg] = useState<boolean>(false);

//   //select and upload image to firestore storage
//   const selectAndUploadImg = async () => {
//     try {
//       const response: any = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.images],
//       });
//       setImageUri(response.uri);
//       setUploadImg(true);

//       const reference = storage().ref(`/socialAppPhoto/${response.name}`);
//       await reference.putFile(response.uri);
//       // this method is use to download image url
//       const url = await storage()
//         .ref(`/socialAppPhoto/${response.name}`)
//         .getDownloadURL();
//       console.log(url);

//       await setImageUri(response.uri);
//     } catch (error) {
//       console.log('Failed to upload image', error);
//     } finally {
//       setUploadImg(false);
//     }
//   };

//   const requestPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Social App Camera Permision',
//           message: 'Allow permission camera to take awesome photos',
//           buttonNeutral: 'Ask me later',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         },
//       );
//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         selectAndUploadImg();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <View style={{flex: 1}}>
//       <Text style={{color: isDarkMode ? 'black' : 'white'}}>MainScreen</Text>
//       {ImageUri ? (
//         <Image source={{uri: ImageUri}} style={{height: 200, width: 200}} />
//       ) : (
//         <Text>no data found</Text>
//       )}
//       <TouchableOpacity
//         style={{
//           width: 200,
//           height: 60,
//           backgroundColor: 'black',
//           alignItems: 'center',
//           justifyContent: 'center',
//           alignSelf: 'center',
//         }}
//         onPress={selectAndUploadImg}>
//         <Text>Select Image</Text>
//       </TouchableOpacity>
//       <BottomTab />
//     </View>
//   );
// };

// export default MainScreen;

// const styles = StyleSheet.create({});

import {View, Text} from 'react-native';
import React from 'react';
import {BottomTab} from '../navigation/Bottomab';

const MainScreen = () => {
  return (
    <View style={{flex: 1}}>
      <BottomTab />
    </View>
  );
};

export default MainScreen;
