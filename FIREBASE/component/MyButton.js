import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const MyButton = ({onPress, title, isloading}) => {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        {isloading ? (
          <ActivityIndicator size={25} color={'white'} />
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: 45,
    backgroundColor: 'blue',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    color: 'white',
    fontWeight: '700',
  },
});
