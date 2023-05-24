import React from 'react';
import {
  StackCardInterpolationProps,
  createStackNavigator,
} from '@react-navigation/stack';
import {ChatRoomScreen, HomeScreen, AddRoomScreen} from '../screens/';
import {Colors} from '../assets/styles';
import {AppStackParamList} from '../navigation/';
import {IconButton} from 'react-native-paper';

const Stack = createStackNavigator<AppStackParamList>();

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
        options={{
          cardStyleInterpolator: forFade,
          headerTitle: 'penChat',
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              iconColor="#ffffff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
        }}
      />
      <Stack.Screen
        name="AddRoom"
        component={AddRoomScreen}
        options={{headerTitle: 'penChat'}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{cardStyleInterpolator: forFade}}
      />
    </Stack.Navigator>
  );
};
