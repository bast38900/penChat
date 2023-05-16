/**
 * Reusable component for authentication forms
 */
import React, {FC, useState} from 'react';
import {StyleSheet, Text, Button, TextInput} from 'react-native';

/**
 * Define types of AuthForm parameters
 */
interface AuthFormProps {
  headerText: string;
  buttonTitle: string;
  // TODO: Skal rettes til function
  onSubmit: any;
}

export const AuthForm: FC<AuthFormProps> = props => {
  const {headerText, buttonTitle, onSubmit} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Text>{headerText}</Text>
      <TextInput
        placeholder={'Email'}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        secureTextEntry
        placeholder={'Password'}
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title={buttonTitle} onPress={() => onSubmit({email, password})} />
    </>
  );
};

const styles = StyleSheet.create({});
