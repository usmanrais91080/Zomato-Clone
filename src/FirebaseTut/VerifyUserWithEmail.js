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

const VerfiyUserWithEmail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const signUpUser = async () => {
    await auth().createUserWithEmailAndPassword(email, password);
    //yhna pehle user signup krega tu email pe verifcation link jaye ga
    await auth().currentUser.sendEmailVerification();
    //jab wo signup kr lega tu ik dam se logout ho jaye ga jab tak email verify na kiya ho
    await auth().signOut();
    Alert.alert('Please Verify Your Email');
    navigation.navigate('SignIn');
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

export default VerfiyUserWithEmail;

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
