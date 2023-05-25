import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

/**
 * Define types of AuthContext parameters and methods
 */
export const AuthContext = createContext({
  user: null,
  setUser: (user: any) => {},
});

/**
 * AuthProvider for to provide authData within the application
 */
export const AuthProvider = ({children}: React.PropsWithChildren<unknown>) => {
  const [user, setUser] = useState(null);

  // TODO: Implement methods for signin/out etc.

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
