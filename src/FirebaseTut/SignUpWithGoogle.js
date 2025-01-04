import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//  ******************** Google sign in ***********************
export const onGoogleButtonPress = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the user's ID token
    const {idToken} = await GoogleSignin.signIn();
    console.log(idToken);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
    Alert.alert('Login Success');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

const SignUpWithGoogle = () => {
  //  ******************** SIGNIN WITH GOOGLE ***********************
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '16085923429-0ifg9t64btdd3duksbdob165abun263d.apps.googleusercontent.com',
    });
  }, []);

  const navigation = useNavigation();
  const [inputField, setInputField] = useState({
    email: '',
    password: '',
  });
  const [err, setErr] = useState({});

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

    setErr(obj);
    return Object.keys(obj).length === 0;
  };

  //  ******************** CREATE USER WITH EMAIL AND PASSWORD ***********************
  const signUpUser = () => {
    auth()
      .signInWithEmailAndPassword(inputField.email, inputField.password)
      .then(() => {
        Alert.alert('Sign in successfully');
        setInputField({email: '', password: ''});
        setErr({});
        navigation.navigate('HomeScreen2');
      })
      .catch(error => {
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
        Sign in
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
      </View>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: hp(6),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CustomButton title={'Sign in'} onPress={handleSubmit} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={{alignSelf: 'center', color: 'blue', marginTop: hp(2)}}>
          Already have an account
        </Text>
      </TouchableOpacity>
      {/* sign up with google */}
      <TouchableOpacity onPress={onGoogleButtonPress}>
        <Text style={{alignSelf: 'center', color: 'blue', marginTop: hp(2)}}>
          SignUp with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpWithGoogle;

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
