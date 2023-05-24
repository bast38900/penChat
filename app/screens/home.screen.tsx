import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {sharedStyles, Colors} from '../assets/styles';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {Button} from '../components';

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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={sharedStyles.container}>
      <View style={{marginTop: 50}}>
        <Button
          style={styles.ButtonStyle}
          title={'Add New Room'}
          onPress={() => navigation.navigate('AddRoom')}
          textStyle={{
            color: Colors.white,
            fontSize: 20,
            fontWeight: '700',
          }}
        />
        <Button title="Google Sign-Out" onPress={() => onGoogleButtonPress()} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {
    marginTop: 15,
    width: 200,
    alignSelf: 'center',
  },
});
