import {
  ActivityIndicator,
  Alert,
  Image,
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
import {getAuth, sendPasswordResetEmail} from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import {StackActions, useNavigation} from '@react-navigation/native';
import {COLORS} from '../theme/theme';
import {onGoogleButtonPress} from './SignUpWithGoogle';
import {facebookLogin} from './SIgnupWithFacbook';
// import {onFacebookButtonPress} from './SIgnupWithFacbook';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const signUpUser = () => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // navigation.navigate('HomeScreen2');
        setIsLoading(false);
        navigation.dispatch(StackActions.replace('HomeScreen2'));
      })
      .catch(error => {
        setIsLoading(false);
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert('Error:', error.message);
        }
      });
  };

  //forgot password
  const forgotPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Email sent successfully');
      })
      .catch(error => {
        console.log(error.code);
        console.log(error.message);
        // ..
      });
  };
  return (
    <SafeAreaView style={{flex: 1, marginTop: hp(4), backgroundColor: 'black'}}>
      <Text style={{alignSelf: 'center', fontSize: hp(3), fontWeight: '700'}}>
        Sign In
      </Text>
      <View style={{marginTop: hp(7)}}>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={txt => setEmail(txt)}
        />
        <TextInput
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          onChangeText={txt => setPassword(txt)}
          secureTextEntry
        />
      </View>

      {/******************** Sign in button ************************ */}
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: hp(6),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <CustomButton
          title={'Sign in'}
          onPress={() => {
            signUpUser();
            navigation.navigate('SignIn');
          }}
          isloading={isloading}
        />
      </View>
      {/********************forgot password ************************ */}
      <TouchableOpacity
        style={{marginTop: 5, alignSelf: 'center'}}
        onPress={() => forgotPassword()}>
        <Text>Forgot Passowrd?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text
          style={{alignSelf: 'center', color: 'lightblue', marginTop: hp(2)}}>
          Don't have account? SignUp
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('VerfiyUserWithEmail')}>
        <Text
          style={{alignSelf: 'center', color: 'lightblue', marginTop: hp(2)}}>
          SignUp User With Email verifcation
        </Text>
      </TouchableOpacity>
      {/******************** Number LOGIN ************************ */}
      <TouchableOpacity
        onPress={() => navigation.navigate('PhoneNoVerification')}>
        <Text
          style={{alignSelf: 'center', color: 'lightblue', marginTop: hp(2)}}>
          SignUp with Phone Number
        </Text>
      </TouchableOpacity>
      {/******************** SOCIAL LOGIN ************************ */}
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignSelf: 'center',
          marginTop: 15,
        }}>
        {/******************** Facebook LOGIN ************************ */}

        <TouchableOpacity onPress={() => facebookLogin()}>
          <Image
            source={require('../assets/fb.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>

        {/******************** Google LOGIN ************************ */}
        <TouchableOpacity onPress={() => onGoogleButtonPress()}>
          <Image
            source={require('../assets/googleicon.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>

        {/******************** Twitter  LOGIN ************************ */}
        <TouchableOpacity>
          <Image
            source={require('../assets/twittericon.png')}
            style={{height: 40, width: 40}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: hp(5),
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: hp(3),
    borderRadius: hp(1),
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
