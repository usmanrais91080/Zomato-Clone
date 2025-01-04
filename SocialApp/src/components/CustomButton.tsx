import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

interface ButtonProps extends TouchableOpacityProps {
  onPress?: () => void; // Define proper type for onPress
  title: string;
  width: number; // Use number instead of any
  titleColor: string;
  backgroundColor: string; // Use string instead of any
  isloading: any;
}

const CustomButton: React.FC<ButtonProps> = ({
  onPress,
  title,
  width,
  titleColor,
  backgroundColor,
  isloading,
  ...props // Spread the rest of the TouchableOpacity props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonCont, {width, backgroundColor}]} // Apply button styles
      activeOpacity={0.8} // Add touch feedback effect
      {...props} // Spread the rest of the TouchableOpacity props
    >
      {isloading ? (
        <ActivityIndicator size={20} color={'white'} />
      ) : (
        <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonCont: {
    height: 40,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightPercentageToDP(1),
  },
  title: {
    fontSize: 20,
  },
});
