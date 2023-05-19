/**
 * Screen for login in to application
 */
import React, {FC, useEffect} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {AuthForm} from '../components';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

/**
 * Define types of SigninScreen parameters
 */
interface SigninScreenProps {}

// TODO: Change this function to work with API
/**
 * Perform Sign In
 */
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const SigninScreen: FC<SigninScreenProps> = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign in to your account"
        buttonTitle="Sign in"
        onSubmit={''}
      />
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress().then(() =>
            console.log('Signed in with Google!'),
          )
        }
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
