import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import Countries from '../component/Countries';
import CustomInput from '../component/CustomInput';
import CustomBtn from '../component/CustomBtn';
import SocialLoginDialog from '../component/SocialLoginDialog';
import auth from '@react-native-firebase/auth';

const ZomatoOtp = () => {
  const [mobile, setMobile] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [confirm, setConfirm] = useState('');
  const theme = useColorScheme();
  //phone number authentication
  const sendOtp = async () => {
    const phoneNumber = `+92${mobile}`;
    try {
      const response = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(response);
      setConfirm(response);
      Alert.alert('OTP sent successfully...');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
        {/* *********** countries and number input ************ */}
        <View style={styles.countriesAndNumView}>
          <Countries />
          <CustomInput
            countryCode
            placeholder={'Enter Phone Number'}
            keyboardType={'phone-pad'}
            width={responsiveWidth(74)}
            value={mobile}
            onChangeText={text => setMobile(text)}
          />
        </View>
        {/* *********** Continue button ************ */}
        <CustomBtn
          title={'Continue'}
          titleColor={'black'}
          backgroundColor={Colors.primary}
          width={responsiveWidth(96)}
          onPress={() => sendOtp()}
        />
        {/* *********** line ************ */}
        <View style={styles.loginOrSignUp}>
          <View style={styles.Orline} />
          <Text style={{fontSize: responsiveFontSize(1.2)}}>or</Text>
          <View style={styles.Orline} />
        </View>
        {/* *********** Google and fb login ************ */}
        <SocialLoginDialog />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ZomatoOtp;

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
  countriesAndNumView: {
    flexDirection: 'row',
    gap: responsiveWidth(2),
    marginTop: responsiveHeight(2),
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  Orline: {
    height: responsiveHeight(0.15),
    backgroundColor: Colors.ligthGray,
    width: responsiveWidth(44),
    marginLeft: 10,
    marginRight: 10,
  },
});
