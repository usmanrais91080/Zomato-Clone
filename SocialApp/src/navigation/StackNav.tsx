import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/Splash';
import React from 'react';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import MainScreen from '../screens/MainScreen';
import Comments from '../screens/Comments';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  MainScreen: undefined;
  Comments: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
