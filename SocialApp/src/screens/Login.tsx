import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/StackNav';

type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

const Login: React.FC<LoginProps> = ({navigation}: LoginProps) => {
  const isDartMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isloading, setIsloading] = useState<boolean>(false);

  // sign in user
  const signInUser = async () => {
    try {
      // setIsloading(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          Alert.alert('Sign in Successfully');
        });
      // setIsloading(false);
      navigation.navigate('MainScreen');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={[styles.title, {color: isDartMode ? 'black' : 'white'}]}>
        Login
      </Text>
      {/* input */}
      <CustomInput
        placeholder="Enter your email"
        width={'90%'}
        value={email}
        onChangeText={(txt: string) => setEmail(txt)}
        placeholderTextColor="black"
      />
      <CustomInput
        placeholder="Enter your password"
        width={'90%'}
        value={password}
        onChangeText={(txt: string) => setPassword(txt)}
        placeholderTextColor="black"
      />
      {/* button */}
      <CustomButton
        title="Login"
        backgroundColor={'black'}
        width={350}
        titleColor="white"
        onPress={() => {
          signInUser();
        }}
        isloading={isloading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{color: isDartMode ? 'blue' : 'white'}}>
          Don't have an account? <Text>SignUp</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    fontWeight: 'bold',
  },
});
