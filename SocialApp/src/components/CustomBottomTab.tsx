import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const icons = {
  HomeScreen: {
    focused: require('../../../zomatoApp/src/assets/images/homeFill.png'),
    default: require('../../../zomatoApp/src/assets/images/homeOutline.png'),
  },
  SearchScreen: {
    focused: require('../assets/searchicon.png'),
    default: require('../assets/searchicon.png'),
  },
  AddScreen: {
    focused: require('../assets/plusicon.png'),
    default: require('../assets/plusicon.png'),
  },
  ChatScreen: {
    focused: require('../assets/chatfill.png'),
    default: require('../assets/chatOutline.png'),
  },
  ProfileScreen: {
    focused: require('../../../zomatoApp/src/assets/images/profileFill.png'),
    default: require('../../../zomatoApp/src/assets/images/profileOutline.png'),
  },
};

const CustomBottomTab = ({state, descriptors, navigation}) => {
  const {routes} = state;

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
            <View
              style={[
                {
                  width: 40,
                  height: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                },
                {backgroundColor: isFocused ? '#edeceb' : null},
              ]}>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  {tintColor: isFocused ? '#fc9003' : 'black'},
                ]}
              />
            </View>
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
    marginLeft: responsiveWidth(2),
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
    position: 'relative', // Ensure badge can be positioned correctly
  },
  icon: {
    width: 24,
    height: 24,
  },
  badge: {
    position: 'absolute',
    bottom: responsiveHeight(2), // Move the badge up from the bottom of the tab
    backgroundColor: 'green', // Transparent background
    borderRadius: responsiveWidth(7.5), // Adjust to fit the badge shape
    width: responsiveWidth(15),
    height: responsiveHeight(7.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
  },
});

export default CustomBottomTab;
