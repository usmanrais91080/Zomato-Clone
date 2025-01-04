import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BreakFast from '../screens/BreakFastScreen';
import Dinner from '../screens/DinnerScreen';
import Lunch from '../screens/LunchScreen';

const TopTab = createMaterialTopTabNavigator();

export const MyTopTab = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="BreakFast" component={BreakFast} />
      <TopTab.Screen name="Dinner" component={Dinner} />
      <TopTab.Screen name="Lunch" component={Lunch} />
    </TopTab.Navigator>
  );
};
