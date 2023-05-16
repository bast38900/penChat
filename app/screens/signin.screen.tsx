/**
 * Screen for login in to application
 */
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthForm} from '../components';

/**
 * Define types of SigninScreen parameters
 */
interface SigninScreenProps {}

// TODO: Change this function to work with API
/**
 * Perform Sign In
 */
const handleSignIn = async () => {};

export const SigninScreen: FC<SigninScreenProps> = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign in to your account"
        buttonTitle="Sign in"
        onSubmit={handleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 200,
    alignItems: 'center',
  },
});
