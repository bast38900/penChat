/**
 * Screen for login in to application
 */
import React, {FC} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {AuthForm} from '../components';
import firestore from '@react-native-firebase/firestore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

/**
 * Define types of SigninScreen parameters
 */
interface SigninScreenProps {}

/**
 * Set webclient id to firebase app
 */
GoogleSignin.configure({
  webClientId:
    '176478441703-3ntq32ecmabh3o7d6bmqivtcr1p5qfpa.apps.googleusercontent.com',
});

/**
 * Perform Sign In
 */
async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken, user} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Add user to firestore
  firestore().collection('users').doc(user.id).set({
    name: user.name,
    email: user.email,
    id: user.id,
  });

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(googleCredential)
    .then(() => console.log('User signed in with Google!'));
}

export const SignInScreen: FC<SigninScreenProps> = props => {
  const {} = props;

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign in to your account"
        buttonTitle="Sign in"
        onSubmit={''}
      />
      <Button title="Google Sign-In" onPress={() => onGoogleButtonPress()} />
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
