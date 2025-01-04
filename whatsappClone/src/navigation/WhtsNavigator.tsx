import {NavigationContainer} from '@react-navigation/native';
import {MyWhatsStack} from './WhatsAppStack';

export const WhatsNavigator = () => {
  return (
    <NavigationContainer>
      <MyWhatsStack />
    </NavigationContainer>
  );
};
