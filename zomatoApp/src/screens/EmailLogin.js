import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import CustomInput from '../component/CustomInput';
import CustomBtn from '../component/CustomBtn';
import SocialLoginDialog from '../component/SocialLoginDialog';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const EmailLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const [isloading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  //signup user
  const signUpUser = async () => {
    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Verification email sent successfully');
      setEmail('');
      setPassword('');
      navigation.navigate('ZomatoHome');
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert('Error:', error.message);
      }
    }
  };

  //signin user
  const signInUser = async () => {
    setIsLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Signed in successfully');
      setEmail('');
      setPassword('');
      navigation.navigate('ZomatoHome');
    } catch (error) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        Alert.alert('No user found with this email!');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Incorrect password!');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('That email address is invalid!');
      } else {
        Alert.alert('Error:', error.message);
      }
    }
  };
  return (
    <ScrollView>
      {/* *********** header ************ */}
      <Image
        source={require('../assets/images/banner.png')}
        style={styles.header}
      />
      {/* *********** heading ************ */}
      <Text style={styles.heading}>
        India’s #1 Food Delivery {'\n'}and Dining App
      </Text>
      {/* *********** login or signup line ************ */}
      <View style={styles.loginOrSignUp}>
        <View style={styles.line} />
        <Text style={{fontSize: responsiveFontSize(1.2)}}>
          Log in or sign up
        </Text>
        <View style={styles.line} />
      </View>
      {/* *********** email and password input ************ */}
      <View style={styles.inputContainer}>
        <CustomInput
          placeholder={'Enter your Email'}
          width={responsiveWidth(95)}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={{marginTop: responsiveHeight(1.5)}}>
          <CustomInput
            placeholder={'Enter your Password'}
            width={responsiveWidth(95)}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
      </View>
      {/* *********** Continue button ************ */}
      <View style={{marginTop: responsiveHeight(3)}}>
        <CustomBtn
          title={'Continue'}
          titleColor={'white'}
          backgroundColor={Colors.primary}
          width={responsiveWidth(96)}
          onPress={() => {
            isSignUp ? signInUser() : signUpUser();
          }}
          isloading={isloading}
        />
      </View>
      {/* *********** line ************ */}
      <View style={styles.loginOrSignUp}>
        <View style={styles.Orline} />
        <Text style={{fontSize: responsiveFontSize(1.2)}}>or</Text>
        <View style={styles.Orline} />
      </View>
      {/* *********** Google and fb login ************ */}
      <SocialLoginDialog />
    </ScrollView>
  );
};

export default EmailLogin;

const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(50),
    width: responsiveWidth(100),
  },
  heading: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3.3),
    textAlign: 'center',
    color: 'black',
  },
  loginOrSignUp: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginTop: responsiveHeight(2.4),
  },
  line: {
    height: responsiveHeight(0.15),
    backgroundColor: Colors.ligthGray,
    width: responsiveWidth(35),
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainer: {
    marginTop: responsiveHeight(2),
    alignItems: 'center',
  },
  Orline: {
    height: responsiveHeight(0.15),
    backgroundColor: Colors.ligthGray,
    width: responsiveWidth(44),
    marginLeft: 10,
    marginRight: 10,
  },
});
