import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SigninScreen} from './app/screens';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();

    GoogleSignin.configure({
      webClientId:
        '176478441703-3ntq32ecmabh3o7d6bmqivtcr1p5qfpa.apps.googleusercontent.com',
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
