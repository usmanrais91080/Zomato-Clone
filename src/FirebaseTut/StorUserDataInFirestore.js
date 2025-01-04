import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import firestore from '@react-native-firebase/firestore';

const StorUserDataInFirestore = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const addUser = async () => {
    try {
      await firestore().collection('appData').add({
        username: name,
        userEmail: email,
        userPass: pass,
      });
      console.log('User added');
    } catch (error) {
      Alert.alert('Error Occur :', error);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      <TextInput
        placeholder="Enter your name"
        style={styles.input}
        onChangeText={txt => setName(txt)}
        value={name}
      />
      <TextInput
        placeholder="Enter your email"
        style={styles.input}
        onChangeText={txt => setEmail(txt)}
        value={email}
      />
      <TextInput
        placeholder="Enter your Password"
        style={styles.input}
        onChangeText={txt => setPass(txt)}
        value={pass}
      />
      <View style={{marginTop: 15, alignSelf: 'center'}}>
        <CustomButton title={'SignUp'} onPress={() => addUser()} />
      </View>
    </View>
  );
};

export default StorUserDataInFirestore;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'white',
    width: '90%',
    height: 45,
    alignSelf: 'center',
    marginBottom: 10,
    paddingLeft: 10,
    marginTop: 5,
    color: 'white', // For better visibility
    borderRadius: 8,
  },
});
