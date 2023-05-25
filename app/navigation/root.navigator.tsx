import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {AppNavigator} from './app.navigator';
import {AuthNavigator} from './auth.navigator';
import {RootStackParamList} from './navigation.types';
import {createStackNavigator} from '@react-navigation/stack';
import {useState, useEffect} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator<RootStackParamList>();

/**
 * Root Navigator for handling navigation through the application
 */
export const RootNavigator = () => {
  const navigationRef = createNavigationContainerRef<RootStackParamList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);

    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer<RootStackParamList> ref={navigationRef}>
      {!user ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};
