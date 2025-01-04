import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFetch} from '../hook/FetchThunck';

const AsyncthunkMain = () => {
  const dispatch = useDispatch();
  const {data, isLoader, isError, errorMessage} = useSelector(
    state => state.users,
  );

  // Handle user data display
  const renderUserItem = ({item}) => (
    <View style={styles.userItem}>
      <Text
        style={styles.userName}>{`${item.name.first} ${item.name.last}`}</Text>
    </View>
  );

  useEffect(() => {
    dispatch(useFetch());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {/* Loading State */}
      {isLoader && (
        <ActivityIndicator size="large" color="green" style={styles.loader} />
      )}

      {/* Error State */}
      {isError && (
        <Text style={styles.errorText}>
          {errorMessage || 'Error fetching users'}
        </Text>
      )}

      {/* No Data State */}
      {data && data.length === 0 && !isLoader && !isError && (
        <Text>No users found</Text>
      )}

      {/* Display Users */}
      {!isLoader && !isError && data && data.length > 0 && (
        <FlatList
          data={data}
          renderItem={renderUserItem}
          keyExtractor={item => item.login.uuid}
        />
      )}
    </View>
  );
};

export default AsyncthunkMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 20,
  },
  loader: {
    marginTop: 20,
  },
  userItem: {
    marginTop: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
});
