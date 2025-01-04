import {NavigationContainer} from '@react-navigation/native';
import {ZomatoStack} from './ZomatoStack';

export const ZomatoNavigator = () => {
  return (
    <NavigationContainer>
      <ZomatoStack />
    </NavigationContainer>
  );
};
