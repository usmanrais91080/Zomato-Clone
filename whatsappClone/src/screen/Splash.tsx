import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/WhatsAppStack';
import CustomButton from '../component/CustomButton';

interface SplashProp {
  navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
}

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Splash = ({navigation}: SplashProp) => {
  const handleTermsClick = () => {
    const url = 'https://www.whatsapp.com/legal/terms-of-service'; // WhatsApp Terms of Service URL
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/icons/whatsapp.png')}
          style={styles.logo}
        />
      </View>
      <Text style={{alignSelf: 'center', fontSize: wp(6), fontWeight: '600'}}>
        Welcome to WhatsApp
      </Text>
      <View style={{position: 'absolute', bottom: 80, alignSelf: 'center'}}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Tap "Agree & continue" to accept the </Text>
          <TouchableOpacity>
            <Text
              style={[styles.text, styles.whatsappText]}
              onPress={handleTermsClick}>
              WhatsApp
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.termsContainer}>
          <TouchableOpacity onPress={handleTermsClick}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}} />
      <CustomButton
        title="Agree & Continue"
        width={'80%'}
        backgroundColor="green"
        onPress={() => navigation.navigate('OtpScreen')}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logo: {
    width: WIDTH / 3.3,
    height: HEIGHT / 3.3,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(2), // Adds spacing between logo and the text
  },
  text: {
    fontSize: wp(4), // Adjust font size as needed
    textAlign: 'center',
  },
  whatsappText: {
    fontWeight: 'bold', // Optional: Makes the word "WhatsApp" bold
    color: 'blue',
  },
  termsContainer: {
    marginTop: hp(1), // Adds spacing for the next line
  },
  linkText: {
    color: 'blue', // Makes the text blue
    fontWeight: '500',
    fontSize: wp(4), // Same size as regular text
    textAlign: 'center',
  },
});
