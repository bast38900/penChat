import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {sharedStyles} from '../assets/styles';
import auth from '@react-native-firebase/auth';

/**
 * Define types of chatroomScreen parameters
 */
interface HomeScreenProps {}

/**
 * Perform Sign Out
 */
async function onGoogleButtonPress() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export const HomeScreen: FC<HomeScreenProps> = props => {
  const {} = props;

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={{marginTop: 50}}>
        <Button title="Google Sign-Out" onPress={() => onGoogleButtonPress()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
