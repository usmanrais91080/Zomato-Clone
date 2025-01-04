import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const PhoneNoVerification = () => {
  const [phoneNum, setPhoneNum] = useState('');
  const [confirmData, setConfirmData] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const navigation = useNavigation();

  const sendOTP = async () => {
    try {
      //   const phoneNumFormat = '+92' + phoneNum;
      const response = await auth().signInWithPhoneNumber(phoneNum);
      setConfirmData(response);
      console.log(response);

      Alert.alert('Verify your number');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message);
    }
  };

  const submitOTP = async () => {
    try {
      const response = await confirmData.confirm(otpInput);
      console.log(response);
      Alert.alert('Phone number verified successfully!');
      navigation.navigate('HomeScreen2');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Invalid OTP');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <TextInput
        placeholder="Enter your Phone Number"
        style={styles.input}
        onChangeText={txt => setPhoneNum(txt)}
        keyboardType="phone-pad"
        value={phoneNum}
      />
      <CustomButton title={'Send OTP'} onPress={sendOTP} />

      {/* confirm otp */}
      <TextInput
        placeholder="Enter your OTP"
        style={styles.input}
        onChangeText={txt => setOtpInput(txt)}
        keyboardType="number-pad"
        value={otpInput}
      />
      <CustomButton title={'Submit'} onPress={submitOTP} />
    </View>
  );
};

export default PhoneNoVerification;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'white',
    width: '90%',
    height: 45,
    alignSelf: 'center',
    marginBottom: 20,
    paddingLeft: 10,
    marginTop: 40,
    color: 'white', // For better visibility
  },
});
