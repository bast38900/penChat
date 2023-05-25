import {Alert, Keyboard, SafeAreaView, StyleSheet} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {sharedStyles} from '../assets/styles';
import {AppStackScreenProps} from '../navigation/navigation.types';
import {GiftedChat} from 'react-native-gifted-chat';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Screen for chatting
 */
export const ChatRoomScreen: FC<AppStackScreenProps<'ChatRoom'>> = ({
  route,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const {thread} = route.params;
  const [conversations, setConversation] = useState([]);

  // TODO: Put in AuthContext
  /**
   * Function to get current user
   */
  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  /**
   * Function to send messages, and upload to Firestore
   */
  const sendMessage = async messages => {
    try {
      Keyboard.dismiss();
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
      // Error handling
    } catch (error) {
      console.log(error);
      Alert.alert('No messages available');
    }
  };

  /**
   * Function to collect messages from Firestore, real time
   */
  useEffect(() => {
    try {
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
      // Error handling
    } catch (error) {
      console.log(error);
      Alert.alert('No messages available');
    }
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
