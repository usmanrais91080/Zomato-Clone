import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../component/CustomInput';
import CustomButton from '../component/CustomButton';

const Login = () => {
  const [isloading, setIsloading] = useState<boolean>(false);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 25, fontWeight: '900'}}>Login</Text>
      <CustomInput
        placeholder="Enter your email"
        label="Email"
        backgroundColor="#e0e0e0"
        width={'90%'}
      />
      <CustomInput
        placeholder="Enter your password"
        label="Password"
        backgroundColor="#e0e0e0"
        width={'90%'}
      />
      <CustomButton
        backgroundColor="#146cfa"
        width={'90%'}
        title="Login"
        titleColor="white"
        isloading={isloading}
      />
      <View>
        <TouchableOpacity>
          <Text>Already have account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
