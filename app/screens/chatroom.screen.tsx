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
  const [conversations, setConversation] = useState([]);
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
        _id: Math.random(),
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user?.uid,
          name: user?.displayName,
        },
      })
      .then(() => {
        console.log('messages send');
      });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('THREADS')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot(querySnapshot => {
        const conversations = [];

        querySnapshot.forEach(documentSnapshot => {
          conversations.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setConversation(conversations);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <SafeAreaView style={sharedStyles.container}>
      <GiftedChat
        messages={conversations}
        onSend={sendMessage}
        user={{_id: user?.uid}}
        placeholder="Start chatting..."
        showUserAvatar
        alwaysShowSend
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
