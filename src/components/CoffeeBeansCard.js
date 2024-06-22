import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CoffeeData from '../data/CoffeeData';
import LinearGradient from 'react-native-linear-gradient';
import {BORDERRADIUS, COLORS} from '../theme/theme';
import CustomIcons from './CustomIcons';
import PlusButton from './PlusButton';

const CoffeeBeansCard = ({
  id,
  type,
  index,
  name,
  price,
  description,
  roasted,
  squarImg,
  portratImg,
  ingredients,
  specialIngradient,
  averageRating,
  plusButton,
}) => {
  return (
    <View style={{paddingHorizontal: 10, marginTop: hp(3)}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryBlackHex, COLORS.primaryDarkGreyHex]}
        style={styles.LinearGradientImgCard}>
        <ImageBackground source={squarImg} style={styles.img}>
          {/* ************************ STAR ************************* */}
          <View style={styles.starIconBg}>
            <CustomIcons
              name="star"
              color={COLORS.primaryOrangeHex}
              size={15}
              style={styles.starIcon}
            />
            <Text style={styles.rating}>{averageRating}</Text>
          </View>
        </ImageBackground>
        {/* ************************ NAME AND INGRADEINT ************************* */}
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ingredients}>{specialIngradient}</Text>
        {/* ************************ PRICE and PLUS BUTTON ************************* */}
        <View style={styles.priceAndBtnCOnt}>
          <Text style={{color: 'white'}}>55</Text>
          <PlusButton />
        </View>
      </LinearGradient>
    </View>
  );
};

export default CoffeeBeansCard;

const styles = StyleSheet.create({
  LinearGradientImgCard: {
    height: hp(26.7),
    width: wp(35),
    borderRadius: 23,
    padding: 10,
  },
  img: {
    height: hp(14),
    borderRadius: 30,
    // resizeMode: 'cover',
  },

  starIconBg: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    height: hp(3),
    width: wp(15),
    position: 'absolute',
    right: 0,
    borderBottomLeftRadius: hp(20),
    opacity: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rating: {
    color: COLORS.secondaryLightGreyHex,
    fontSize: 13,
  },
  name: {
    fontSize: hp(2),
    color: 'white',
    fontFamily: 'Poppins-Thin.ttf',
    fontWeight: '400',
    // marginLeft: 10,
    marginTop: hp(1),
  },
  ingredients: {
    fontSize: hp(1.3),
    marginTop: hp(0.7),
    fontWeight: '400',
    color: 'white',
  },
  priceAndBtnCOnt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.7),
  },
});
