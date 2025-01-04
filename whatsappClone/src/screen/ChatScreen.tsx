import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import ChatScreenFooter from '../component/ChatScreenFooter';
import ChatScreenHeader from '../component/ChatScreenHeader';
import ChatScreenBody from '../component/ChatScreenBody';
import {Bg} from '../assets/images/WhatsappBg.png';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('window').height;
const ChatScreen = () => {
  return (
    <View style={{flex: 1}}>
      {/* header */}
      <ChatScreenHeader />
      {/* chat body */}
      <ImageBackground source={Bg} style={styles.Bg}>
        <ChatScreenBody />
      </ImageBackground>
      {/* footer */}
      {/* <View style={{flex: 1}} /> */}
      <ChatScreenFooter />
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  Bg: {
    width: WIDTH,
    height: HEIGHT,
    resizeMode: 'contain',
    flex: 1,
  },
});
