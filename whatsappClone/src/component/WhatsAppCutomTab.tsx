import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const icons = {
  Community: {
    focused: require('../assets/icons/communityfill.png'),
    default: require('../assets/icons/community.png'),
  },
  Chat: {
    focused: require('../assets/icons/chatfill.png'),
    default: require('../assets/icons/chatOutline.png'),
  },
  Updates: {
    focused: require('../assets/icons/statusfill.png'),
    default: require('../assets/icons/statusoutline.png'),
  },
  Calls: {
    focused: require('../assets/icons/call.png'),
    default: require('../assets/icons/telephone.png'),
  },
};

const WhatsAppCutomTab = ({state, navigation}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const iconSource =
          icons[route.name]?.[isFocused ? 'focused' : 'default'];

        return (
          <TouchableOpacity
            key={route.name}
            onPress={() => navigation.navigate(route.name)} // Navigate directly to the tab
            style={styles.tabButton}>
            <Image
              source={iconSource} // Map the route name to the corresponding icon
              style={[
                styles.icon,
                {tintColor: isFocused ? 'green' : 'gray'}, // Change color if focused
              ]}
            />
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? 'green' : 'gray',
                  fontWeight: isFocused ? '600' : '400',
                },
              ]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default WhatsAppCutomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    elevation: 5,
  },
  tabButton: {
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
  },
});
