import firebase from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

// add user
export const addUser = async userData => {
  try {
    await firebase().collection('appUsers').add(userData);
    Alert.alert('user added successfully');
  } catch (error) {
    console.log('ERROR : ', error);
  }
};

// get users
export const getUsers = async () => {
  try {
    const userSnapshot = await firebase().collection('appUsers').get();
    const user = userSnapshot.docs.map(item => ({id: item.id, ...item.data}));
    console.log('user fetched succussfully!', user);
    return user;
  } catch (error) {
    console.log('Error Occur white adding user', error);
  }
};
// update users
export const updateUser = async (id, updatedData) => {
  try {
    await firebase().collection('appUsers').doc(id).update(updatedData);
    Alert.alert('user updated successfully');
  } catch (error) {
    console.log('ERROR : ', error);
  }
};
// update users
export const deleteUser = async id => {
  try {
    await firebase().collection('appUsers').doc(id).delete();
    Alert.alert('user deleted successfully');
  } catch (error) {
    console.log('ERROR : ', error);
  }
};
