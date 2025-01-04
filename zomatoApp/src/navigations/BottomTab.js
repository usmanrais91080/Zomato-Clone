import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrderScreen from '../screens/OrderScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ZomatoHome from '../screens/ZomatoHome';
import CustomIcons from '../../../src/components/CustomIcons';
import {Colors} from '../constant/colors';
import {Image, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import CustomBottomTab from '../component/CustomBottomTab';
import CartScreen from '../screens/CartScreen';
import SettingScreen from '../screens/SettingScreen';
import {useSelector} from 'react-redux';
import WhislistScreen from '../screens/WhislistScreen';

const MyTab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <MyTab.Navigator
      screenOptions={{tabBarShowLabel: false}}
      tabBar={props => <CustomBottomTab {...props} />}>
      {/* home screen */}
      <MyTab.Screen
        name="Home"
        component={ZomatoHome}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => {
            // Use focused to determine whether the tab is selected
            const iconSource = focused
              ? require('../assets/images/homeFill.png')
              : require('../assets/images/homeOutline.png');
            return (
              <Image
                source={iconSource}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? Colors.primary : Colors.black,
                }}
              />
            );
          },
        }}
      />
      {/* cart screen */}
      <MyTab.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size, focused}) => {
            const iconSource = focused
              ? require('../assets/images/cartFill.png')
              : require('../assets/images/cartOutline.png');
            return (
              <Image
                source={iconSource}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? Colors.primary : Colors.black,
                }}
              />
            );
          },
        }}
      />
      {/* track order screen */}
      <MyTab.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => {
            const iconSource = focused
              ? require('../assets/images/trackorderFill.png')
              : require('../assets/images/trackOrderOutline.png');
            return (
              <Image
                source={iconSource}
                style={{
                  width: size,
                  height: size,
                  tintColor: focused ? Colors.primary : Colors.black,
                }}
              />
            );
          },
        }}
      />
      {/* WhislistScreen  */}
      <MyTab.Screen name="WhislistScreen" component={WhislistScreen} />

      {/* profile scrren */}
      <MyTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({size, color, focused}) => {
            const iconSelect = focused
              ? require('../assets/images/profileFill.png')
              : require('../assets/images/profileOutline.png');
            return (
              <Image
                source={iconSelect}
                style={{
                  width: responsiveWidth(6),
                  height: responsiveHeight(3),
                  tintColor: focused ? Colors.primary : Colors.black,
                }}
              />
            );
          },
        }}
      />
    </MyTab.Navigator>
  );
};
// const styles = StyleSheet.create({
//   tabbarStyle: {
//     top: responsiveHeight(-2),
//     marginLeft: 10,
//     marginRight: 10,
//     height: responsiveHeight(7),
//     borderBottomLeftRadius: responsiveHeight(3),
//     borderBottomRightRadius: responsiveHeight(3),
//   },
// });
