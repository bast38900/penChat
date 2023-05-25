import {AuthProvider} from './app/context/auth.context';
import {RootNavigator} from './app/navigation/root.navigator';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}
