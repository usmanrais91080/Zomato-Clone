import React, {useState} from 'react';
import {View, TextInput, Button, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const SignUpWithNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const signInWithPhoneNumber = async phoneNumber => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      Alert.alert('Invalid code.');
    }
  };

  return (
    <View>
      {!confirm ? (
        <>
          <TextInput
            placeholder="Phone Number"
            onChangeText={text => setPhoneNumber(text)}
          />
          <Button
            title="Send Code"
            onPress={() => signInWithPhoneNumber(phoneNumber)}
          />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Verification Code"
            onChangeText={text => setCode(text)}
          />
          <Button title="Confirm Code" onPress={() => confirmCode()} />
        </>
      )}
    </View>
  );
};

export default SignUpWithNumber;
