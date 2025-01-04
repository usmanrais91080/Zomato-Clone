import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screen/Splash'; // Ensure correct import path
import Login from '../screen/Login';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const JobFinderStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};
