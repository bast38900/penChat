import {
  Button,
  FlatList,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {sharedStyles, Colors} from '../assets/styles';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TextInput} from 'react-native-gesture-handler';
import {AppStackScreenProps} from '../navigation/navigation.types';

/**
 * Perform Sign Out
 */
async function onGoogleButtonPress() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

// RETRIEVING USERS //
// firestore()
//   .collection('users')
//   .get()
//   .then(querySnapshot => {
//     console.log('Total users: ', querySnapshot.size);
//
//     querySnapshot.forEach(documentSnapshot => {
//       console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
//     });
//   });

export const ChatRoomScreen: FC<AppStackScreenProps<'ChatRoom'>> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversation] = useState([]);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('messages')
      .orderBy('date', 'desc')
      .limit(5)
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

  const sendMessage = async () => {
    Keyboard.dismiss();

    firestore()
      .collection('messages')
      .add({
        name: user?.displayName,
        text: message,
        date: firestore.Timestamp.now.toString(),
      })
      .then(() => {
        console.log('messages send');
      });
  };

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={{marginTop: 50}}>
        <FlatList
          data={conversations}
          renderItem={({item}) => (
            <View
              style={{
                height: 50,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>
                {item.name}:{item.text}
              </Text>
            </View>
          )}
        />
        <TextInput
          style={styles.messageInputField}
          placeholder="Send Message"
          value={message}
          onChangeText={text => setMessage(text)}></TextInput>
        <Button title="Send Message" onPress={sendMessage} />
      </View>
      <View style={{marginTop: 50}}>
        <Button title="Google Sign-Out" onPress={() => onGoogleButtonPress()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  messageInputField: {
    fontWeight: '300',
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 5,
    marginTop: 8,
    fontSize: 16,
  },
});
