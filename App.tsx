import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SigninScreen} from './app/screens';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SigninScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
