import React from 'react';
import {
  StackCardInterpolationProps,
  createStackNavigator,
} from '@react-navigation/stack';
import {SignInScreen} from '../screens';
import {AuthStackParamList} from '../navigation/';

const Stack = createStackNavigator<AuthStackParamList>();

/**
 * Fade effect used by Navigator
 */
const forFade = ({current}: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

/**
 * Stack for not signed in users.
 */
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{cardStyleInterpolator: forFade}}
      />
    </Stack.Navigator>
  );
};
