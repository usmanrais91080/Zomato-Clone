import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomTextInput from '../component/CustomTextInput';
import CustomButton from '../component/CustomButton';
import auth from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/WhatsAppStack';

type OtpProps = {
  navigation: StackNavigationProp<RootStackParamList, 'OtpScreen'>;
};

const OtpScreen = ({navigation}: OtpProps) => {
  const [mobile, setMobile] = useState();
  const [confirm, setConfirm] = useState();

  // phone number
  // const sendOtp = async () => {
  //   const phoneNumber = `+92${mobile}`;
  //   try {
  //     const responce: any = await auth().signInWithPhoneNumber(phoneNumber);
  //     setConfirm(responce);
  //   } catch (error: any) {
  //     console.log('Error occured:', error);
  //   }
  // };
  return (
    <View style={{flex: 1}}>
      <Image
        source={require('../assets/icons/whatsapp.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Whatsapp</Text>
      {/* input container */}
      <CustomTextInput value={mobile} onChangeText={txt => setMobile(txt)} />
      {/* button */}
      <CustomButton
        title="Send"
        backgroundColor="green"
        width={'50%'}
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  logo: {
    width: wp(25),
    height: hp(25),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: wp(6), // Adjust font size as needed
    textAlign: 'center',
    fontWeight: '600',
  },
});
