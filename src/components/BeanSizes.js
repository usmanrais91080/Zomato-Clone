import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../theme/theme';

const BeanSizes = ({selectedSize, setSelectedSize}) => {
  const sizes = [
    {id: 'S1', name: 'S'},
    {id: 'S2', name: 'M'},
    {id: 'S3', name: 'L'},
  ];

  return (
    <View style={{paddingHorizontal: hp(1.5), marginTop: hp(2.5)}}>
      <Text style={{fontSize: hp(1.6), fontWeight: '700', color: 'white'}}>
        Size
      </Text>
      <View style={styles.sizeMainView}>
        {sizes.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedSize(item.name)} // Update selectedSize with item.name
          >
            <View
              style={[
                styles.sizeView,
                {
                  borderWidth: selectedSize === item.name ? 3 : 0,
                  borderColor:
                    selectedSize === item.name
                      ? COLORS.primaryOrangeHex
                      : 'transparent',
                },
              ]}>
              <Text
                style={[
                  {fontWeight: '500', fontSize: hp(1.7)},
                  {
                    color:
                      selectedSize === item.name
                        ? COLORS.primaryOrangeHex
                        : 'white',
                  },
                ]}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BeanSizes;

const styles = StyleSheet.create({
  sizeMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1.5),
  },
  sizeView: {
    height: hp(4.3),
    width: wp(25),
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(1),
  },
});
