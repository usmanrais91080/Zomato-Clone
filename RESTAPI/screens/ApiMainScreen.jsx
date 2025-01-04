import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../component/ProductCard';
import SearchBar from '../component/SearchBar';
import {useNavigation} from '@react-navigation/native';

const ApiMainScreen = () => {
  const {data, loading, error} = useFetch();
  const navigation = useNavigation();
  return (
    <View>
      <SearchBar onPress={() => navigation.navigate('SearchScreen')} />
      {loading ? (
        <ActivityIndicator color={'red'} size={30} />
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.login.uuid}
          renderItem={({item}) => <ProductCard item={item} />}
        />
      )}
    </View>
  );
};

export default ApiMainScreen;
