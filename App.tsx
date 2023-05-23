import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AppNavigator, AuthNavigator} from './app/navigation';

const Stack = createStackNavigator();

export default function App() {
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

  // For testing purposes only
  if (user) console.log('User: ' + user?.displayName);
  else console.log('No user found');

  return (
    <NavigationContainer>
      {!user ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
}
