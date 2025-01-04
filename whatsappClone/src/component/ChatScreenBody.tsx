import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {MessageData} from '../constant/MessageData';

const ChatScreenBody = () => {
  const userId = '1'; // User ID to distinguish between messages
  const flatlistRef = useRef<FlatList>(null);

  // useEffect
  useEffect(() => {
    if (flatlistRef.current) {
      flatlistRef.current?.scrollToEnd({animated: true});
    }
  }, [MessageData]);

  // Render my message
  const UserMessageView = ({message, time}: any) => (
    <View style={styles.userView}>
      <TouchableOpacity style={styles.userInnerView} activeOpacity={0.1}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
        <Image
          source={require('../assets/icons/read.png')}
          style={styles.readIcon}
        />
      </TouchableOpacity>
    </View>
  );

  // Render other user's message
  const OtherMessageView = ({message, time}: any) => (
    <View style={styles.otherMessageView}>
      <TouchableOpacity style={styles.otherMessageInnerView}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </TouchableOpacity>
    </View>
  );

  // Render chat messages in FlatList for scrolling
  const renderItem = ({item}: any) => (
    <View key={item.id}>
      {item.id === userId ? (
        <UserMessageView message={item.message} time={item.time} />
      ) : (
        <OtherMessageView message={item.message} time={item.time} />
      )}
    </View>
  );

  // scroll to bottom
  const scrollToBottom = () => {
    flatlistRef.current?.scrollToEnd({animated: true});
  };

  return (
    <>
      <FlatList
        data={MessageData}
        renderItem={renderItem}
        ref={flatlistRef}
        keyExtractor={item => item.id.toString()} // Unique key for each message
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={scrollToBottom}
      />
      {/* scroll icon */}
      <TouchableOpacity style={styles.scrollIconView} onPress={scrollToBottom}>
        <Image
          source={require('../assets/icons/scroll.png')}
          style={styles.scrollIcon}
        />
      </TouchableOpacity>
    </>
  );
};

export default ChatScreenBody;

const styles = StyleSheet.create({
  chatContainer: {
    paddingBottom: 10, // Ensure content isn't cut off at the bottom
  },
  userView: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  otherMessageView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInnerView: {
    backgroundColor: 'green',
    paddingRight: 10,
    marginRight: 8,
    paddingLeft: 10,
    marginTop: 10,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
    marginVertical: 12,
  },
  otherMessageInnerView: {
    backgroundColor: 'green',
    paddingRight: 10,
    marginLeft: 8,
    paddingLeft: 10,
    marginTop: 10,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
  },
  message: {
    fontSize: 14,
    color: 'white',
  },
  time: {
    fontSize: 10,
  },
  readIcon: {
    width: 15,
    height: 15,
  },
  scrollIconView: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // backgroundColor: 'red',
    width: 23,
    height: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  scrollIcon: {
    width: 13,
    height: 13,
    tintColor: 'white',
  },
});
