import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({
  user: null,
  setUser: (user: any) => {},
});

export const AuthProvider = ({children}: React.PropsWithChildren<unknown>) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
