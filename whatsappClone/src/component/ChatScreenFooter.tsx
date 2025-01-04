import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const ChatScreenFooter = () => {
  const [message, setMessage] = useState<string>('');
  const [isSendEnable, setIsSendEnable] = useState<boolean>(false);

  const onChangeText = (txt: string) => {
    setMessage(txt);
    setIsSendEnable(true);
  };

  const onSendEnable = () => {
    setMessage('');
    setIsSendEnable(false);
    Alert.alert(message, 'Message send');
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          {height: message.length > 30 ? 60 : 50},
        ]}>
        {/* smile */}
        <TouchableOpacity>
          <Image
            source={require('../assets/icons/smile.png')}
            style={styles.emoji}
          />
        </TouchableOpacity>
        {/* input */}
        <TextInput
          placeholder="Message"
          style={{flex: 0.9}}
          value={message}
          onChangeText={onChangeText}
          multiline={message.length > 30}
          scrollEnabled={message.length > 30}
          numberOfLines={message.length > 30 ? 3 : 1}
        />
        {/* attach and camera view */}
        <View style={{flexDirection: 'row', gap: 20}}>
          {message?.length === 0 ? (
            <>
              <TouchableOpacity>
                <Image
                  source={require('../assets/icons/attach.png')}
                  style={styles.camera}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../assets/icons/cameraoutline.png')}
                  style={styles.camera}
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/attach.png')}
                style={styles.camera}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* voice icon */}
      <TouchableOpacity style={styles.microphoneView} onPress={onSendEnable}>
        {message.length > 0 && isSendEnable ? (
          <Image
            source={require('../assets/icons/send.png')}
            style={styles.microphone}
          />
        ) : (
          <Image
            source={require('../assets/icons/microphone.png')}
            style={styles.microphone}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ChatScreenFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  inputContainer: {
    width: '85%',
    backgroundColor: 'white',
    alignSelf: 'center',
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  camera: {
    width: 20,
    height: 20,
  },

  microphoneView: {
    height: 50,
    width: 50,
    backgroundColor: 'green',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  microphone: {
    width: 20,
    height: 20,
  },
  emoji: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
