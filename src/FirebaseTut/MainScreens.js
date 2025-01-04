import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const MainScreens = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {/* ******************** Sing In ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('SignIn')}>
        <Text>Sign In Screen</Text>
      </TouchableOpacity>
      {/* ******************** Log out ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('Signup')}>
        <Text>Sign up Screen</Text>
      </TouchableOpacity>
      {/* ******************** HomeScreen ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('HomeScreen2')}>
        <Text>Home Screen</Text>
      </TouchableOpacity>
      {/* ******************** FormValidation ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('FormValidation')}>
        <Text>FormValidation Screen</Text>
      </TouchableOpacity>
      {/* ******************** Sign in with google ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('SignInWithGoogle')}>
        <Text>Sign in with google Screen</Text>
      </TouchableOpacity>
      {/* ******************** Sign in with google ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('SignupWithFacebook')}>
        <Text>Sign in with Facebook Screen</Text>
      </TouchableOpacity>
      {/* ******************** Sign in with number ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('SignUpWithNumber')}>
        <Text>Sign in with phone number Screen</Text>
      </TouchableOpacity>
      {/* ******************** Fetch Firestore Data ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('FetchFirestoreData')}>
        <Text>Fetch Firestore Data Screen</Text>
      </TouchableOpacity>
      {/* ******************** VerfiyUserWithEmail ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('VerfiyUserWithEmail')}>
        <Text>Verfiy User With Link Screen</Text>
      </TouchableOpacity>
      {/* ******************** Store User data in firestore ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('StorUserDataInFirestore')}>
        <Text>Store User data in firestore</Text>
      </TouchableOpacity>
      {/* ******************** Document picker ******************** */}
      <TouchableOpacity
        style={{
          height: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          marginTop: 15,
        }}
        onPress={() => navigation.navigate('DocumentPick')}>
        <Text>Document picker</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreens;

const styles = StyleSheet.create({});
