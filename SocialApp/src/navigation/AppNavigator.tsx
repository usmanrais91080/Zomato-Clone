import {NavigationContainer} from '@react-navigation/native';
import {AppStack} from './StackNav';
import React from 'react';

export const MyAppNavi = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};
