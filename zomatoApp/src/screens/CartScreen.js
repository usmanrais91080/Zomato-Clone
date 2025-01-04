import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveHeight as rh,
  responsiveWidth as rw,
} from 'react-native-responsive-dimensions';
import CustomHeader from '../component/CustomHeader';
import CartHeader from '../component/CartHeader';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../constant/colors';
import CustomBtn from '../component/CustomBtn';
import {
  decreaseByQuantity,
  increaseByQuantity,
} from '../zomatoRedux/zomatoCartSlice';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const selector = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //getTotal

  const getTotal = () => {
    let total = 0;
    // const deliveryFee = 15;
    selector.map(item => {
      const quantity = Number(item.quantity) || 0; //yhna 'Number' is liye lika q k is se pehle dusre method se kiya ta jisme iska output 'NaN' a rha ta tu oska ye solution h
      const price = Number(item.price) || 0;

      total += quantity * price;
    });
    return total;
  };

  return (
    <View style={{flex: 1, paddingHorizontal: rw(3), marginTop: rh(2)}}>
      {/* ***** header ****** */}
      <CartHeader
        title={'My Cart'}
        onPress={() => navigation.navigate('ZomatoHome')}
      />
      <FlatList
        data={selector}
        renderItem={({item, index}) => {
          return (
            <View style={styles.conatiner}>
              {/* ****** image ****** */}
              <View style={styles.imageContaner}>
                <Image source={{uri: item.image}} style={styles.img} />
              </View>
              {/* ****** other details ****** */}
              <View style={styles.detialsContaner}>
                {/* name */}
                <Text style={styles.name}>
                  {item.name.substring(0, 20) + '...'}
                </Text>
                {/* cuisine */}
                <Text style={styles.cuisine}>{item.cuisine}</Text>
                {/* price and buttons */}
                <View style={styles.priceAndButtonContainer}>
                  {/* price */}
                  <Text style={styles.cuisine}>{'23'}</Text>
                  {/* minus button */}
                  <View style={{flexDirection: 'row', gap: rw(3)}}>
                    <TouchableOpacity
                      style={styles.minusButton}
                      onPress={() => dispatch(decreaseByQuantity(item))}>
                      <Text style={{color: Colors.primary}}>-</Text>
                    </TouchableOpacity>
                    {/* counting */}
                    <Text style={{color: 'black'}}>{item.quantity}</Text>
                    {/* plus button */}
                    <TouchableOpacity
                      style={styles.plusButton}
                      onPress={() => dispatch(increaseByQuantity(item))}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      {/* total */}
      <View style={styles.totalView}>
        {/* item selected */}

        <Text style={{color: 'black'}}>item</Text>

        {/* subtotal*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black'}}>subtotal</Text>
          <Text style={{color: 'black'}}>23</Text>
        </View>
        {/* line */}
        <View>
          <Text style={{color: 'black', fontSize: 20}}>
            ----------------------------------------------------------
          </Text>
        </View>
        {/* total amount */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
            Total Amount
          </Text>
          <Text style={{color: 'black', fontSize: 16, fontWeight: '700'}}>
            {'$ ' + getTotal()}
          </Text>
        </View>
      </View>
      {/* button */}
      <View style={{marginBottom: rh(2)}}>
        <CustomBtn
          title={'Order Now'}
          backgroundColor={Colors.primary}
          width={'90%'}
          fontWeight={'700'}
        />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  conatiner: {
    height: rh(14),
    width: rw(90),
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: responsiveHeight(2),
    // marginTop: rh(1.8),
    shadowColor: 'black',
    shadowOffset: {height: rh(1), width: rw(1)},
    shadowOpacity: 0.5,
    shadowRadius: 0.3,
    elevation: 5,
    marginVertical: rh(1),
  },
  imageContaner: {
    height: rh(14),
    flex: 0.3,
  },
  img: {
    height: rh(14),
    width: rw(28),
    borderTopLeftRadius: responsiveHeight(2),
    borderBottomLeftRadius: responsiveHeight(2),
    resizeMode: 'cover',
  },

  detialsContaner: {
    marginLeft: rw(6),
    marginTop: rh(2),
    flex: 0.7,
    paddingHorizontal: rw(3),
  },
  name: {
    color: 'black',
    fontSize: responsiveFontSize(1.7),
    fontWeight: '700',
  },
  cuisine: {
    fontSize: responsiveFontSize(1.4),
    color: 'black',
    fontWeight: '600',
    opacity: 0.5,
  },
  priceAndButtonContainer: {
    marginTop: rh(1.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  minusButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    width: rw(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: rh(0.5),
  },
  plusButton: {
    borderRadius: rh(0.5),
    backgroundColor: Colors.primary,
    width: rw(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalView: {
    marginBottom: rh(3),
    paddingHorizontal: rw(3.9),
  },
});
