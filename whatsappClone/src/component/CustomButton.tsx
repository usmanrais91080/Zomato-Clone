import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface ButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  title: string;
  width: any;
  backgroundColor: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  width,
  backgroundColor,
}) => {
  return (
    <View style={{marginBottom: 20}}>
      <TouchableOpacity
        style={[
          styles.buttonCont,
          {width: width, backgroundColor: backgroundColor},
        ]}
        onPress={onPress}>
        <Text style={{color: 'white'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonCont: {
    height: 40,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightPercentageToDP(3),
    alignSelf: 'center',
  },
});
