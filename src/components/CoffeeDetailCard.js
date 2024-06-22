import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomIcons from './CustomIcons';
import {COLORS} from '../theme/theme';

const CoffeeDetailCard = ({item}) => {
  return (
    <View style={styles.conatiner}>
      {/* main view */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* name and ingredent view */}
        <View style={styles.nameView}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.ingradient}>{item.special_ingredient}</Text>
        </View>

        {/* icon view */}
        <View style={styles.iconView}>
          <CustomIcons
            name="bean"
            size={hp(2.5)}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={{color: 'white', marginTop: hp(0.4)}}>{item.type}</Text>
        </View>
        <View style={styles.iconView}>
          <CustomIcons
            name="location"
            size={hp(2.5)}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={{color: 'white', marginTop: hp(0.4)}}>
            {item.location}
          </Text>
        </View>
      </View>
      {/* rating and roasted*/}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: hp(1.6),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomIcons
            name="star"
            size={hp(2.5)}
            color={COLORS.primaryOrangeHex}
          />
          <Text style={styles.rating}>{item.average_rating}</Text>
          <Text style={styles.reviews}>{'(' + item.ratings_count + ')'}</Text>
        </View>
        {/* roasted view */}
        <View style={styles.roastedView}>
          <Text style={{color: 'white', fontSize: hp(1.1), fontWeight: '400'}}>
            {item.roasted}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CoffeeDetailCard;

const styles = StyleSheet.create({
  conatiner: {
    width: wp(100),
    height: hp(17),
    backgroundColor: 'rgba(52,52,52, 0.83)',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
    paddingHorizontal: 19,
  },
  nameView: {
    marginTop: 10,
  },
  name: {
    fontSize: hp(2.3),
    fontWeight: '600',
    color: 'white',
  },
  ingradient: {
    fontSize: hp(1.5),
    fontWeight: '300',
    color: 'white',
  },
  iconView: {
    height: hp(6.1),
    width: wp(13),
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(1),
    marginTop: 10,
  },
  rating: {
    fontSize: hp(2),
    fontWeight: '700',
    color: 'white',
    marginLeft: wp(2.5),
  },
  reviews: {
    fontSize: hp(1.2),
    fontWeight: '300',
    color: 'white',
    marginLeft: wp(2.5),
  },
  roastedView: {
    height: hp(4.5),
    width: wp(28),
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
