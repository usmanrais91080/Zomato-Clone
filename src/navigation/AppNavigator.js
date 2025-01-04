import {createStackNavigator} from '@react-navigation/stack';
// import HomeScreen from '../screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {MyBottomTab} from './BottomTab';
import PaymentScreen from '../screens/PaymentScreen';
import DetailScreen from '../screens/DetailScreen';
import CoffeeDetailScreen from '../screens/CoffeeDetailScreen';
import BeansDetailScreen from '../screens/BeansDetailScreen';
import Signup from '../FirebaseTut/Signup';
import SignIn from '../FirebaseTut/SignIn';
import Home from '../FirebaseTut/Home';
import FormValidation from '../FirebaseTut/FormValidation';
import SignUpWithGoogle from '../FirebaseTut/SignUpWithGoogle';
import SignUpWithNumber from '../FirebaseTut/SignUpWithNumber';
import MainScreens from '../FirebaseTut/MainScreens';
import FetchFirestoreData from '../FirebaseTut/FetchFirestoreData';
import FireBaseSplash from '../FirebaseTut/FireBaseSplash';
import VerfiyUserWithEmail from '../FirebaseTut/VerifyUserWithEmail';
import PhoneNoVerification from '../FirebaseTut/PhoneNoVerification';
import StorUserDataInFirestore from '../FirebaseTut/StorUserDataInFirestore';
import DocumentPick from '../FirebaseTut/DocumentPick';
import SignupWithFacebook from '../FirebaseTut/SIgnupWithFacbook';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="BottomTab"
          component={MyBottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen
          name="CoffeeDetailScreen"
          component={CoffeeDetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BeansDetailScreen"
          component={BeansDetailScreen}
          options={{headerShown: false}}
        /> */}

        {/* ********************** firebase **************** */}

        <Stack.Screen
          name="FireBaseSplash"
          component={FireBaseSplash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MainScreens"
          component={MainScreens}
          options={{headerShown: false}}
        />

        {/* we can log out from home screen */}
        <Stack.Screen name="HomeScreen2" component={Home} />
        <Stack.Screen name="FormValidation" component={FormValidation} />
        <Stack.Screen name="SignInWithGoogle" component={SignUpWithGoogle} />
        <Stack.Screen
          name="SignupWithFacebook"
          component={SignupWithFacebook}
        />
        <Stack.Screen name="SignUpWithNumber" component={SignUpWithNumber} />
        <Stack.Screen
          name="FetchFirestoreData"
          component={FetchFirestoreData}
        />
        <Stack.Screen
          name="VerfiyUserWithEmail"
          component={VerfiyUserWithEmail}
        />
        <Stack.Screen
          name="PhoneNoVerification"
          component={PhoneNoVerification}
        />
        <Stack.Screen
          name="StorUserDataInFirestore"
          component={StorUserDataInFirestore}
        />
        <Stack.Screen name="DocumentPick" component={DocumentPick} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
