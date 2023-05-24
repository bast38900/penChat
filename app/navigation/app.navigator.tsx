import React from 'react';
import {
  StackCardInterpolationProps,
  createStackNavigator,
} from '@react-navigation/stack';
import {ChatRoomScreen, HomeScreen} from '../screens/';
import {Colors} from '../assets/styles';
import {AppStackNavigatorParamList} from '../navigation/';

const Stack = createStackNavigator<AppStackNavigatorParamList>();

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
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: Colors.blue},
        headerTitleStyle: {fontSize: 24},
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{cardStyleInterpolator: forFade, headerTitle: 'penChat'}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{cardStyleInterpolator: forFade}}
      />
    </Stack.Navigator>
  );
};
