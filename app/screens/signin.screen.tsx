import React, {FC} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {AuthStackScreenProps} from '../navigation/navigation.types';
import {Button} from '../components';
import {Colors} from '../assets/styles';
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
  try {
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

    // Error handling
  } catch (err) {
    const error = err as NativeModuleError;
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled login');
      Alert.alert('User cancelled login');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Login already in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available');
      Alert.alert('Google Play services not available');
    } else {
      console.log('Something went wrong', error);
      Alert.alert(`${error.code}: ${error.message}`);
    }
  }
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

  // Error Handling
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

/**
 * Screen to sign in, pops up when a user is not registred.
 */
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
