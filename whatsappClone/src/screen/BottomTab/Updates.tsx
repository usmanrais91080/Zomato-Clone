import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../component/Header';
import MyStatus from '../../component/MyStatus';
import RecentStatus from '../../component/RecentStatus';
import ViewedStatus from '../../component/ViewedStatus';

const Updates = () => {
  return (
    <View style={styles.container}>
      {/* header */}
      <Header
        title="WhatsApp"
        icons={['cameraoutline', 'searchicon', 'option']}
      />

      <View style={{paddingHorizontal: 10}}>
        {/* My Status */}
        <MyStatus />
        {/* Recent Status */}
        <RecentStatus />
        {/* Viewed Status */}
        <ViewedStatus />
      </View>
    </View>
  );
};

export default Updates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
