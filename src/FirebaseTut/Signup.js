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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const signUpUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password, confirmPassword)
      .then(() => {
        Alert.alert('User created successfully');
        navigation.navigate('SignIn');
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

  return (
    <View style={{flex: 1, marginTop: hp(4), backgroundColor: 'black'}}>
      <Text style={{alignSelf: 'center', fontSize: hp(3), fontWeight: '700'}}>
        Sign up
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
        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          value={confirmPassword}
          onChangeText={txt => setConfirmPassword(txt)}
          secureTextEntry
        />
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
          onPress={() => {
            signUpUser();
          }}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text style={{alignSelf: 'center', color: 'blue', marginTop: hp(2)}}>
          Already have account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

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
