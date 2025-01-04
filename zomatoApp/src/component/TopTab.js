import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  FlatList,
  Image,
  ScrollView,
  useColorScheme,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Colors} from '../constant/colors';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  addProductToCart,
  increaseByQuantity,
  decreaseByQuantity,
} from '../zomatoRedux/zomatoCartSlice';

const TopTab = () => {
  const [selected, setSelected] = useState(0);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart);

  const isDarkMode = useColorScheme() === 'dark';

  // Fetch and filter recipe data
  const getRecipes = async () => {
    try {
      const response = await fetch('https://dummyjson.com/recipes?limit=35');
      const data = await response.json();
      const allRecipes = data.recipes;

      setBreakfast(
        allRecipes.filter(recipe => recipe.mealType.includes('Breakfast')),
      );
      setLunch(allRecipes.filter(recipe => recipe.mealType.includes('Lunch')));
      setDinner(
        allRecipes.filter(recipe => recipe.mealType.includes('Dinner')),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecipes();
    Animated.timing(animatedValue, {
      toValue: selected,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, responsiveWidth(33), responsiveWidth(66)],
  });

  // Render item
  const renderItem = ({item}) => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.breakfastImgBg}
          onPress={() =>
            navigation.navigate('ZomatoProductDetailScreen', {item})
          }>
          <Image source={{uri: item.image}} style={styles.breakfastImg} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>
              {item.name.substring(0, 15) + '...'}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{'★ ' + item.rating}</Text>
              <Text style={styles.reviews}>{'(' + item.reviewCount + ')'}</Text>
            </View>
          </View>
          {quantity === 0 ? (
            <View style={styles.plusMinusView}>
              <TouchableOpacity
                onPress={() => dispatch(addProductToCart(item))}>
                <Text style={styles.plusIcon}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.plusMinusExtendedView}>
              <TouchableOpacity
                onPress={() => dispatch(increaseByQuantity({id: item.id}))}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => dispatch(decreaseByQuantity({id: item.id}))}>
                <Text style={styles.quantityButton}>–</Text>
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  // Get the current recipes based on the selected tab
  const getCurrentRecipes = () => {
    switch (selected) {
      case 0:
        return breakfast;
      case 1:
        return lunch;
      case 2:
        return dinner;
      default:
        return [];
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setSelected(0)}>
            <Text
              style={[
                styles.tabText,
                {fontWeight: selected === 0 ? '700' : '500'},
                {color: isDarkMode ? Colors.black : Colors.white},
              ]}>
              Breakfast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(1)}>
            <Text
              style={[
                styles.tabText,
                {fontWeight: selected === 1 ? '700' : '500'},
                {color: isDarkMode ? Colors.black : Colors.white},
              ]}>
              Lunch
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelected(2)}>
            <Text
              style={[
                styles.tabText,
                {fontWeight: selected === 2 ? '700' : '500'},
                {color: isDarkMode ? Colors.black : Colors.white},
              ]}>
              Dinner
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}>
          <Animated.View
            style={[styles.innerLine, {transform: [{translateX}]}]}
          />
        </View>
        <FlatList
          numColumns={2}
          data={getCurrentRecipes()}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(2),
    marginTop: responsiveHeight(3),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: responsiveWidth(1),
    marginBottom: responsiveHeight(0.5),
  },
  tabText: {
    fontSize: responsiveFontSize(2),
    color: Colors.lightGray,
  },
  line: {
    width: responsiveWidth(94),
    height: responsiveHeight(0.45),
    backgroundColor: Colors.gray,
    alignSelf: 'center',
  },
  innerLine: {
    width: responsiveWidth(26),
    height: responsiveHeight(0.45),
    backgroundColor: 'red',
    position: 'absolute',
    marginLeft: responsiveWidth(4.6),
  },
  itemContainer: {
    width: '50%',
    height: responsiveHeight(35),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(3),
  },
  breakfastImgBg: {
    marginTop: responsiveHeight(1.4),
    width: '90%',
    backgroundColor: 'white',
    height: responsiveHeight(35),
    borderRadius: responsiveHeight(1.3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  breakfastImg: {
    height: responsiveHeight(20),
    width: responsiveWidth(43.5),
    resizeMode: 'cover',
    borderTopRightRadius: responsiveHeight(1.3),
    borderTopLeftRadius: responsiveHeight(1.3),
  },
  itemDetails: {
    marginTop: responsiveHeight(0.6),
    marginLeft: responsiveWidth(1),
  },
  itemName: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: responsiveFontSize(2),
    color: 'orange',
    fontWeight: '600',
  },
  reviews: {
    fontSize: responsiveFontSize(1.5),
    color: Colors.black,
    fontWeight: '600',
    marginLeft: 5,
    opacity: 0.5,
  },
  plusMinusView: {
    backgroundColor: 'red',
    height: responsiveHeight(6.6),
    width: responsiveWidth(15),
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomRightRadius: responsiveHeight(1.3),
    borderTopLeftRadius: responsiveHeight(3.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusMinusExtendedView: {
    backgroundColor: Colors.gray,
    height: responsiveHeight(6.6),
    width: responsiveWidth(25),
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderBottomRightRadius: responsiveHeight(1.3),
    borderTopLeftRadius: responsiveHeight(3.6),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: responsiveWidth(4),
  },
  plusIcon: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
  },
  quantityButton: {
    fontSize: responsiveFontSize(3),
    color: 'black',
  },
  quantityText: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
});

export default TopTab;
