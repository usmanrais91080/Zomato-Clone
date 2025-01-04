// import React from 'react';
// import {
//   Button,
//   PermissionsAndroid,
//   StatusBar,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Hello App Camera Permission',
//         message:
//           'Hello App needs access to your camera ' +
//           'so you can take awesome pictures.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the camera');
//       uploadImge();
//     } else {
//       console.log('Camera permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// const uploadImge = async () => {
//   const result = await launchCamera({mediaType: 'photo'});
//   if (result.didCancel) {
//   } else {
//     console.log('not working');
//   }
// };
// const Home = () => (
//   <View style={styles.container}>
//     <Text style={styles.item}>Try permissions</Text>
//     <Button title="request permissions" onPress={requestCameraPermission} />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingTop: StatusBar.currentHeight,
//     backgroundColor: '#ecf0f1',
//     padding: 8,
//   },
//   item: {
//     margin: 24,
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default Home;

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import Auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
const Home = () => {
  const navigation = useNavigation();
  const handleLogOut = async () => {
    await Auth().signOut();
    navigation.dispatch(StackActions.replace('SignIn'));
  };
  const theme = useColorScheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'plum',
      }}>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate('MainScreens')}>
        <Text style={{color: theme == 'black' ? 'white' : 'red'}}>
          Move to MainScreens
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '100%',
          height: 50,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 10,
        }}
        onPress={() => {
          handleLogOut();
        }}>
        <Text style={{color: theme == 'black' ? 'white' : 'red'}}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
