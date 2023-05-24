import {SafeAreaView, StyleSheet} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {sharedStyles} from '../assets/styles';
import {AppStackScreenProps} from '../navigation/navigation.types';
import {GiftedChat} from 'react-native-gifted-chat';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const ChatRoomScreen: FC<AppStackScreenProps<'ChatRoom'>> = ({
  route,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const {thread} = route.params;
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true,
    },
    // example of chat message
    {
      _id: 1,
      text: 'Henlo!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User',
      },
    },
  ]);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const sendMessage = async messages => {
    const text = messages[0].text;

    firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        name: user?.uid,
        text,
        createdAt: new Date().getTime(),
      })
      .then(() => {
        console.log('messages send');
      });
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <GiftedChat
        messages={messages}
        onSend={newMessage => sendMessage(newMessage)}
        user={{_id: 1}}
        placeholder="Start chatting..."
        showUserAvatar
        alwaysShowSend
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
