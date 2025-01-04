import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screen/Splash';
import OtpScreen from '../screen/OtpScreen';
import Main from '../screen/Main';
import ChatScreen from '../screen/ChatScreen';

export type RootStackParamList = {
  Splash: undefined;
  OtpScreen: undefined;
  Main: undefined;
  ChatScreen: undefined;
};

const WhatsStack = createStackNavigator<RootStackParamList>();
export const MyWhatsStack = () => {
  return (
    <WhatsStack.Navigator>
      <WhatsStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <WhatsStack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <WhatsStack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
      <WhatsStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{headerShown: false}}
      />
    </WhatsStack.Navigator>
  );
};
