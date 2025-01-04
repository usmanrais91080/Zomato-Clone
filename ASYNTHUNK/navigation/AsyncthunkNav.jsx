import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncthunkMain from '../screens/AsyncthunkMain';

const Stack = createStackNavigator();

export const AsyncthunkNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AsyncthunkMain" component={AsyncthunkMain} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
