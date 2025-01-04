import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const MyStatus = () => {
  return (
    <View>
      <View style={styles.statusContainer}>
        {/* profile image */}
        <TouchableOpacity>
          <Image
            source={require('../assets/images/profile.png')}
            style={styles.profile}
          />
        </TouchableOpacity>
        {/* add icon */}
        <TouchableOpacity style={{position: 'absolute', bottom: 0, left: 35}}>
          <Image
            source={require('../assets/icons/add.png')}
            style={styles.addIcon}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.status}>My Status</Text>
          <Text>Tap to add Status</Text>
        </View>
      </View>
    </View>
  );
};

export default MyStatus;

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  profile: {
    width: 50,
    height: 50,
    position: 'relative',
  },
  status: {
    fontSize: 18,
    fontWeight: '600',
  },
  addIcon: {
    width: 15,
    height: 15,
  },
});
