import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Login, Signup, Splash, FirestoreCRUDOperation} from '../screens';
import RealtimeCRUDOperation from '../screens/RealtimeCRUDOperation';
import ImageCroper from '../screens/ImageCroper';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Splash" component={Splash} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Signup} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="FirestoreCRUDOperation"
        component={FirestoreCRUDOperation}
      />
      {/* <Tab.Screen
        name="RealtimeCRUDOperation"
        component={RealtimeCRUDOperation}
      /> */}
      {/* <Tab.Screen name="ImageCroper" component={ImageCroper} /> */}
    </Tab.Navigator>
  );
};
