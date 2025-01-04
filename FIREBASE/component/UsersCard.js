import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const UsersCard = ({item, handleDelete, handleEdit}) => {
  return (
    <View style={styles.cardView}>
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.emailText}>{item.email}</Text>
        <Text style={styles.phoneText}>{item.phone}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    width: '90%',
    padding: 10,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailText: {
    color: 'red',
  },
  phoneText: {
    color: 'gray',
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UsersCard;
