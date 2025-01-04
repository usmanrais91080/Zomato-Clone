import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {foods} from '../constant/data';
import {useNavigation} from '@react-navigation/native';

const FoodCategories = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate(item.screen)}>
        <View style={styles.imgBg}>
          <Image source={item.image} style={styles.img} />
        </View>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Eat what makes you happy</Text>
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={4}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default FoodCategories;

const styles = StyleSheet.create({
  container: {
    marginTop: responsiveHeight(2.2),
    paddingHorizontal: responsiveWidth(3),
  },
  heading: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
    color: 'black',
    marginBottom: responsiveHeight(1),
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(2),
  },
  itemContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  imgBg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(9),
    width: responsiveWidth(18),
    backgroundColor: 'white',
    borderRadius: responsiveHeight(30),
    shadowColor: 'black',
    shadowOffset: {height: 5, width: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  img: {
    height: responsiveHeight(8),
    width: responsiveWidth(16),
    borderRadius: responsiveHeight(5),
    marginBottom: responsiveHeight(1.3),
    marginTop: responsiveHeight(1),
  },
  text: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    fontWeight: '700',
  },
});
