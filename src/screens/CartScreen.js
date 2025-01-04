import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import CoffeeData from '../data/CoffeeData';
import GradientBg from '../components/GradientBg';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomHeader from '../components/CustomHeader';
import CustomIcons from '../components/CustomIcons';
import ProfilePic from '../components/ProfilePic';
import {useSelector} from 'react-redux';

const PricesList = () => {
  const coffee = CoffeeData[0]; // Access the first coffee object
  const selector = useSelector(state => state.myCart);
  return (
    <View style={styles.container}>
      {/* ************************ Header ************************* */}

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
      <FlatList
        data={selector.coffee}
        keyExtractor={item => item.size}
        renderItem={({item}) => (
          <View style={{marginTop: hp(3)}}>
            {coffee.prices.length !== 1 ? (
              <LinearGradient
                start={{x: 0, y: -1}}
                end={{x: 1, y: 1}}
                colors={[COLORS.primaryBlackHex, COLORS.primaryGreyHex]}
                style={styles.multipleSizesContainer}>
                <View style={{flexDirection: 'row', gap: hp(3)}}>
                  {/* ************** IMG FOR MULTPLE SIZES *************** */}
                  <Image
                    source={coffee.imagelink_portrait}
                    style={styles.mutiplePriceImg}
                  />
                  {/* ************** Info *************** */}
                  <View>
                    <Text style={styles.mulipleSizesName}>{coffee.name}</Text>
                    <Text style={styles.mulipleSizesIngrdeints}>
                      {coffee.special_ingredient}
                    </Text>
                    {/* ************** Roasted *************** */}
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      colors={[
                        COLORS.primaryGreyHex,
                        COLORS.primaryDarkGreyHex,
                      ]}
                      style={styles.roastedView}>
                      <Text style={{fontSize: hp(1.3), color: 'white'}}>
                        {coffee.roasted}
                      </Text>
                    </LinearGradient>
                  </View>
                </View>
                {/* ************** sizes *************** */}
                <View>
                  <Text>{coffee.size}</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.singleSizeContainer}>
                <Text style={styles.itemText}>Size: {item.size}</Text>
                <Text style={styles.itemText}>
                  Price: {item.currency}
                  {item.price}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.primaryBlackHex,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  multipleSizesContainer: {
    height: hp(30),
    width: wp(90),
    marginBottom: 10,
    borderRadius: hp(2),
    padding: hp(2),
    alignSelf: 'center',
  },
  mutiplePriceImg: {
    height: hp(11),
    width: wp(20),
    borderRadius: hp(2),
  },
  mulipleSizesName: {
    fontSize: hp(2),
    color: 'white',
    marginTop: hp(0.5),
  },
  mulipleSizesIngrdeints: {
    fontSize: hp(1),
    color: 'white',
    marginTop: hp(0.5),
  },
  roastedView: {
    height: hp(5),
    width: wp(30),
    marginTop: hp(1.5),
    borderRadius: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleSizeContainer: {
    backgroundColor: 'green',
    height: 200,
    width: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default PricesList;
