import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';

const ConfirmOtpScreen = index => {
  const input1Ref = useRef();
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const input5Ref = useRef();
  const input6Ref = useRef();

  const [inputField, setInputField] = useState({
    Otp1Input: '',
    Otp2Input: '',
    Otp3Input: '',
    Otp4Input: '',
    Otp5Input: '',
    Otp6Input: '',
  });

  //hange onChangeText
  const onChangeHandler = (value, field) => {
    setInputField({...inputField, [field]: value});
  };
  return (
    <View style={styles.mainView}>
      {/* ********** back icon and title *************/}
      <View style={styles.backAndTitleConatiner}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>OTP Verification</Text>
      </View>
      {/* ********** heading *************/}
      <Text style={styles.heading}>We have sent a verification code to</Text>
      {/* ********** phone number *************/}
      <Text style={styles.phoneNum}>97897698787987</Text>
      {/* ********** Otp input *************/}
      <View style={styles.otpInputView}>
        {/* input 1 */}
        <TextInput
          style={[
            styles.otpInupt,
            {
              borderColor:
                inputField.Otp1Input.length == 1 ? Colors.primary : 'black',
            },
          ]}
          maxLength={1}
          ref={input1Ref}
          value={inputField?.Otp1Input}
          onChangeText={text => {
            onChangeHandler(text, 'Otp1Input');
            if (text.length == 1) {
              input2Ref.current.focus();
            }
          }}
        />
        {/* input 2 */}
        <TextInput
          style={[
            styles.otpInupt,
            {
              borderColor:
                inputField.Otp2Input.length == 1 ? Colors.primary : 'black',
            },
          ]}
          maxLength={1}
          ref={input2Ref}
          value={inputField?.Otp2Input}
          onChangeText={text => {
            onChangeHandler(text, 'Otp2Input');
            if (text.length == 1) {
              input3Ref.current.focus();
            } else if (text.length < 1) {
              input1Ref.current.focus();
            }
          }}
        />
        {/* input 3 */}
        <TextInput
          style={[
            styles.otpInupt,
            {
              borderColor:
                inputField.Otp3Input.length == 1 ? Colors.primary : 'black',
            },
          ]}
          maxLength={1}
          ref={input3Ref}
          value={inputField?.Otp3Input}
          onChangeText={text => {
            onChangeHandler(text, 'Otp3Input');
            if (text.length == 1) {
              input4Ref.current.focus();
            } else if (text.length < 1) {
              input2Ref.current.focus();
            }
          }}
        />
        {/* input 4 */}
        <TextInput
          style={[
            styles.otpInupt,
            {
              borderColor:
                inputField.Otp4Input.length == 1 ? Colors.primary : 'black',
            },
          ]}
          maxLength={1}
          ref={input4Ref}
          value={inputField?.Otp4Input}
          onChangeText={text => {
            onChangeHandler(text, 'Otp4Input');
            if (text.length == 1) {
              input5Ref.current?.focus();
            } else if (text.length < 1) {
              input3Ref.current.focus();
            }
          }}
        />
        {/* input 5 */}
        <TextInput
          style={[
            styles.otpInupt,
            {
              borderColor:
                inputField.Otp5Input.length == 1 ? Colors.primary : 'black',
            },
          ]}
          maxLength={1}
          ref={input5Ref}
          value={inputField?.Otp5Input}
          onChangeText={text => {
            onChangeHandler(text, 'Otp5Input');
            if (text.length == 1) {
              input6Ref.current.focus();
            } else if (text.length < 1) {
              input4Ref.current.focus();
            }
          }}
        />
        {/* input 6 */}
        <TextInput
          style={[
            styles.otpInupt,
            {
              borderColor:
                inputField.Otp6Input.length == 1 ? Colors.primary : 'black',
            },
          ]}
          maxLength={1}
          ref={input6Ref}
          value={inputField?.Otp6Input}
          onChangeText={text => {
            onChangeHandler(text, 'Otp6Input');
            if (text.length == 1) {
              input6Ref.current.focus();
            } else if (text.length < 1) {
              input5Ref.current.focus();
            }
          }}
        />
      </View>
    </View>
  );
};

export default ConfirmOtpScreen;

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(3.3),
  },
  backAndTitleConatiner: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
    alignItems: 'center',
  },
  backIcon: {
    height: responsiveHeight(3),
    width: responsiveWidth(7),
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: Colors.black,
  },
  heading: {
    alignSelf: 'center',
    marginTop: responsiveHeight(6),
    fontSize: responsiveFontSize(2.3),
    fontWeight: '400',
    color: Colors.black,
  },
  phoneNum: {
    fontWeight: '800',
    fontSize: responsiveFontSize(2.3),
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
  },
  otpInputView: {
    marginTop: responsiveHeight(3),
    // paddingHorizontal: responsiveWidth(7),
    flexDirection: 'row',
  },
  otpInupt: {
    borderWidth: responsiveHeight(0.15),
    borderColor: Colors.black,
    width: responsiveWidth(13),
    borderRadius: responsiveHeight(1),
    marginLeft: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
});
