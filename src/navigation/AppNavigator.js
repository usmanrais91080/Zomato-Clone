import {createStackNavigator} from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {MyBottomTab} from './BottomTab';
import PaymentScreen from '../screens/PaymentScreen';
import DetailScreen from '../screens/DetailScreen';
import CoffeeDetailScreen from '../screens/CoffeeDetailScreen';
import BeansDetailScreen from '../screens/BeansDetailScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={MyBottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen
          name="CoffeeDetailScreen"
          component={CoffeeDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BeansDetailScreen"
          component={BeansDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
