import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBarData} from '../constant/TabBarData';
import WhatsAppCutomTab from '../component/WhatsAppCutomTab';
import Community from '../screen/BottomTab/Community';

const Tab = createBottomTabNavigator();

export const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={props => <WhatsAppCutomTab {...props} />}>
      {/* <Tab.Screen name="Community" component={Community} /> */}
      {TabBarData.map(tab => (
        <Tab.Screen
          name={tab.name}
          component={tab.route}
          options={{headerShown: false}}
          key={tab.id}
        />
      ))}
    </Tab.Navigator>
  );
};
