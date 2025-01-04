import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Header from './Header';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/WhatsAppStack';
import {useNavigation} from '@react-navigation/native';

const ChatScreenHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerBg}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/icons/back.png')}
          style={styles.backicon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nameProfileView}>
        <Image
          source={require('../assets/images/profile.png')}
          style={styles.profile}
        />
        <View>
          <Text style={styles.name}>Usman</Text>
          <Text style={styles.lastseen}>last seen 9.23 AM</Text>
        </View>
      </TouchableOpacity>
      <Header icons={['videoCall', 'call', 'option']} />
    </View>
  );
};

export default ChatScreenHeader;

const styles = StyleSheet.create({
  headerBg: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    backgroundColor: 'black',
    width: '100%',
    height: 55,
  },
  backicon: {
    width: 23,
    height: 23,
    tintColor: 'white',
    resizeMode: 'contain',
    marginRight: 10,
  },
  profile: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  nameProfileView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  name: {
    color: 'white',
    fontSize: 14,
  },
  lastseen: {
    fontSize: 12,
    color: 'white',
  },
});
