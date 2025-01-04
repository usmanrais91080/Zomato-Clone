import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const FormValidation = () => {
  const navigation = useNavigation();
  const [inputField, setInputField] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [err, setErr] = useState({});
  const [isloading, setIsLoading] = useState(false);

  // onChangeHandler
  const onChagneHandler = (field, value) => {
    setInputField({...inputField, [field]: value});
    setErr({...err, [field]: ''});
  };

  // FormValidation
  const validateForm = () => {
    let obj = {};
    if (!inputField.email) obj.email = 'Email Required';
    if (!inputField.password) obj.password = 'Password Required';
    if (!inputField.confirmPassword) obj.confirmPassword = 'Password Required';
    if (inputField.password !== inputField.confirmPassword) {
      obj.confirmPassword = 'Passwords do not match';
    }
    setErr(obj);
    return Object.keys(obj).length === 0;
  };

  //create user in firebase
  const signUpUser = () => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(inputField.email, inputField.password)
      .then(() => {
        Alert.alert('User created successfully');
        setInputField({email: '', password: '', confirmPassword: ''});
        setErr({});
        // navigation.navigate('SignIn');
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert('Error:', error.message);
        }
      });
  };

  // handleSubmit
  const handleSubmit = () => {
    if (validateForm()) {
      signUpUser();
    }
  };
  return (
    <View style={{flex: 1, marginTop: hp(4), backgroundColor: 'gray'}}>
      <Text style={{alignSelf: 'center', fontSize: hp(3), fontWeight: '700'}}>
        Sign up
      </Text>
      <View style={{marginTop: hp(7)}}>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={inputField?.email}
          onChangeText={val => onChagneHandler('email', val)}
        />
        {err.email ? (
          <Text
            style={{
              color: 'red',
              fontSize: 13,
              paddingLeft: wp(6),
              marginTop: hp(1),
            }}>
            {err.email}
          </Text>
        ) : null}
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          value={inputField?.password}
          onChangeText={val => onChagneHandler('password', val)}
          secureTextEntry
        />
        {err.password ? (
          <Text
            style={{
              color: 'red',
              fontSize: 13,
              paddingLeft: wp(6),
              marginTop: hp(1),
            }}>
            {err.password}
          </Text>
        ) : null}
        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          value={inputField?.confirmPassword}
          onChangeText={val => onChagneHandler('confirmPassword', val)}
          secureTextEntry
        />
        {err.confirmPassword ? (
          <Text
            style={{
              color: 'red',
              fontSize: 13,
              paddingLeft: wp(6),
              marginTop: hp(1),
            }}>
            {err.confirmPassword}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: hp(6),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton
          title={'Sign up'}
          onPress={handleSubmit}
          isloading={isloading}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate()}>
        <Text style={{alignSelf: 'center', color: 'blue', marginTop: hp(2)}}>
          Already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormValidation;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: hp(5),
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: hp(3),
    borderRadius: hp(1),
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
