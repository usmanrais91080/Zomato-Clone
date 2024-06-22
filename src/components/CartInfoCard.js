import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import GradientBg from './GradientBg';
import CoffeeData from '../data/CoffeeData';

const CartInfoCard = ({
  id,
  type,
  index,
  name,
  description,
  prices,
  roasted,
  squarImg,
  portratImg,
  Ingredients,
  specialIngradient,
}) => {
  return <View style={{marginTop: hp(1.7), paddingHorizontal: hp(1)}}></View>;
};

export default CartInfoCard;

const styles = StyleSheet.create({});
