import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {Button, TextFormInput} from '../components';
import {AppStackScreenProps} from '../navigation/navigation.types';
import {IconButton, Title} from 'react-native-paper';
import {sharedStyles, Colors} from '../assets/styles';
import firestore from '@react-native-firebase/firestore';

export const AddRoomScreen: FC<AppStackScreenProps<'AddRoom'>> = ({
  navigation,
}) => {
  const [roomName, setRoomName] = useState('');

  async function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('THREADS')
        .add({
          name: roomName,
        })
        .then(() => {
          navigation.navigate('Home');
        });
    }
  }

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          iconColor="#1969E2"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <TextFormInput
          labelName="Room Name"
          value={roomName}
          onChangeText={text => setRoomName(text)}
        />
        <Button
          style={styles.ButtonStyle}
          title={'Add Room'}
          onPress={handleButtonPress}
          disabled={roomName.length === 0}
          textStyle={{
            color: Colors.white,
            fontSize: 20,
            fontWeight: '700',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {
    marginTop: 15,
    backgroundColor: Colors.blue,
    width: 200,
    alignSelf: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
});
