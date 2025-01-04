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

const WhislistScreen = () => {
  const seletor = useSelector(state => state.cart);
  const dispatch = useDispatch();

  //getTotal

  const getTotal = () => {
    let total = 0;
    // const deliveryFee = 15;
    seletor.map(item => {
      const quantity = Number(item.quantity) || 0; //yhna 'Number' is liye lika q k is se pehle dusre method se kiya ta jisme iska output 'NaN' a rha ta tu oska ye solution h
      const price = Number(item.price) || 0;

      total += quantity * price;
    });
    return total;
  };

  return (
    <View style={{flex: 1, paddingHorizontal: rw(3), marginTop: rh(2)}}>
      <FlatList
        data={seletor}
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
                <Text style={styles.name}>{item.name}</Text>
                {/* cuisine */}
                <Text style={styles.cuisine}>{item.cuisine}</Text>
                {/* price and buttons */}
                <View style={styles.priceAndButtonContainer}>
                  {/* price */}
                  <Text style={styles.cuisine}>{'23'}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default WhislistScreen;

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
