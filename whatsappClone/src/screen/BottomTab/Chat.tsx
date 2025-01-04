import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ChatList} from '../../constant/ChatList';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/WhatsAppStack';
import Search from '../../component/Search';
import Header from '../../component/Header';

interface ChatScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'ChatScreen'>;
}

const Chat = ({navigation}: ChatScreenProps) => {
  return (
    <View style={{paddingHorizontal: 10, marginTop: 10, flex: 1}}>
      {/* header */}
      <Header title="WhatsApp" icons={['cameraoutline', 'option']} />
      {/* search bar */}
      <Search />
      {ChatList.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.container}
          onPress={() => navigation.navigate('ChatScreen')}>
          {/* image */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={item.Image} style={styles.img} />
            {/* name and message */}
            <View style={{paddingLeft: 10, flex: 1}}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={{flex: 1}}>{item.message}</Text>
            </View>
            {/* time and mute */}
            <View style={{alignItems: 'center'}}>
              <Text>{item.time}</Text>
              {item.mute && (
                <Image
                  source={require('../../assets/icons/mute.png')}
                  style={styles.muteIcon}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
      {/* chat */}
      <TouchableOpacity style={styles.chatCircle}>
        <Image
          source={require('../../assets/icons/chatAdd.png')}
          style={styles.chatIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    // flexDirection: 'row',
    marginTop: 10,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  muteIcon: {
    height: 15,
    width: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  chatCircle: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  chatIcon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
});
