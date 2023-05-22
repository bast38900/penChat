import {Button, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import auth from '@react-native-firebase/auth';

/**
 * Define types of chatroomScreen parameters
 */
interface ChatRoomScreenProps {}

/**
 * Perform Sign Out
 */
async function onGoogleButtonPress() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export const ChatRoomScreen: FC<ChatRoomScreenProps> = props => {
  const {} = props;

  return (
    <View>
      <Text>chatroom</Text>
      <Button title="Google Sign-Out" onPress={() => onGoogleButtonPress()} />
    </View>
  );
};

const styles = StyleSheet.create({});
