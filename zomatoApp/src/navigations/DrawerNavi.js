import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSlider from '../component/CustomSlider';
import Events from '../screens/DrawerTabScreens/Events';
import Logout from '../screens/DrawerTabScreens/Logout';
import Feeds from '../screens/DrawerTabScreens/Feeds';
import {BottomTab} from './BottomTab';

const DrawerTab = createDrawerNavigator();

export const DrawerNavi = () => {
  return (
    <DrawerTab.Navigator
      drawerContent={props => <CustomSlider {...props} />}
      screenOptions={{headerShown: false, drawerPosition: 'right'}}>
      <DrawerTab.Screen name="BottomTab" component={BottomTab} />
      <DrawerTab.Screen name="Events" component={Events} />
      <DrawerTab.Screen name="Logout" component={Logout} />
      <DrawerTab.Screen name="Feeds" component={Feeds} />
    </DrawerTab.Navigator>
  );
};
