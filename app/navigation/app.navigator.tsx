import React from 'react';
import {
  StackCardInterpolationProps,
  createStackNavigator,
} from '@react-navigation/stack';
import {ChatRoomScreen} from '../screens/';
import {Colors} from '../assets/styles';
import {AppStackNavigatorParamList} from '../navigation/';

const AppStack = createStackNavigator<AppStackNavigatorParamList>();

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
    <AppStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.blue},
        headerTitleStyle: {fontSize: 24},
        headerTitleAlign: 'center',
      }}>
      <AppStack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{cardStyleInterpolator: forFade}}
      />
    </AppStack.Navigator>
  );
};
