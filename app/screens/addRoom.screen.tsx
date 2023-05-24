import React, {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from '../components';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../assets/styles';

/**
 * Define types of HomeScreen parameters
 */
interface AddRoomScreenProps {}

export const AddRoomScreen: FC<AddRoomScreenProps> = props => {
  const {} = props;
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Create a new chat room</Text>
      <Button
        style={styles.ButtonStyle}
        title={'Add Room'}
        onPress={() => navigation.goBack()}
        textStyle={{
          color: Colors.white,
          fontSize: 20,
          fontWeight: '700',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {
    marginTop: 15,
    backgroundColor: Colors.blue,
    width: 200,
    alignSelf: 'center',
  },
});
