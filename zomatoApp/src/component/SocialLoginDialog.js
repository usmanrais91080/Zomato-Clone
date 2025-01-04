import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import {TouchableNativeFeedbackBase} from 'react-native';
import {TouchableHighlightComponent} from 'react-native';
import {onGoogleButtonPress} from '../firbase/GoogleLogin';
import {useNavigation} from '@react-navigation/native';

const SocialLoginDialog = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.maincontainer}>
        {/* continue with google */}
        <TouchableOpacity
          style={styles.googleContainer}
          onPress={() => onGoogleButtonPress()}>
          <Image
            source={require('../assets/images/googleicon.png')}
            style={styles.googleIcon}
          />
        </TouchableOpacity>
        {/* menu three dots button */}
        <TouchableOpacity
          style={styles.menuContinaer}
          onPress={() => setShowDialog(!showDialog)}>
          <Image
            source={require('../assets/images/option.png')}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
      </View>
      {/* {showDialog ? <View style={styles.dialogBox}></View> : null} */}

      <Modal
        visible={showDialog}
        transparent
        animationType="slide"
        onRequestClose={() => setShowDialog(false)}>
        <View style={styles.dialogBox}>
          {/* close button */}
          <TouchableOpacity onPress={() => setShowDialog(false)}>
            <Text style={styles.close}>Close</Text>
          </TouchableOpacity>
          {/* continue with facebook */}
          <TouchableOpacity style={styles.fbContainer}>
            <Image
              source={require('../assets/images/fb.png')}
              style={styles.fbIcon}
            />
            <Text>Continue with Facebook</Text>
          </TouchableOpacity>
          {/* continue with email */}
          <TouchableOpacity
            style={styles.continueWithEmailContainer}
            onPress={() => navigation.navigate('EmailLogin')}>
            <Image
              source={require('../assets/images/email.png')}
              style={styles.EmailIcon}
            />
            <Text>Continue with Email</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default SocialLoginDialog;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: responsiveHeight(3),
    gap: responsiveWidth(4),
  },
  googleContainer: {
    height: responsiveHeight(7.5),
    width: responsiveWidth(15),
    backgroundColor: Colors.white,
    borderWidth: responsiveWidth(0.2),
    borderRadius: 100,
    borderColor: Colors.ligthGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    height: responsiveHeight(5),
    width: responsiveWidth(9),
  },
  menuContinaer: {
    height: responsiveHeight(7.5),
    width: responsiveWidth(15),
    backgroundColor: Colors.white,
    borderWidth: responsiveWidth(0.2),
    borderRadius: 100,
    borderColor: Colors.ligthGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    height: responsiveHeight(5),
    width: responsiveWidth(9),
  },
  dialogBox: {
    height: responsiveHeight(25),
    width: responsiveWidth(100),
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    // top: 20,
    bottom: 0,
    zIndex: 1,
    borderTopLeftRadius: responsiveHeight(2),
    borderTopRightRadius: responsiveHeight(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  close: {
    position: 'absolute',
    right: responsiveWidth(4),
    top: responsiveWidth(2),
    fontWeight: '600',
  },
  fbContainer: {
    height: responsiveHeight(7.2),
    width: responsiveWidth(90),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderWidth: responsiveHeight(0.1),
    borderColor: Colors.ligthGray,
    borderRadius: responsiveHeight(1.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
    marginTop: responsiveHeight(5),
  },
  fbIcon: {
    height: responsiveHeight(4),
    width: responsiveWidth(8),
    marginRight: responsiveWidth(4),
  },
  continueWithEmailContainer: {
    height: responsiveHeight(7.2),
    width: responsiveWidth(90),
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderWidth: responsiveHeight(0.1),
    borderColor: Colors.ligthGray,
    borderRadius: responsiveHeight(1.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: responsiveWidth(3),
    paddingRight: responsiveWidth(3),
    marginTop: responsiveHeight(1.5),
  },
  EmailIcon: {
    height: responsiveHeight(2.8),
    width: responsiveWidth(6.8),
    marginRight: responsiveWidth(4),
  },
});
