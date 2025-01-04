import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React from 'react';

interface InputProps extends TextInputProps {
  width?: any;
  backgroundColor?: string;
  label?: string;
  placeholder?: string;
}

const CustomInput: React.FC<InputProps> = ({
  width,
  backgroundColor,
  label,
  placeholder,
}) => {
  return (
    <View style={{width: '100%'}}>
      <Text style={{marginLeft: 25, marginBottom: 5, fontWeight: '900'}}>
        {label}
      </Text>
      <View
        style={[
          styles.inputContainer,
          {width: width, backgroundColor: backgroundColor},
        ]}>
        <TextInput placeholder={placeholder} style={{flex: 1}} />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 5,
    alignItems: 'center',
    // justifyContent: 'center',
    width: '90%',
    backgroundColor: 'red',
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    // marginTop: 10,
    marginBottom: 14,
  },
});
