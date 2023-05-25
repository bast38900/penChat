/**
 * Screen for login in to application
 */
import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthStackScreenProps} from '../navigation/navigation.types';
import {Button} from '../components';
import {sharedStyles, Colors} from '../assets/styles';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

/**
 * Set webclient id to firebase app
 */
GoogleSignin.configure({
  webClientId:
    '176478441703-3ntq32ecmabh3o7d6bmqivtcr1p5qfpa.apps.googleusercontent.com',
});

/**
 * Perform Google Sign In
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

/**
 * Perform Facebook Sign In
 */
async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth()
    .signInWithCredential(facebookCredential)
    .then(() => console.log('User signed in with Facebook!'));
}

export const SignInScreen: FC<AuthStackScreenProps<'SignIn'>> = () => {
  return (
    <View style={styles.container}>
      <GoogleSigninButton
        style={{width: 212, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
      <Button
        style={styles.ButtonStyle}
        title={'Login with Facebook'}
        onPress={onFacebookButtonPress}
        textStyle={{
          color: Colors.white,
          fontSize: 14,
          fontWeight: '700',
        }}
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
  ButtonStyle: {
    marginTop: 15,
    backgroundColor: Colors.auqa,
    width: 212,
    height: 48,
    alignSelf: 'center',
  },
});
