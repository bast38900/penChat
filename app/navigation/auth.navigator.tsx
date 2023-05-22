import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SignInScreen} from '../screens';

const Stack = createStackNavigator();

/**
 * Stack for not signed in users.
 */
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};
