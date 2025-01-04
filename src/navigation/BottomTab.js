import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import CustomIcons from '../components/CustomIcons';
import {COLORS} from '../theme/theme';
import {Platform, StyleSheet, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const Tab = createBottomTabNavigator();

export const MyBottomTab = () => {
  /* ************************ TAB BAR SMALL DOTS ************************* */
  const tabBarLabel = ({focused}) => {
    return (
      <View
        style={{
          height: 5,
          width: 5,
          backgroundColor: focused ? COLORS.primaryOrangeHex : undefined,
          borderRadius: Platform.select({
            ios: 5,
            android: 10,
          }),
        }}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel,
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => {
          <BlurView
            blurAmount={55}
            style={[styles.blurView, {...StyleSheet.absoluteFillObject}]}
            blurType={'regular'}
          />;
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <CustomIcons
                name="home"
                size={20}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <CustomIcons
                name="cart"
                size={20}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <CustomIcons
                name="like"
                size={20}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Order_History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused, size, color}) => {
            return (
              <CustomIcons
                name="bell"
                size={20}
                color={
                  focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
export const styles = StyleSheet.create({
  tabBarStyle: {
    // position: 'absolute',
    height: hp(10),
    backgroundColor: COLORS.primaryBlackHex,
  },
  blurView: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    // overflow: 'hidden',
    // backgroundColor: 'transparent',
  },
});
