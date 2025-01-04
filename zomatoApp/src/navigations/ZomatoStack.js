import {createStackNavigator} from '@react-navigation/stack';
import ZomatoSplash from '../screens/ZomatoSplash';
import ZomatoOtp from '../screens/ZomatoOtp';
import EmailLogin from '../screens/EmailLogin';
import ZomatoHome from '../screens/ZomatoHome';
import ConfirmOtpScreen from '../screens/ConfirmOtpScreen';
import {BottomTab} from './BottomTab';
import PizzaScreen from '../screens/menusScreens/PizzaScreen';
import HealtyFood from '../screens/menusScreens/HealtyFood';
import Burger from '../screens/menusScreens/Burger';
import Rolls from '../screens/menusScreens/Rolls';
import ChineseFood from '../screens/menusScreens/ChineseFood';
import HomeCock from '../screens/menusScreens/HomeCock';
import Chicken from '../screens/menusScreens/Chicken';
import Chaat from '../screens/menusScreens/Chaat';
import ZomatoProductDetailScreen from '../screens/ZomatoProductDetailScreen';
import ZomatoMainScreen from '../screens/ZomatoMainScreen';

const MyStack = createStackNavigator();

export const ZomatoStack = () => {
  return (
    <MyStack.Navigator>
      <MyStack.Screen
        name="ZomatoSplash"
        component={ZomatoSplash}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="ZomatoMainScreen"
        component={ZomatoMainScreen}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="ZomatoOtp"
        component={ZomatoOtp}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="EmailLogin"
        component={EmailLogin}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="ZomatoHome"
        component={ZomatoHome}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="ConfirmOtpScreen"
        component={ConfirmOtpScreen}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="ZomatoProductDetailScreen"
        component={ZomatoProductDetailScreen}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="PizzaScreen"
        component={PizzaScreen}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="HealtyFood"
        component={HealtyFood}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="Burger"
        component={Burger}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="Rolls"
        component={Rolls}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="ChineseFood"
        component={ChineseFood}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="HomeCock"
        component={HomeCock}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="Chicken"
        component={Chicken}
        options={{headerShown: false}}
      />
      <MyStack.Screen
        name="Chaat"
        component={Chaat}
        options={{headerShown: false}}
      />
    </MyStack.Navigator>
  );
};
