import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const FetchFirestoreData = () => {
  const [dataList, setDataList] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const myData = await firestore()
        .collection('appData')
        .doc('2zVCqTb7CMP24Jp81JJJ')
        .get();
      if (myData.exists) {
        setDataList(myData.data());
        console.log(myData.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.log('Error :', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'plum',
      }}>
      {/* title */}
      {dataList ? (
        <Text>Title: {dataList.title}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* image */}
      {dataList ? (
        <Image
          source={{uri: dataList.image}}
          style={{height: 200, width: 200}}
        />
      ) : (
        <Text>Loading...</Text>
      )}
      {/* price */}
      {/* <Text>Prices:</Text>
      {dataList.price.map((price, index) => (
        <Text key={index}>{price}</Text>
      ))} */}
    </View>
  );
};

export default FetchFirestoreData;

const styles = StyleSheet.create({});
