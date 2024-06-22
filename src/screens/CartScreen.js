import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import CustomIcons from '../components/CustomIcons';
import {nanoid} from '@reduxjs/toolkit';
import ProfilePic from '../components/ProfilePic';
import {COLORS} from '../theme/theme';
import CartInfoCard from '../components/CartInfoCard';
import GradientBg from '../components/GradientBg';
import CoffeeData from '../data/CoffeeData';

const CartScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
      {/* ******************** HEADER ******************* */}
      <CustomHeader
        LeftIcon={
          <CustomIcons
            name="menu"
            size={15}
            color={COLORS.primaryLightGreyHex}
          />
        }
        title={'Cart'}
        RightIcon={<ProfilePic />}
      />
      {/* ******************** CartInfoCard ******************* */}
      <FlatList
        data={CoffeeData}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity>
              <CartInfoCard
                id={item.id}
                type={item.type}
                index={item.index}
                name={item.name}
                price={item.prices}
                description={item.description}
                roasted={item.roasted}
                squarImg={item.imagelink_square}
                portratImg={item.imagelink_portrait}
                ingredients={item.ingredients}
                specialIngradient={item.special_ingredient}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default CartScreen;
