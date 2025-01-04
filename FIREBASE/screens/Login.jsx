import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Input, MyButton} from '../component';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [inputField, setInputField] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isloading, setIsloading] = useState(false);

  // onChange handle
  const onChangeHandler = (value, field) => {
    setInputField({...inputField, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  // validation
  const validation = () => {
    const obj = {};
    if (!inputField.email) obj.email = 'Email Required';
    if (!inputField.password) obj.password = 'Password Required';
    setErrors(obj);
    return Object.keys(obj).length === 0;
  };

  // onsubmit
  const onSubmit = async () => {
    if (!validation()) return;
    try {
      setIsloading(true);
      await auth().signInWithEmailAndPassword(
        inputField.email,
        inputField.password,
      );
      setInputField('');
      setErrors({});
      navigation.navigate('Home');
    } catch (error) {
      setIsloading(false);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('No user found with this email!');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect password!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert('Error:', error.message);
      }
    } finally {
      setIsloading(false);
    }
  };

  // // onSubmit
  // const onSubmit = () => {
  //   if (validation()) {
  //     setInputField('');
  //     setErrors({});
  //   }
  // };

  return (
    <View style={{flex: 1}}>
      <View style={{marginTop: 50}}>
        <Text style={styles.title}>Login</Text>

        <Input
          placeholder={'Enter your email'}
          value={inputField?.email}
          onChangeText={val => onChangeHandler(val, 'email')}
        />
        {errors.email ? (
          <Text
            style={{
              marginLeft: 20,
              marginBottom: 3,
              color: 'red',
              fontWeight: '500',
            }}>
            {errors.email}
          </Text>
        ) : null}
        <Input
          placeholder={'Enter your password'}
          value={inputField?.password}
          onChangeText={val => onChangeHandler(val, 'password')}
        />
        {errors.password ? (
          <Text
            style={{
              marginLeft: 20,
              marginBottom: 3,
              color: 'red',
              fontWeight: '500',
            }}>
            {errors.password}
          </Text>
        ) : null}
      </View>
      <MyButton title={'L O G I N'} onPress={onSubmit} isloading={isloading} />
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{paddingHorizontal: 25, marginTop: 5}}>
        <Text style={{textAlign: 'right'}}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
});
