import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const Input = React.forwardRef(
  (
    {
      placeholder,
      title,
      onChangeText,
      value,
      secureTextEntry,
      rightIcon,
      onPress,
      ...props
    },
    ref,
  ) => {
    return (
      <View>
        <View style={styles.inputcontainer}>
          <Text style={styles.title}>{title}</Text>
          <TextInput
            {...props}
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize="none"
            style={{flex: 1}}
          />
          <TouchableOpacity style={{marginRight: 8}} onPress={onPress}>
            {rightIcon}
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  inputcontainer: {
    width: '90%',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
});
