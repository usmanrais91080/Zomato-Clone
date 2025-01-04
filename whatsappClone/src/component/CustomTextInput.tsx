import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

interface InputProps extends TextInputProps {
  value: any;
  onChangeText: any;
}

const CustomTextInput: React.FC<InputProps> = ({onChangeText, value}) => {
  // State for countries
  const [countries, setCountries] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(isSelected);

  // Function to fetch countries
  const getCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const result = await response.json();
      setCountries(result.slice(0, 30));
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  // Fetch countries on mount
  useEffect(() => {
    getCountries();
  }, []);

  // Render each item in FlatList
  const renderItem = ({item}) => {
    return (
      <View style={styles.flatlistMainContainer}>
        <TouchableOpacity
          style={styles.flatlistContainer}
          onPress={() => {
            setSelectedCountry(item); // Set the selected country
            setIsSelected(false); // Close the dropdown
          }}>
          {/* Display country flag */}
          <Image
            source={{uri: item.flags.png}}
            style={styles.flagContainer}
            onError={() =>
              console.error(`Failed to load flag for ${item.code}`)
            }
          />
          <Text>{item.idd.root}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.mainContainer}>
        {/* Display selected country */}
        {selectedCountry && (
          <View style={styles.selectedContainer}>
            <Image
              source={{uri: selectedCountry.flags.png}}
              style={styles.flagContainer}
              onError={() =>
                console.error(`Failed to load selected country flag`)
              }
            />
          </View>
        )}
        {/* Dropdown toggle */}
        <TouchableOpacity
          onPress={() => {
            setIsSelected(!isSelected);
          }}>
          <Image
            source={
              isSelected
                ? require('../assets/icons/up.png')
                : require('../assets/icons/down.png')
            }
            style={styles.icon}
          />
        </TouchableOpacity>

        <Text style={{fontWeight: '600'}}>{selectedCountry?.idd?.root}</Text>

        <View style={{width: 2, height: 30, backgroundColor: 'black'}} />
        {/* Input container */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Enter your phone number"
            style={{flex: 1}}
            keyboardType="phone-pad"
            value={value}
            onChangeText={onChangeText}
          />
        </View>
      </View>

      {/* Dropdown list of countries */}
      {isSelected && (
        <FlatList
          data={countries} // Pass fetched country data
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '85%',
    height: 45,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 35,
    alignItems: 'center',
    elevation: 3,
    paddingLeft: 10,
  },
  inputContainer: {
    flex: 1,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  flagContainer: {
    width: 30,
    height: 20,
  },
  icon: {
    width: 12,
    height: 12,
  },
  flatlistMainContainer: {
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    elevation: 5,
  },
  flatlistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 10,
  },
});
