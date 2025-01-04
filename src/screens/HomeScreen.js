import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import {COLORS} from '../theme/theme';
import ProfilePic from '../components/ProfilePic';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomSearchBar from '../components/CustomSearchBar';
import CategoryList from '../components/CategoryList';
import CoffeeCard from '../components/CoffeeCard';
import CoffeeData from '../data/CoffeeData';
import CoffeeBeansCard from '../components/CoffeeBeansCard';
import BeansData from '../data/BeansData';
import {useNavigation} from '@react-navigation/native';
import CustomIcons from '../components/CustomIcons';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/CartSlice';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.primaryBlackHex}}>
      <StatusBar barStyle={'light-content'} />
      {/* ************************ Header ************************* */}

      <CustomHeader
        LeftIcon={
          <CustomIcons
            name="menu"
            size={15}
            color={COLORS.primaryLightGreyHex}
          />
        }
        RightIcon={<ProfilePic />}
      />
      <ScrollView>
        {/* ************************ Text ************************* */}
        <View style={{marginTop: 20, paddingHorizontal: 10}}>
          <Text style={styles.txt}>Find the best {'\n'} coffee for you</Text>
        </View>
        {/* ************************ Search Bar ************************* */}
        <CustomSearchBar />
        {/* ************************ Categories ************************* */}
        <CategoryList />
        {/* ************************ Coffee ************************* */}
        <FlatList
          horizontal
          keyExtractor={item => item.id}
          data={CoffeeData}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CoffeeDetailScreen', {item});
                }}>
                <CoffeeCard
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
                  averageRating={item.average_rating}
                  ratings_count={item.ratings_count}
                  plusButton={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />
        {/* ************************ Coffee Beans ************************* */}
        <View style={{marginTop: hp(3)}}>
          <Text
            style={{
              fontSize: hp(2.3),
              color: 'white',
              // marginTop: hp(3),
              paddingHorizontal: 10,
              fontWeight: '500',
            }}>
            Coffee Beans
          </Text>
          <FlatList
            horizontal
            keyExtractor={item => item.id}
            data={BeansData}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('BeansDetailScreen', {item});
                  }}>
                  <CoffeeBeansCard
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
                    averageRating={item.average_rating}
                    plusButton={() => {
                      dispatch(addToCart(item));
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  txt: {
    color: COLORS.primaryWhiteHex,
    fontSize: hp(4),
    fontWeight: '600',
    lineHeight: hp(4.5),
    fontFamily: 'Poppins-Thin.ttf',
  },
});
