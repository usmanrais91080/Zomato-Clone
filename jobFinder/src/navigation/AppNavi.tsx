import {NavigationContainer} from '@react-navigation/native';
import {JobFinderStack} from './StackNavi'; // Ensure correct import path
import {createStackNavigator} from '@react-navigation/stack';

export const JobFinderAppNavi = () => {
  return (
    <NavigationContainer>
      <JobFinderStack />
    </NavigationContainer>
  );
};
