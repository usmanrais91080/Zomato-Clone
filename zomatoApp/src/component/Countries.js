import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';

const Countries = ({item}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState();

  // Get countries
  const getCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    setCountries(data);
  };

  // useEffect
  useEffect(() => {
    getCountries();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.numberAndFlagContainer}
          onPress={() => setIsSelected(!isSelected)}>
          <Image
            source={{
              uri: selectedCountry
                ? selectedCountry.flags.png
                : 'https://via.placeholder.com/150',
            }}
            style={styles.icon}
          />
          <Image
            source={
              isSelected
                ? require('../assets/images/up.png')
                : require('../assets/images/down.png')
            }
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
        {isSelected && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={countries}
              keyExtractor={(item, index) => item.cca2 + index}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setIsSelected(false);
                  }}>
                  <Image source={{uri: item.flags.png}} style={styles.flag} />
                  <Text style={styles.countryCode}>{item.idd.root}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Countries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    zIndex: 1,
  },
  numberAndFlagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(1.2),
    width: responsiveWidth(20),
    height: responsiveHeight(7),
    backgroundColor: 'white',
    borderRadius: responsiveHeight(1.3),
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(2),
    shadowColor: '#000',
    shadowOffset: {
      width: -4,
      height: -5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: responsiveHeight(0.1),
    borderColor: Colors.ligthGray,
  },
  icon: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
  },
  arrowIcon: {
    width: responsiveWidth(3.9),
    height: responsiveHeight(2),
  },
  dropdownContainer: {
    position: 'absolute',
    top: responsiveHeight(7),
    left: 0,
    width: responsiveWidth(45),
    maxHeight: responsiveHeight(30),
    backgroundColor: 'green',
    borderRadius: responsiveHeight(1.3),
    padding: 10,
    zIndex: 2,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
    marginVertical: 5,
  },
  flag: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
  },
  countryCode: {
    fontWeight: 'bold',
  },

  inputText: {
    fontSize: 16,
  },
  icon: {
    width: responsiveWidth(8),
    height: responsiveHeight(4),
  },
});
