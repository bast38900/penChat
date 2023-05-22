import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatRoomScreen} from '../screens/';

const Stack = createStackNavigator();

/**
 * Stack for signed in users.
 */
export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
};
