import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNav';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore'; // Import Firestore

type SignUpProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

const SignUp: React.FC<SignUpProps> = ({navigation}: SignUpProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fcmToken, setFcmToken] = useState<string>('');

  // Get FCM token
  const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      setFcmToken(token);
      console.log('FCM TOKEN: ', token);
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  };

  useEffect(() => {
    getFcmToken();
  }, []);

  // Create user
  const signUpUser = async () => {
    setIsLoading(true);
    try {
      // Generate a unique ID for the user
      const userId: any = uuid.v4();

      // Create user with email and password
      await auth().createUserWithEmailAndPassword(email, password);

      // Save user data in Firestore
      await saveUserDataInFirestore(userId);

      // Save user data in local storage
      await saveLocalData(userId);

      Alert.alert('User created successfully!');
      setIsLoading(false);
      setName('');
      setEmail('');
      setPassword('');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Sign Up Error:', error);
      Alert.alert('Error', 'Failed to create user. Please try again.');
      setIsLoading(false);
    }
  };

  // Save user data in Firestore
  const saveUserDataInFirestore = async (userId: string) => {
    try {
      await firestore().collection('users').doc(userId).set({
        name,
        email,
        fcmToken,
        userId,
        followers: [],
        ProfilePic: '',
        bio: '',
      });
      console.log('User data saved to Firestore');
    } catch (error) {
      console.error('Error saving user data to Firestore:', error);
    }
  };

  // Save user data in local storage
  const saveLocalData = async (userId: string) => {
    try {
      await AsyncStorage.setItem('NAME', name);
      await AsyncStorage.setItem('EMAIL', email);
      if (fcmToken) {
        await AsyncStorage.setItem('FCM_TOKEN', fcmToken);
      }
      // Store the user ID
      await AsyncStorage.setItem('USER_ID', userId);
    } catch (error) {
      console.error('Error saving local data:', error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={[styles.title, {color: isDarkMode ? 'white' : 'black'}]}>
        Sign Up
      </Text>
      {/* Input */}
      <CustomInput
        placeholder="Enter your name"
        width={'90%'}
        value={name}
        onChangeText={setName}
        placeholderTextColor={isDarkMode ? 'white' : 'black'}
      />
      <CustomInput
        placeholder="Enter your email"
        width={'90%'}
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={isDarkMode ? 'white' : 'black'}
      />
      <CustomInput
        placeholder="Enter your password"
        width={'90%'}
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={isDarkMode ? 'white' : 'black'}
        secureTextEntry
      />
      {/* Button */}
      <CustomButton
        title="Sign Up"
        backgroundColor={isDarkMode ? 'grey' : 'black'}
        width={350}
        titleColor="white"
        isloading={isLoading}
        onPress={signUpUser}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{color: isDarkMode ? 'blue' : 'white'}}>
          Already have an account? <Text>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    fontWeight: 'bold',
  },
});
