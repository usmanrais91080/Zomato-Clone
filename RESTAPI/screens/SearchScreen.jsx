import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const SearchScreen = () => {
  const [searchKey, setSearchKey] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle Search Logic
  const handleSearch = async () => {
    // if (!searchKey) return; // Avoid search if input is empty

    setLoading(true);

    try {
      const response = await axios.get(
        `https://randomuser.me/api/?results=30&gender=${searchKey}`, // Add the search query here
      );
      console.log(response.data); // Log response to check data structure
      setSearchResult(response.data.results); // Set the fetched data to searchResult state
    } catch (error) {
      console.error('Error fetching data', error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Render each user in the list
  const renderUserItem = ({item}) => (
    <View style={styles.userItem}>
      <Image source={{uri: item.picture.large}} style={styles.userImage} />
      <Text
        style={styles.userName}>{`${item.name.first} ${item.name.last}`}</Text>
    </View>
  );

  return (
    <View style={{paddingHorizontal: 15, marginTop: 10}}>
      <View style={styles.container}>
        <TextInput
          placeholder="Search users..."
          style={{flex: 1}}
          value={searchKey}
          onChangeText={text => setSearchKey(text)} // Update search input
        />
        <TouchableOpacity onPress={handleSearch}>
          <Image
            source={require('../../whatsappClone/src/assets/icons/searchicon.png')}
            style={styles.searchIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Show loading indicator while fetching */}
      {loading && <ActivityIndicator size={30} color={'green'} />}

      {/* Display search results */}
      {!loading && searchResult.length > 0 && (
        <FlatList
          data={searchResult}
          renderItem={renderUserItem}
          keyExtractor={item => item.login.uuid} // Make sure the key is unique
        />
      )}

      {/* No results found */}
      {!loading && searchResult.length === 0 && searchKey !== '' && (
        <Text>No users found</Text>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    paddingLeft: 10,
    elevation: 5,
    paddingRight: 10,
  },
  searchIcon: {
    height: 20,
    width: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
  },
});
