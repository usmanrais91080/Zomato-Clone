import React, {useState} from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomHeader from '../components/CustomHeader';
import CustomIcons from '../components/CustomIcons';
import {COLORS} from '../theme/theme';
import CoffeeDetailCard from '../components/CoffeeDetailCard';
import CoffeSizes from '../components/CoffeSizes';
import CustomButton from '../components/CustomButton';
import CoffeeData from '../data/CoffeeData';

const CoffeeDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [selectedSize, setSelectedSize] = useState('S'); // Initialize with a default size, e.g., 'M'

  // Find the selected size's price from CoffeeData
  const getPriceForSelectedSize = () => {
    const coffeeItem = CoffeeData.find(coffee => coffee.id === item.id);
    if (coffeeItem) {
      const selectedPrice = coffeeItem.prices.find(
        price => price.size === selectedSize,
      );
      if (selectedPrice) {
        return selectedPrice.price;
      }
    }
    return '0.00'; // Default fallback price
  };

  return (
    <View style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
      <StatusBar barStyle={'light-content'} />
      <ImageBackground source={item.imagelink_portrait} style={styles.mainImg}>
        {/* ************************ HEADER ************************* */}
        <CustomHeader
          LeftIcon={
            <CustomIcons
              name="left"
              size={15}
              color={COLORS.primaryLightGreyHex}
              onPress={() => navigation.goBack()}
            />
          }
          RightIcon={
            <CustomIcons
              name="like"
              size={hp(2)}
              color={COLORS.primaryRedHex}
            />
          }
        />
        {/* ************************ card ************************* */}
        <CoffeeDetailCard item={item} />
      </ImageBackground>
      {/* ************************ description ************************* */}
      <View style={styles.desciptonView}>
        <Text style={styles.descriptionTitle}>{'Description'}</Text>
        <Text style={styles.desciptonText}>{item.description}</Text>
      </View>
      {/* ************************ SIZES ************************* */}
      <CoffeSizes
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      {/* ************************ PRICE and BUTTON ************************* */}
      <View style={styles.priceAndButtonView}>
        {/* price */}
        <View>
          <Text style={styles.pricTitle}>Price</Text>
          <Text
            style={{
              fontSize: hp(2),
              fontWeight: '700',
              marginTop: hp(0.6),
              color: COLORS.primaryOrangeHex,
            }}>
            $ <Text style={styles.price}>{getPriceForSelectedSize()}</Text>
          </Text>
        </View>
        <CustomButton
          title={'Add to Cart'}
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
    </View>
  );
};

export default CoffeeDetailScreen;

const styles = StyleSheet.create({
  mainImg: {
    width: wp(100),
    height: hp(60),
  },
  desciptonView: {
    marginTop: hp(2),
    paddingHorizontal: hp(1.5),
  },
  descriptionTitle: {
    fontSize: hp(1.7),
    fontWeight: '600',
    marginBottom: hp(1.5),
    color: 'white',
  },
  desciptonText: {
    color: 'white',
    fontSize: hp(1.3),
    fontWeight: '500',
  },
  priceAndButtonView: {
    marginTop: hp(4),
    paddingHorizontal: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pricTitle: {
    color: 'white',
    fontSize: hp(1.3),
    fontWeight: '500',
    marginLeft: hp(1.1),
  },
  price: {
    color: 'white',
    fontSize: hp(2),
    fontWeight: '700',
    marginTop: hp(0.6),
  },
});
