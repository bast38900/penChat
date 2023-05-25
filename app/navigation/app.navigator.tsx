import React from 'react';
import {
  StackCardInterpolationProps,
  createStackNavigator,
} from '@react-navigation/stack';
import {ChatRoomScreen, HomeScreen, AddRoomScreen} from '../screens/';
import {Colors} from '../assets/styles';
import {AppStackParamList} from '../navigation/';
import {IconButton} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

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
 * Perform Sign Out
 */
async function onGoogleButtonPress() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

/**
 * Stack with Screens for signed in users.
 */
export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: Colors.blue},
        headerTitleStyle: {fontSize: 24, color: Colors.white},
        headerTitleAlign: 'center',
        headerTintColor: Colors.auqa,
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              iconColor="#ffffff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="logout"
              size={28}
              iconColor="#ffffff"
              onPress={onGoogleButtonPress}
            />
          ),
          presentation: 'modal',
          headerTitle: 'PenChat',
          cardStyleInterpolator: forFade,
        })}
      />
      <Stack.Screen
        name="AddRoom"
        component={AddRoomScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({route}) => ({
          title: route.params.thread.name,
        })}
      />
    </Stack.Navigator>
  );
};
