import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import SearchBar from '../component/SearchBar';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import Categories from '../component/Categories';
import CustomHeader from '../component/CustomHeader';
import FoodCategories from '../component/FoodCategories';
import OfferBanners from '../component/OfferBanners';
import {BottomTab} from '../navigations/BottomTab';
import TopTab from '../component/TopTab';
import {useNavigation} from '@react-navigation/native';

const ZomatoHome = () => {
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        flex: 1,
        marginTop: responsiveHeight(2),
      }}>
      {/* ************** header ************** */}
      <CustomHeader />

      <ScrollView>
        {/* ************** search bar ************** */}
        <SearchBar
          leftIcon={
            <Image
              source={require('../assets/images/search.png')}
              style={styles.searchIcon}
            />
          }
          placeholder={'Restaurent name,cuisine, or a dish'}
          placeholderTextColor={isDarkMode ? Colors.black : Colors.white}
        />
        {/* ************** banner ************** */}
        <OfferBanners />

        {/* ************** categories ************** */}
        <Categories />
        {/* ************** Food categories ************** */}
        <FoodCategories />
        {/* ************** Breakfast,luch nad Dinner ************** */}
        <TopTab />
        {/* ************** bottom tab ************** */}
        <View>{/* <BottomTab /> */}</View>
      </ScrollView>
    </View>
  );
};

export default ZomatoHome;

const styles = StyleSheet.create({
  searchIcon: {
    height: responsiveHeight(2.5),
    width: responsiveWidth(5),
    tintColor: Colors.primary,
  },
  foodBanner: {
    height: responsiveHeight(32),
    width: responsiveWidth(94),
    borderRadius: responsiveHeight(3),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
