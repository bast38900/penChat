import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatRoomScreen} from '../screens/';
import {Colors} from '../assets/styles';

const Stack = createStackNavigator();

/**
 * Fade effect used by Navigator
 */
const forFade = ({current}: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

/**
 * Stack for signed in users.
 */
export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.blue},
        headerTitleStyle: {fontSize: 24},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{cardStyleInterpolator: forFade}}
      />
    </Stack.Navigator>
  );
};
