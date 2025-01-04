import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';

interface InputProps extends TextInputProps {
  label?: string;
  placeholder: string;
  width: any;
  isSecure?: boolean;
  leftIcon?: any;
  rightIcon?: any;
  value: any;
  onChangeText: any;
  placeholderTextColor: string;
}

const CustomInput: React.FC<InputProps> = ({
  placeholder,
  label,
  width,
  isSecure,
  leftIcon,
  rightIcon,
  value,
  onChangeText,
  placeholderTextColor,
}) => {
  const isDartMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.inputContainer, {width: width}]}>
      <Text>{label}</Text>
      <View>{leftIcon}</View>

      <TextInput
        placeholder={placeholder}
        style={{flex: 1, color: isDartMode ? 'black' : 'white'}}
        secureTextEntry={isSecure}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
      />
      <View>{rightIcon}</View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    marginTop: 15,
    paddingRight: 10,
  },
});
