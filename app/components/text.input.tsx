import React from 'react';
import {StyleSheet, Dimensions, Text} from 'react-native';
import {TextInput} from 'react-native-paper';

interface TextFormInputProps {
  labelName: string;
  value: string;
  onChangeText: (val: string) => void;
}

const {width, height} = Dimensions.get('screen');

export const TextFormInput: React.FC<TextFormInputProps> = props => {
  const {labelName, value, onChangeText} = props;
  return (
    <TextInput
      label={labelName}
      value={value}
      onChangeText={onChangeText}
      clearButtonMode="while-editing"
      style={styles.input}
      numberOfLines={1}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    marginBottom: 10,
    width: width / 1.5,
    height: height / 15,
  },
});
