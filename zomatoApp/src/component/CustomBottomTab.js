// CustomTabBar.js
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from '../constant/colors';
import {useSelector} from 'react-redux';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const icons = {
  Home: {
    focused: require('../assets/images/homeFill.png'),
    default: require('../assets/images/homeOutline.png'),
  },
  CartScreen: {
    focused: require('../assets/images/cartFill.png'),
    default: require('../assets/images/cartOutline.png'),
  },
  OrderScreen: {
    focused: require('../assets/images/trackorderFill.png'),
    default: require('../assets/images/trackOrderOutline.png'),
  },
  WhislistScreen: {
    focused: require('../assets/images/heartFill.png'),
    default: require('../assets/images/heartOutline.png'),
  },
  ProfileScreen: {
    focused: require('../assets/images/profileFill.png'),
    default: require('../assets/images/profileOutline.png'),
  },
};

const CustomBottomTab = ({state, descriptors, navigation}) => {
  const {routes} = state;
  const selector = useSelector(state => state.cart);
  // added items in cart
  const addedItemsInCart = selector.reduce(
    (sum, cartItems) => sum + cartItems.quantity,
    0,
  );
  return (
    <View style={styles.tabBar}>
      {routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel || route.name;
        const isFocused = state.index === index;
        const iconSource =
          icons[route.name]?.[isFocused ? 'focused' : 'default'];

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tab}>
            <Image
              source={iconSource}
              style={[
                styles.icon,
                {tintColor: isFocused ? Colors.primary : Colors.secondary},
              ]}
            />
            {route.name === 'CartScreen' && addedItemsInCart > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{addedItemsInCart}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    // marginLeft: responsiveWidth(2),
    marginRight: responsiveWidth(2),
    top: responsiveHeight(-2),
    borderRadius: responsiveHeight(2),
    shadowColor: 'black',
    shadowOffset: {height: 4, width: 2},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 3,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    top: responsiveHeight(1),
    right: responsiveWidth(2.9),
    backgroundColor: Colors.primary,
    borderRadius: 100,
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CustomBottomTab;
