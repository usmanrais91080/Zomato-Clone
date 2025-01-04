import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {Input, MyButton} from '../component';

const Signup = () => {
  const navigation = useNavigation();
  const [inputField, setInputField] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({});
  const [isloading, setIsloading] = useState(false);
  const [ishide, setIsHide] = useState(true);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsHide(!ishide);
  };

  // onchange handler
  const onChangeHandler = (value, field) => {
    setInputField({...inputField, [field]: value});
    setError({...error, [field]: ''}); // Clear error when the user starts typing
  };

  // form validation
  const validation = () => {
    const obj = {};
    if (!inputField.name) obj.name = 'Username Required';
    if (!inputField.email) obj.email = 'Email Required';
    if (!inputField.password) obj.password = 'Password Required';
    if (!inputField.confirmPassword) obj.confirmPassword = 'Password Required';
    if (
      inputField.password &&
      inputField.confirmPassword &&
      inputField.password !== inputField.confirmPassword
    )
      obj.confirmPassword = 'Passwords do not match';
    setError(obj);
    return Object.keys(obj).length === 0;
  };

  // Submit form
  const onSubmit = async () => {
    if (!validation()) return; // Stop submission if validation fails
    try {
      setIsloading(true);
      await auth().createUserWithEmailAndPassword(
        inputField.email,
        inputField.password,
      );
      setInputField('');
      setError({});
      navigation.navigate('Login');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert('Error:', error.message);
      }
    } finally {
      setIsloading(false);
    }
  };

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={{marginTop: 50}}>
          <Text style={styles.title}>Signup</Text>

          <Input
            placeholder={'Enter your name'}
            value={inputField?.name}
            onChangeText={val => onChangeHandler(val, 'name')}
          />
          {error.name && <Text style={styles.errorText}>{error.name}</Text>}

          <Input
            placeholder={'Enter your email'}
            value={inputField?.email}
            onChangeText={val => onChangeHandler(val, 'email')}
          />
          {error.email && <Text style={styles.errorText}>{error.email}</Text>}

          <Input
            placeholder={'Enter your password'}
            value={inputField?.password}
            onChangeText={val => onChangeHandler(val, 'password')}
            secureTextEntry={true}
            rightIcon={
              <Image
                source={
                  ishide
                    ? require('../assets/icons/eye.png')
                    : require('../assets/icons/hidden.png')
                }
                style={styles.eyeicon}
              />
            }
            onPress={togglePasswordVisibility}
          />
          {error.password && (
            <Text style={styles.errorText}>{error.password}</Text>
          )}

          <Input
            placeholder={'Confirm your password'}
            value={inputField?.confirmPassword}
            onChangeText={val => onChangeHandler(val, 'confirmPassword')}
            secureTextEntry={true}
            rightIcon={
              <Image
                source={
                  ishide
                    ? require('../assets/icons/eye.png')
                    : require('../assets/icons/hidden.png')
                }
                style={styles.eyeicon}
              />
            }
            onPress={togglePasswordVisibility}
          />
          {error.confirmPassword && (
            <Text style={styles.errorText}>{error.confirmPassword}</Text>
          )}
        </View>
        <MyButton
          title={'S I G N U P'}
          onPress={onSubmit}
          isloading={isloading}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{paddingHorizontal: 25, marginTop: 5}}>
          <Text style={{textAlign: 'right'}}>Already have an account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  eyeicon: {
    height: 20,
    width: 20,
  },
  errorText: {
    marginLeft: 20,
    marginBottom: 3,
    color: 'red',
    fontWeight: '500',
  },
});
